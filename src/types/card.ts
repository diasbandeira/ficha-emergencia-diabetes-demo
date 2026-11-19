export type Visibility = "public" | "private";

export type BlockKey =
  | "identity"
  | "conditions"
  | "hypoglycemia"
  | "continuous"
  | "insulins"
  | "correction"
  | "disclaimer";

export const blockLabels: Record<BlockKey, string> = {
  identity: "Identificação e tipo sanguíneo",
  conditions: "Condições de saúde",
  hypoglycemia: "Alerta de hipoglicemia",
  continuous: "Uso contínuo",
  insulins: "Insulinas",
  correction: "Tabela de correção",
  disclaimer: "Aviso",
};

export const blockOrder: BlockKey[] = [
  "identity",
  "conditions",
  "hypoglycemia",
  "continuous",
  "insulins",
  "correction",
  "disclaimer",
];

export type CardBlockPayload = { text: string };

export type CardBlock = {
  key: BlockKey;
  visibility: Visibility;
  payload: CardBlockPayload;
};

export type Card = {
  displayName: string;
  updatedAt: string;
  publicStatus: "active" | "revoked";
  publicToken: string | null;
  blocks: CardBlock[];
};

export type PublicCard = {
  displayName: string;
  updatedAt: string;
  blocks: { key: BlockKey; payload: CardBlockPayload }[];
};

export type Consent = { termsVersion: string; acceptedAt: string } | null;

export const TERMS_VERSION = "2026-11-poc";
export const DISPLAY_NAME_MAX = 60;

export function defaultBlocks(): CardBlock[] {
  return blockOrder.map((key) => ({
    key,
    visibility: key === "correction" || key === "continuous" ? "private" : "public",
    payload: { text: "" },
  }));
}

export function isBlockKey(value: string): value is BlockKey {
  return (blockOrder as string[]).includes(value);
}
