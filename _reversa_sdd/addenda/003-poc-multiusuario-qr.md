# Adendo: POC multiusuário com QR por pessoa

> Identificador da feature: `003-poc-multiusuario-qr`
> Data: `2026-11-19`
> Cenário: **greenfield** (âncora em `prd.md` + specs em `sdd/`)

## Vigência

Vigente desde 2026-11-19.

## Resumo da entrega

A POC multiusuário adiciona contas com login Google, consentimento versionado,
uma ficha por conta, edição por bloco com visibilidade pública/privada, QR por
pessoa e página pública acessada por token opaco. O isolamento é garantido por
RLS no banco; a leitura pública passa apenas por `get_public_card(p_token)` e
devolve nome de exibição, data e blocos públicos. A demo original continua nas
rotas `#/` e `#/emergency`.

Ações concluídas: **19 de 21**. Bloqueadas por dependência externa: **T003** e
**T019**. Build (`tsc --noEmit && vite build`) verde.

## Pendências registradas

| Item | Pendência | Quem resolve | Onde está documentado |
|------|-----------|--------------|-----------------------|
| T003 | Criar projeto gratuito e configurar OAuth Google para `localhost` e Pages | Dono da conta | `actions.md`; `onboarding.md` seções 1–3 e 7 |
| T016 | Cadastrar `VITE_BACKEND_URL` e `VITE_BACKEND_ANON_KEY` em `vars` do repositório | Dono do repositório | `.github/workflows/pages.yml`; `onboarding.md` seção 2 |
| T019 | Testar com duas contas reais e inspecionar 320/600/860 px | Dono + operador | `onboarding.md` seções 4–6, 10 |
| Migrações | Aplicar `0001_init.sql` e `0002_rls.sql` após T003 | Operador | `onboarding.md` seção 7 |
| Exclusão de identidade | Remover `auth.users` pela rotina do operador | Operador | `onboarding.md` seção 8 |

## Custo e vigência da infraestrutura

| Item | Plano | Custo mensal | Vigência |
|------|-------|--------------|----------|
| Banco + auth + leitura pública | Supabase Free | **R$ 0,00** | Sem prazo; pausa após ~1 semana de baixa atividade, restaurável pelo painel |
| Login social | Google Identity (escopos básicos) | **R$ 0,00** | Sem prazo e sem expiração de 7 dias para `openid`/`email`/`profile` |
| Front-end e build | GitHub Pages + Actions (repo público) | **R$ 0,00** | Sem prazo; limites de uso justo |
| **Total** | — | **R$ 0,00/mês** | Enquanto as cotas gratuitas forem respeitadas |

- Uso estimado: < 5 MB de banco, ~50 usuários ativos e < 100 MB de egress/mês,
  dentro do Free (500 MB, 50.000 MAU e 5 GB).
- Contingência: Supabase Pro a partir de **US$ 25/mês**; Firebase Blaze por
  consumo (exige cartão).
- Não há período de teste com data de expiração. O risco é operacional (pausa
  por inatividade), não prazo contratual.
- Checagem mensal de cotas e status está em `onboarding.md`, seção 9.
- Fontes e comparação: `investigation.md`, seções 2.1–2.3.

## Impacto por artefato da extração

| Artefato | Seção | Tipo de impacto | Delta |
|----------|-------|-----------------|-------|
| `_reversa_sdd/prd.md` | Escopo | componente-novo | A POC passa a ter contas reais, uma ficha por conta e QR individual; a demo sintética permanece como rota separada. |
| `_reversa_sdd/sdd/gestao-demonstrativa-da-ficha.md` | Gestão | componente-novo | A edição autenticada substitui o estado em memória para dados reais, com consentimento obrigatório e visibilidade por bloco. |
| `_reversa_sdd/sdd/visualizacao-emergencial-e-qr-code.md` | Leitura pública | componente-novo | A página pública real lê por token e mostra só blocos públicos; o QR carrega apenas a URL. |
| `_reversa_sdd/prd.md` | Operação | extensão | Custos, cotas e vigência do plano gratuito passam a fazer parte do aceite operacional da POC. |

## Regras sob vigilância

Os identificadores seguem a ordem das linhas de
`_reversa_forward/003-poc-multiusuario-qr/regression-watch.md`:

- `W001` — RLS: usuário A não lê nem edita ficha de B
- `W002` — leitura pública devolve só blocos públicos
- `W003` — rotacionar/revogar invalida o QR anterior
- `W004` — consentimento obrigatório no gatilho
- `W005` — uma ficha por conta
- `W006` — exclusão remove ficha e link; identidade exige operador
- `W007` — tokens de OAuth no hash não quebram as rotas
- `W008` — demo antiga intacta
- `W009` — estilos e foco visível nas telas novas
- `W010` — build verde
- `W011` — sem `VITE_*`, app orienta configuração em vez de quebrar
- `W012` — auditoria sem texto de saúde

## Fontes

- `_reversa_forward/003-poc-multiusuario-qr/requirements.md`
- `_reversa_forward/003-poc-multiusuario-qr/roadmap.md`
- `_reversa_forward/003-poc-multiusuario-qr/investigation.md`
- `_reversa_forward/003-poc-multiusuario-qr/actions.md`
- `_reversa_forward/003-poc-multiusuario-qr/onboarding.md`
- `_reversa_forward/003-poc-multiusuario-qr/regression-watch.md`
- `_reversa_sdd/prd.md`
- `DESIGN.md`
