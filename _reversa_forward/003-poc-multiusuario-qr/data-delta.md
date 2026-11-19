# Data Delta: POC multiusuário com QR por pessoa

> Identificador: `003-poc-multiusuario-qr`
> Data: `2026-11-18`
> Base: modelo da demo é local e não persistido; não há esquema de legado para diferenciar.

## 1. Resumo

Novo esquema com quatro entidades: conta (espelho da identidade de login), consentimento, ficha de emergência com blocos e token público, e evento de auditoria. A ficha é única por conta; cada bloco carrega a visibilidade. O token público é opaco e rotativo. Nenhum dado da demo é migrado.

## 2. Entidades

### 2.1 `account`

| Campo | Tipo | Regra |
|-------|------|-------|
| `id` | uuid | PK; igual ao identificador da identidade de login |
| `email` | text | opcional; não aparece na página pública |
| `created_at` | timestamptz | padrão agora |

- Uma linha por identidade autenticada.
- Não exposta à leitura pública.

### 2.2 `consent`

| Campo | Tipo | Regra |
|-------|------|-------|
| `id` | uuid | PK |
| `account_id` | uuid | FK → `account.id`, `on delete cascade` |
| `terms_version` | text | versão do termo aceita |
| `accepted_at` | timestamptz | obrigatório |
| `revoked_at` | timestamptz | nulo enquanto vigente |

- Índice único em (`account_id`, `terms_version`).
- Consentimento vigente = `revoked_at is null`.
- Gravação de ficha exige consentimento vigente (regra no banco e na aplicação).

### 2.3 `emergency_card`

| Campo | Tipo | Regra |
|-------|------|-------|
| `id` | uuid | PK |
| `account_id` | uuid | FK → `account.id`, **unique**, `on delete cascade` |
| `display_name` | text | nome de exibição escolhido pelo dono (RN-13) |
| `public_token` | text | único, opaco, 256 bits em base64url; nulo se nunca gerado |
| `token_rotated_at` | timestamptz | data da última geração/rotação |
| `created_at` | timestamptz | padrão agora |
| `updated_at` | timestamptz | atualizado a cada gravação |

- `unique(account_id)` garante uma ficha por conta (D-03).
- Índice único em `public_token` (quando não nulo).
- `public_token` nunca contém e-mail, nome ou dado de saúde.

### 2.4 `card_block`

| Campo | Tipo | Regra |
|-------|------|-------|
| `id` | uuid | PK |
| `card_id` | uuid | FK → `emergency_card.id`, `on delete cascade` |
| `block_key` | text | identificador da seção (ex.: `identity`, `conditions`, `hypoglycemia`, `continuous`, `insulins`, `correction`, `disclaimer`) |
| `visibility` | text | `public` ou `private` |
| `payload` | jsonb | conteúdo estruturado da seção |
| `updated_at` | timestamptz | atualizado a cada gravação |

- Índice único em (`card_id`, `block_key`).
- A leitura pública só enxerga `visibility = 'public'`.
- Alternativa descartada para a POC: guardar tudo num único `jsonb` na ficha. A tabela de blocos facilita projetar só o público e evoluir seções.

### 2.5 `audit_event`

| Campo | Tipo | Regra |
|-------|------|-------|
| `id` | uuid | PK |
| `account_id` | uuid | FK → `account.id`, `on delete cascade` |
| `event_type` | text | ex.: `consent_accepted`, `card_saved`, `token_rotated`, `account_deleted` |
| `created_at` | timestamptz | padrão agora |

- Sem conteúdo de saúde e sem identificadores pessoais em claro.

## 3. Regras de acesso (RLS)

| Tabela | Dono autenticado | Público (anônimo) |
|--------|------------------|-------------------|
| `account` | lê e atualiza a própria linha | nega |
| `consent` | lê e insere o próprio consentimento | nega |
| `emergency_card` | lê, insere e atualiza a própria ficha | nega |
| `card_block` | lê, insere e atualiza blocos da própria ficha | nega |
| `audit_event` | lê os próprios eventos (opcional) | nega |

- Negar por padrão; conceder apenas o necessário.
- A leitura pública acontece **somente** pela função `get_public_card(token)`, que devolve:
  - `display_name`
  - blocos com `visibility = 'public'` (payload)
  - `updated_at`
- A função não devolve `account_id`, `email`, `public_token` nem blocos privados.
- Token inexistente ou revogado → resposta vazia (equivalente a 404).

## 4. Índices e restrições

| Objeto | Definição |
|--------|-----------|
| `emergency_card.account_id` | unique |
| `emergency_card.public_token` | unique (parcial, `where public_token is not null`) |
| `card_block(card_id, block_key)` | unique |
| `consent(account_id, terms_version)` | unique |
| `card_block(card_id, visibility)` | índice para a leitura pública |
| `audit_event(account_id, created_at)` | índice para consulta |

## 5. Exclusão e retenção

- Excluir `account` cascateia para `consent`, `emergency_card`, `card_block` e `audit_event`.
- A exclusão da identidade de login é feita pela rotina de servidor/operador (D-08).
- Não há retenção além da vida da conta; não há cópia em outro lugar.
- A demo local não é afetada.

## 6. Migração

1. Criar o esquema e as restrições em ambiente novo.
2. Aplicar as regras de acesso e a função de leitura pública.
3. Sem migração de dados: a demo continua usando `src/data/emergencyDemoData.ts`.
4. Rollback: remover as tabelas e a função; a demo permanece funcional.

## 7. Privacidade e LGPD

- Minimização: só o necessário para a ficha e a identificação em emergência.
- Consentimento versionado e revogável; exclusão elimina os dados.
- Nenhum dado de saúde em URL, QR, log ou auditoria.
- Revisão jurídica recomendada antes de ampliar o uso de dados reais.
