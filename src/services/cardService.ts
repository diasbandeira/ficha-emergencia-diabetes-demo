import { requireBackend } from "../lib/backend";
import {
  blockOrder,
  defaultBlocks,
  isBlockKey,
  type Card,
  type CardBlock,
  type Consent,
  type PublicCard,
} from "../types/card";

type CardRow = {
  display_name: string;
  updated_at: string;
  public_token: string | null;
  card_block:
    | {
        block_key: string;
        visibility: string;
        payload: { text?: string } | null;
      }[]
    | null;
};

async function currentUserId(): Promise<string> {
  const supabase = requireBackend();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    throw new Error("unauthorized");
  }
  return data.user.id;
}

function randomToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function fetchConsent(): Promise<Consent> {
  const supabase = requireBackend();
  const userId = await currentUserId();
  const { data, error } = await supabase
    .from("consent")
    .select("terms_version, accepted_at")
    .eq("account_id", userId)
    .is("revoked_at", null)
    .order("accepted_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data
    ? { termsVersion: data.terms_version, acceptedAt: data.accepted_at }
    : null;
}

export async function recordConsent(termsVersion: string): Promise<Consent> {
  const supabase = requireBackend();
  const userId = await currentUserId();
  const { data, error } = await supabase
    .from("consent")
    .upsert(
      {
        account_id: userId,
        terms_version: termsVersion,
        accepted_at: new Date().toISOString(),
        revoked_at: null,
      },
      { onConflict: "account_id,terms_version" },
    )
    .select("terms_version, accepted_at")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return { termsVersion: data.terms_version, acceptedAt: data.accepted_at };
}

export async function fetchMyCard(): Promise<Card | null> {
  const supabase = requireBackend();
  const userId = await currentUserId();
  const { data, error } = await supabase
    .from("emergency_card")
    .select(
      "display_name, updated_at, public_token, card_block(block_key, visibility, payload)",
    )
    .eq("account_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return null;
  }

  const row = data as unknown as CardRow;
  const existing = new Map<string, CardBlock>();
  (row.card_block ?? []).forEach((block) => {
    if (!isBlockKey(block.block_key)) {
      return;
    }
    existing.set(block.block_key, {
      key: block.block_key,
      visibility: block.visibility === "public" ? "public" : "private",
      payload: { text: block.payload?.text ?? "" },
    });
  });

  const fallback = defaultBlocks();
  const blocks = blockOrder.map(
    (key) => existing.get(key) ?? fallback.find((block) => block.key === key)!,
  );

  return {
    displayName: row.display_name,
    updatedAt: row.updated_at,
    publicStatus: row.public_token ? "active" : "revoked",
    publicToken: row.public_token,
    blocks,
  };
}

export async function saveCard(input: {
  displayName: string;
  blocks: CardBlock[];
}): Promise<void> {
  const supabase = requireBackend();
  const userId = await currentUserId();
  const now = new Date().toISOString();

  const { data: card, error: cardError } = await supabase
    .from("emergency_card")
    .upsert(
      {
        account_id: userId,
        display_name: input.displayName.trim(),
        updated_at: now,
      },
      { onConflict: "account_id" },
    )
    .select("id")
    .single();

  if (cardError) {
    throw new Error(cardError.message);
  }

  const rows = input.blocks.map((block) => ({
    card_id: card.id,
    block_key: block.key,
    visibility: block.visibility,
    payload: block.payload,
    updated_at: now,
  }));

  const { error: blockError } = await supabase
    .from("card_block")
    .upsert(rows, { onConflict: "card_id,block_key" });

  if (blockError) {
    throw new Error(blockError.message);
  }
}

export async function rotatePublicLink(): Promise<string> {
  const supabase = requireBackend();
  const userId = await currentUserId();
  const token = randomToken();
  const { data, error } = await supabase
    .from("emergency_card")
    .update({
      public_token: token,
      token_rotated_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("account_id", userId)
    .select("public_token")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data.public_token as string;
}

export async function revokePublicLink(): Promise<void> {
  const supabase = requireBackend();
  const userId = await currentUserId();
  const { error } = await supabase
    .from("emergency_card")
    .update({
      public_token: null,
      token_rotated_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("account_id", userId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function fetchPublicCard(token: string): Promise<PublicCard | null> {
  const supabase = requireBackend();
  const { data, error } = await supabase.rpc("get_public_card", {
    p_token: token,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return null;
  }

  const payload = data as {
    displayName: string;
    updatedAt: string;
    blocks: { key: string; payload: { text?: string } | null }[];
  };

  return {
    displayName: payload.displayName,
    updatedAt: payload.updatedAt,
    blocks: (payload.blocks ?? [])
      .filter((block) => isBlockKey(block.key))
      .map((block) => ({
        key: block.key as PublicCard["blocks"][number]["key"],
        payload: { text: block.payload?.text ?? "" },
      })),
  };
}

export async function deleteMyAccount(): Promise<void> {
  const supabase = requireBackend();
  const userId = await currentUserId();
  const { error } = await supabase.from("account").delete().eq("id", userId);
  if (error) {
    throw new Error(error.message);
  }
  await supabase.auth.signOut();
}

export function publicCardUrl(token: string): string {
  const url = new URL(import.meta.env.BASE_URL, window.location.origin);
  url.hash = `/p/${token}`;
  return url.toString();
}
