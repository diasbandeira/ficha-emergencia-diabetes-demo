# Actions: POC multiusuário com QR por pessoa

> Identificador: `003-poc-multiusuario-qr`
> Data: `2026-11-18`
> Roadmap: `_reversa_forward/003-poc-multiusuario-qr/roadmap.md`

## Resumo

| Métrica | Valor |
|---------|-------|
| Total de ações | 21 |
| Paralelizáveis (`[//]`) | 4 |
| Maior cadeia de dependência | 9 |

> Nota: as ações assumem o provedor recomendado em D-01 (backend relacional gerenciado). Se a escolha mudar, T004/T005/T016 se adaptam ao provedor. A equipe não mantém suíte de testes; a verificação é por checklist e pelo roteiro de `onboarding.md`.

## Fase 1, Preparação

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|----|-----------|--------------|-------------|--------------|-------------|--------|
| T001 | Fechar D-01: comparar planos gratuitos e registrar o provedor escolhido | - | - | `_reversa_forward/003-poc-multiusuario-qr/investigation.md` | 🟡 | `[X]` |
| T002 | Adicionar o cliente do backend e o arquivo de variáveis públicas de exemplo | T001 | - | `package.json`, `.env.example` | 🟡 | `[X]` |
| T003 | Criar o projeto gratuito e configurar o login social com origens localhost e Pages | T001 | - | ambiente externo (sem arquivo) | 🟡 | `[ ]` |
| T004 | Escrever a migração com tabelas, unicidade e índices | T001 | - | `supabase/migrations/0001_init.sql` | 🟡 | `[X]` |
| T005 | Escrever as regras de acesso por linha e a função de leitura pública | T004 | - | `supabase/migrations/0002_rls.sql` | 🟡 | `[X]` |

## Fase 2, Testes

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|----|-----------|--------------|-------------|--------------|-------------|--------|
| T006 | Registrar checklist de isolamento, consentimento e leitura pública no onboarding | T005 | - | `_reversa_forward/003-poc-multiusuario-qr/onboarding.md` | 🟢 | `[X]` |

## Fase 3, Núcleo

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|----|-----------|--------------|-------------|--------------|-------------|--------|
| T007 | Criar o cliente do backend e o provedor de sessão | T002, T003 | - | `src/lib/backend.ts`, `src/auth/AuthProvider.tsx` | 🟡 | `[X]` |
| T008 | Implementar o serviço de ficha (ler, salvar, consentir, rotacionar/revogar, excluir) | T007, T005 | - | `src/services/cardService.ts` | 🟡 | `[X]` |
| T009 | Criar a tela de login social | T007 | `[//]` | `src/pages/Login.tsx` | 🟡 | `[X]` |
| T010 | Criar a área autenticada com edição da ficha e visibilidade por bloco | T008 | - | `src/pages/MyCard.tsx` | 🟡 | `[X]` |
| T011 | Implementar o fluxo de consentimento que bloqueia o salvamento | T008 | - | `src/components/ConsentGate.tsx` | 🟢 | `[X]` |
| T012 | Criar a tela de QR com gerar, rotacionar, revogar e baixar | T008 | `[//]` | `src/pages/CardQr.tsx` | 🟡 | `[X]` |
| T013 | Criar a página pública por token reutilizando a visualização | T008 | `[//]` | `src/pages/PublicCard.tsx` | 🟡 | `[X]` |

## Fase 4, Integração

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|----|-----------|--------------|-------------|--------------|-------------|--------|
| T014 | Atualizar rotas por hash com guarda de sessão, preservando `#/` e `#/emergency` | T009, T010, T012, T013 | - | `src/navigation/hashRoute.ts`, `src/App.tsx` | 🟢 | `[X]` |
| T015 | Adaptar a visualização para receber dados por props (demo e pública) | T013 | - | `src/components/emergency-demo/EmergencyView.tsx` | 🟢 | `[X]` |
| T016 | Configurar as variáveis públicas no build do Pages | T002 | `[//]` | `.github/workflows/pages.yml` | 🟡 | `[X]` |
| T017 | Ajustar os estilos das telas novas reaproveitando os tokens de tema | T009, T010, T012, T013 | - | `src/styles.css` | 🟢 | `[X]` |

## Fase 5, Polimento

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|----|-----------|--------------|-------------|--------------|-------------|--------|
| T018 | Verificar acessibilidade do fluxo novo (teclado, foco, contraste, toque) | T014, T017 | - | `src/styles.css` | 🟢 | `[X]` |
| T019 | Executar build e o roteiro com duas contas; registrar achados | T016, T018 | - | `_reversa_forward/003-poc-multiusuario-qr/onboarding.md` | 🟢 | `[ ]` |
| T020 | Atualizar o onboarding com o resultado da verificação e pendências | T019 | - | `_reversa_forward/003-poc-multiusuario-qr/onboarding.md` | 🟢 | `[X]` |
| T021 | Documentar a rotina de exclusão da identidade de login (servidor/operador) | T005 | - | `_reversa_forward/003-poc-multiusuario-qr/onboarding.md` | 🟡 | `[X]` |

## Notas de execução

- T001: comparação registrada em `investigation.md`. Supabase Free é o provedor de
  referência; confirmação final depende da criação do projeto em T003.
- T002: `@supabase/supabase-js@2` instalado; `.env.example` criado.
- T003: **bloqueada**. Exige conta, projeto gratuito e configuração do OAuth
  Google (origens `localhost` e Pages) por uma pessoa.
- T004/T005: migrações escritas e não aplicadas; aplicação depende de T003.
- T007: `AuthProvider` usa sessão persistida e redireciona tokens de OAuth para
  `#/app`.
- T010/T011: o salvamento envia todos os blocos, inclusive vazios, para limpar
  conteúdo removido; o gatilho do banco reforça o consentimento.
- T012: QR gerado por `QRCodeCanvas` com baixar, rotacionar e revogar; o token é
  aleatório de 32 bytes e só o endereço público entra no código.
- T013: a página pública consome `get_public_card(p_token)` e mostra apenas
  blocos públicos com texto.
- T014: rotas `#/login`, `#/app`, `#/app/qr` e `#/p/<token>` convivem com `#/` e
  `#/emergency`; tokens residuais de OAuth são limpos para `#/app`.
- T015: renderização dos blocos públicos extraída para `PublicBlockList`,
  reutilizada pela demo e pela página pública.
- T016: workflow lê `vars.VITE_BACKEND_URL` e `vars.VITE_BACKEND_ANON_KEY`; os
  valores precisam ser cadastrados no repositório.
- T018: foco visível, rótulos, `aria-live`, alvos de 44 px e redução de movimento
  revisados no código; inspeção visual humana segue pendente.
- T019: **bloqueada** por T003 (duas contas reais). Build e smoke test sem backend
  registrados no onboarding.
- T020/T021: onboarding atualizado com resultado, pendências e rotina de
  exclusão da identidade.

## Histórico de alterações

| Data | Alteração | Autor |
|------|-----------|-------|
| 2026-11-18 | Versão inicial gerada por `/reversa-to-do` | reversa |
| 2026-11-19 | Execução do coding: T001–T002, T004–T018, T020–T021; T003/T019 externos | reversa |
