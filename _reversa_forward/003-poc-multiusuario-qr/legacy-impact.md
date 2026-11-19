# Legacy Impact: POC multiusuário com QR por pessoa

> Identificador da feature: `003-poc-multiusuario-qr`
> Data: `2026-11-19`
> Cenário: **greenfield**
> Feature greenfield, sem legado pré-existente. Âncora: `prd.md` + specs SDD em `_reversa_sdd/sdd/`.
> Política de edição no momento da execução: `allowLegacyEdits: true`, `allowedPaths: []` (liberação irrestrita).

Nenhum arquivo de um sistema legado foi criado, alterado ou removido. A tabela
mapeia cada arquivo entregue ao componente correspondente das specs, com o tipo
`componente-novo` para todos.

## Arquivos afetados

| Arquivo afetado | Componente | Tipo | Severidade | Justificativa |
|-----------------|------------|------|------------|---------------|
| `.env.example` | Backend e sessão | componente-novo | LOW | Modelo das variáveis públicas `VITE_BACKEND_*`. |
| `src/vite-env.d.ts` | Backend e sessão | componente-novo | LOW | Tipagem das variáveis de ambiente do Vite. |
| `package.json`, `package-lock.json` | Backend e sessão | componente-novo | MEDIUM | Cliente `@supabase/supabase-js@2`. |
| `supabase/migrations/0001_init.sql` | Dados | componente-novo | HIGH | Entidades `account`, `consent`, `emergency_card`, `card_block`, `audit_event`, unicidade e gatilhos. |
| `supabase/migrations/0002_rls.sql` | Dados e privacidade | componente-novo | HIGH | RLS default deny, grants e leitura pública restrita por token. |
| `src/lib/backend.ts` | Backend e sessão | componente-novo | MEDIUM | Cliente único e flag de configuração. |
| `src/auth/AuthProvider.tsx` | Backend e sessão | componente-novo | MEDIUM | Sessão persistida e login Google. |
| `src/types/card.ts` | Ficha | componente-novo | LOW | Modelo de blocos, visibilidade e termo. |
| `src/services/cardService.ts` | Ficha e compartilhamento | componente-novo | HIGH | Leitura, salvamento, consentimento, rotação/revogação e exclusão. |
| `src/components/ConsentGate.tsx` | Consentimento | componente-novo | HIGH | Bloqueio do uso sem aceite registrado. |
| `src/pages/Login.tsx` | Acesso | componente-novo | MEDIUM | Entrada com Google e avisos de configuração. |
| `src/pages/MyCard.tsx` | Ficha | componente-novo | HIGH | Edição por bloco, nome de exibição e exclusão. |
| `src/pages/CardQr.tsx` | Compartilhamento | componente-novo | HIGH | Gerar, baixar, rotacionar e revogar o QR. |
| `src/pages/PublicCard.tsx` | Leitura pública | componente-novo | HIGH | Página por token exibindo só blocos públicos. |
| `src/components/emergency-demo/PublicBlockList.tsx` | Leitura pública | componente-novo | LOW | Renderizador reutilizado pela demo e pela página pública. |
| `src/components/emergency-demo/EmergencyView.tsx` | Demo preservada | modificado | LOW | Passa a usar `PublicBlockList`; fluxo e conteúdo da demo intactos. |
| `src/navigation/hashRoute.ts` | Navegação | modificado | HIGH | Novas rotas `#/login`, `#/app`, `#/app/qr`, `#/p/<token>`; `#/` e `#/emergency` preservadas. |
| `src/App.tsx` | Aplicação | modificado | HIGH | `AuthProvider`, guarda de sessão, rotas novas e limpeza de tokens de OAuth. |
| `src/styles.css` | Aplicação (UI) | modificado | MEDIUM | Estilos das telas novas com os tokens de `DESIGN.md` e foco visível. |
| `.github/workflows/pages.yml` | Publicação | modificado | MEDIUM | Variáveis públicas no build do Pages via `vars`. |

## Diff conceitual por componente

- **Dados e privacidade:** cinco entidades com chaves e restrições; uma ficha por
  conta (`unique(account_id)`), um bloco por chave e token público único parcial.
  RLS default deny por `auth.uid()`; leitura anônima apenas pela função
  `get_public_card(p_token)`, que devolve nome, data e blocos públicos.
- **Consentimento:** registro versionado por conta; gatilhos recusam criar ou
  atualizar ficha e blocos sem consentimento ativo (`consent_required`).
- **Ficha e compartilhamento:** o cliente salva todos os blocos (inclusive
  vazios, para limpar conteúdo), gera token aleatório de 32 bytes e permite
  rotacionar e revogar; auditoria registra criação, atualização e mudanças de
  link, sem conteúdo de saúde.
- **Leitura pública:** QR carrega apenas o endereço; a página busca o token e
  renderiza nome de exibição, data e blocos públicos com o aviso de POC.
- **Navegação:** rotas por hash convivem com a demo; OAuth devolve tokens no
  hash, que são limpos redirecionando para `#/app`.
- **Publicação:** o build lê `vars.VITE_BACKEND_URL` e
  `vars.VITE_BACKEND_ANON_KEY`; sem elas, o app mostra instrução de configuração
  e a demo antiga segue funcionando.

## Preservadas

- Rotas e conteúdo da demonstração (`#/` e `#/emergency`), incluindo banner,
  checklist e visualização fictícia.
- Tokens de tema e decisões de `DESIGN.md` (cor principal, contraste, 44 px).

## Modificadas

- `EmergencyView` deixou de duplicar a lista de blocos públicos; o visual e o
  comportamento da demo não mudaram.
- `App` passou a compor sessão e novas rotas; a demo mantém o estado local.

## Fontes

- `_reversa_forward/003-poc-multiusuario-qr/requirements.md`
- `_reversa_forward/003-poc-multiusuario-qr/roadmap.md`
- `_reversa_forward/003-poc-multiusuario-qr/actions.md`
- `_reversa_forward/003-poc-multiusuario-qr/data-delta.md`
- `_reversa_forward/003-poc-multiusuario-qr/interfaces/card-service.md`
- `_reversa_sdd/prd.md`
