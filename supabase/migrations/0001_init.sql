-- POC multiusuario: schema base. Rodar antes de 0002_rls.sql.
create extension if not exists pgcrypto;

create table if not exists public.account (
  id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.consent (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references public.account (id) on delete cascade,
  terms_version text not null,
  accepted_at timestamptz not null default now(),
  revoked_at timestamptz,
  constraint consent_account_terms_key unique (account_id, terms_version)
);

create table if not exists public.emergency_card (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null unique references public.account (id) on delete cascade,
  display_name text not null,
  public_token text,
  token_rotated_at timestamptz,
  updated_at timestamptz not null default now(),
  constraint emergency_card_display_name_check
    check (char_length(btrim(display_name)) between 1 and 60)
);

create unique index if not exists emergency_card_public_token_key
  on public.emergency_card (public_token)
  where public_token is not null;

create table if not exists public.card_block (
  id uuid primary key default gen_random_uuid(),
  card_id uuid not null references public.emergency_card (id) on delete cascade,
  block_key text not null,
  visibility text not null default 'private',
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint card_block_key_check check (
    block_key in (
      'identity',
      'conditions',
      'hypoglycemia',
      'continuous',
      'insulins',
      'correction',
      'disclaimer'
    )
  ),
  constraint card_block_visibility_check check (visibility in ('public', 'private')),
  constraint card_block_card_key unique (card_id, block_key)
);

create index if not exists card_block_card_id_idx
  on public.card_block (card_id);

create table if not exists public.audit_event (
  id bigserial primary key,
  account_id uuid references public.account (id) on delete set null,
  event text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_event_account_created_idx
  on public.audit_event (account_id, created_at desc);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.account (id) values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists emergency_card_touch_updated_at on public.emergency_card;
create trigger emergency_card_touch_updated_at
  before update on public.emergency_card
  for each row execute function public.touch_updated_at();

drop trigger if exists card_block_touch_updated_at on public.card_block;
create trigger card_block_touch_updated_at
  before update on public.card_block
  for each row execute function public.touch_updated_at();

create or replace function public.require_active_consent(p_account_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1
    from public.consent
    where account_id = p_account_id
      and revoked_at is null
  ) then
    raise exception 'consent_required' using errcode = 'P0001';
  end if;
end;
$$;

create or replace function public.emergency_card_require_consent()
returns trigger
language plpgsql
as $$
begin
  perform public.require_active_consent(new.account_id);
  return new;
end;
$$;

drop trigger if exists emergency_card_require_consent on public.emergency_card;
create trigger emergency_card_require_consent
  before insert or update on public.emergency_card
  for each row execute function public.emergency_card_require_consent();

create or replace function public.card_block_require_consent()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  owner_id uuid;
begin
  select account_id into owner_id
  from public.emergency_card
  where id = new.card_id;

  if owner_id is null then
    raise exception 'card_not_found' using errcode = 'P0001';
  end if;

  perform public.require_active_consent(owner_id);
  return new;
end;
$$;

drop trigger if exists card_block_require_consent on public.card_block;
create trigger card_block_require_consent
  before insert or update on public.card_block
  for each row execute function public.card_block_require_consent();

create or replace function public.audit_card_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  event_name text;
begin
  if tg_op = 'INSERT' then
    event_name := 'card_created';
  elsif new.public_token is distinct from old.public_token then
    event_name := case
      when new.public_token is null then 'public_link_revoked'
      when old.public_token is null then 'public_link_created'
      else 'public_link_rotated'
    end;
  else
    event_name := 'card_updated';
  end if;

  insert into public.audit_event (account_id, event)
  values (new.account_id, event_name);

  return new;
end;
$$;

drop trigger if exists emergency_card_audit on public.emergency_card;
create trigger emergency_card_audit
  after insert or update on public.emergency_card
  for each row execute function public.audit_card_change();
