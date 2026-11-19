-- POC multiusuario: RLS default deny + leitura publica restrita por token.
alter table public.account enable row level security;
alter table public.consent enable row level security;
alter table public.emergency_card enable row level security;
alter table public.card_block enable row level security;
alter table public.audit_event enable row level security;

drop policy if exists account_select_own on public.account;
create policy account_select_own on public.account
  for select to authenticated
  using (id = auth.uid());

drop policy if exists account_insert_own on public.account;
create policy account_insert_own on public.account
  for insert to authenticated
  with check (id = auth.uid());

drop policy if exists account_update_own on public.account;
create policy account_update_own on public.account
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

drop policy if exists account_delete_own on public.account;
create policy account_delete_own on public.account
  for delete to authenticated
  using (id = auth.uid());

drop policy if exists consent_select_own on public.consent;
create policy consent_select_own on public.consent
  for select to authenticated
  using (account_id = auth.uid());

drop policy if exists consent_insert_own on public.consent;
create policy consent_insert_own on public.consent
  for insert to authenticated
  with check (account_id = auth.uid());

drop policy if exists consent_update_own on public.consent;
create policy consent_update_own on public.consent
  for update to authenticated
  using (account_id = auth.uid())
  with check (account_id = auth.uid());

drop policy if exists consent_delete_own on public.consent;
create policy consent_delete_own on public.consent
  for delete to authenticated
  using (account_id = auth.uid());

drop policy if exists emergency_card_select_own on public.emergency_card;
create policy emergency_card_select_own on public.emergency_card
  for select to authenticated
  using (account_id = auth.uid());

drop policy if exists emergency_card_insert_own on public.emergency_card;
create policy emergency_card_insert_own on public.emergency_card
  for insert to authenticated
  with check (account_id = auth.uid());

drop policy if exists emergency_card_update_own on public.emergency_card;
create policy emergency_card_update_own on public.emergency_card
  for update to authenticated
  using (account_id = auth.uid())
  with check (account_id = auth.uid());

drop policy if exists emergency_card_delete_own on public.emergency_card;
create policy emergency_card_delete_own on public.emergency_card
  for delete to authenticated
  using (account_id = auth.uid());

drop policy if exists card_block_select_own on public.card_block;
create policy card_block_select_own on public.card_block
  for select to authenticated
  using (
    exists (
      select 1
      from public.emergency_card card
      where card.id = card_id
        and card.account_id = auth.uid()
    )
  );

drop policy if exists card_block_insert_own on public.card_block;
create policy card_block_insert_own on public.card_block
  for insert to authenticated
  with check (
    exists (
      select 1
      from public.emergency_card card
      where card.id = card_id
        and card.account_id = auth.uid()
    )
  );

drop policy if exists card_block_update_own on public.card_block;
create policy card_block_update_own on public.card_block
  for update to authenticated
  using (
    exists (
      select 1
      from public.emergency_card card
      where card.id = card_id
        and card.account_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.emergency_card card
      where card.id = card_id
        and card.account_id = auth.uid()
    )
  );

drop policy if exists card_block_delete_own on public.card_block;
create policy card_block_delete_own on public.card_block
  for delete to authenticated
  using (
    exists (
      select 1
      from public.emergency_card card
      where card.id = card_id
        and card.account_id = auth.uid()
    )
  );

drop policy if exists audit_event_select_own on public.audit_event;
create policy audit_event_select_own on public.audit_event
  for select to authenticated
  using (account_id = auth.uid());

revoke all on public.account from anon;
revoke all on public.consent from anon;
revoke all on public.emergency_card from anon;
revoke all on public.card_block from anon;
revoke all on public.audit_event from anon;

grant select, insert, update, delete on public.account to authenticated;
grant select, insert, update, delete on public.consent to authenticated;
grant select, insert, update, delete on public.emergency_card to authenticated;
grant select, insert, update, delete on public.card_block to authenticated;
grant select on public.audit_event to authenticated;
grant usage, select on sequence public.audit_event_id_seq to authenticated;

create or replace function public.get_public_card(p_token text)
returns jsonb
language sql
security definer
set search_path = public
stable
as $$
  select jsonb_build_object(
    'displayName', card.display_name,
    'updatedAt', card.updated_at,
    'blocks', coalesce(
      (
        select jsonb_agg(
          jsonb_build_object('key', block.block_key, 'payload', block.payload)
          order by case block.block_key
            when 'identity' then 1
            when 'conditions' then 2
            when 'hypoglycemia' then 3
            when 'continuous' then 4
            when 'insulins' then 5
            when 'correction' then 6
            when 'disclaimer' then 7
            else 8
          end
        )
        from public.card_block block
        where block.card_id = card.id
          and block.visibility = 'public'
          and coalesce(block.payload ->> 'text', '') <> ''
      ),
      '[]'::jsonb
    )
  )
  from public.emergency_card card
  where card.public_token = p_token
    and p_token is not null;
$$;

revoke all on function public.get_public_card(text) from public;
grant execute on function public.get_public_card(text) to anon, authenticated;
