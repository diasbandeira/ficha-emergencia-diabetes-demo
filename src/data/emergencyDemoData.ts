export type Visibility = "public" | "private";

export type DemoBlock = {
  id: string;
  label: string;
  value: string;
  visibility: Visibility;
};

export type DemoContactOption = {
  id: string;
  label: string;
  publicValue: string;
};

export type ObservationCategory =
  | "completed"
  | "question"
  | "misunderstanding"
  | "blocker";

export const demoBlocks: DemoBlock[] = [
  {
    id: "display-name",
    label: "Identificação",
    value: "Pessoa de demonstração",
    visibility: "public",
  },
  {
    id: "condition",
    label: "Informação de saúde",
    value: "Diabetes — conteúdo fictício",
    visibility: "public",
  },
  {
    id: "support-contact",
    label: "Contato de apoio",
    value: "Contato fictício A — sem telefone",
    visibility: "public",
  },
  {
    id: "address",
    label: "Endereço",
    value: "Dado privado de demonstração",
    visibility: "private",
  },
  {
    id: "personal-notes",
    label: "Notas pessoais",
    value: "Conteúdo privado de demonstração",
    visibility: "private",
  },
];

export const demoContactOptions: DemoContactOption[] = [
  {
    id: "contact-a",
    label: "Contato fictício A",
    publicValue: "Contato fictício A — sem telefone",
  },
  {
    id: "contact-b",
    label: "Contato fictício B",
    publicValue: "Contato fictício B — sem telefone",
  },
];

export const facilitatorTasks = [
  "Identificar quais blocos são públicos e quais são privados",
  "Localizar o contato fictício na visualização pública",
  "Explicar a atualização simulada",
  "Explicar o que acontece ao retirar o compartilhamento",
] as const;

export const observationCategories: {
  id: ObservationCategory;
  label: string;
}[] = [
  { id: "completed", label: "Concluiu" },
  { id: "question", label: "Teve dúvida" },
  { id: "misunderstanding", label: "Interpretou de outro modo" },
  { id: "blocker", label: "Encontrou um bloqueio" },
];

export const initialObservationCounts: Record<ObservationCategory, number> = {
  completed: 0,
  question: 0,
  misunderstanding: 0,
  blocker: 0,
};
