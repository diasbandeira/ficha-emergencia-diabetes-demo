# Actions: Layout e design da ficha de emergência para a implementação real

> Identificador: `002-layout-implementacao-real`
> Data: `2026-11-18`
> Roadmap: `_reversa_forward/002-layout-implementacao-real/roadmap.md`

## Resumo

| Métrica | Valor |
|---------|-------|
| Total de ações | 11 |
| Paralelizáveis (`[//]`) | 0 |
| Maior cadeia de dependência | 8 |

> Nota: as ações de especificação (T001–T004) editam o mesmo `DESIGN.md`, por isso não são paralelizáveis entre si. A equipe não mantém suíte de testes; a verificação é feita por checklist em `onboarding.md` e por build.

## Fase 1, Preparação

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|----|-----------|--------------|-------------|--------------|-------------|--------|
| T001 | Criar `DESIGN.md` com cabeçalho, princípios de design e anatomia/ordem das seções da ficha | - | - | `DESIGN.md` | 🟢 | `[X]` |
| T002 | Especificar em `DESIGN.md` os componentes nomeados e seus estados (header, chips, alerta, uso contínuo, insulinas, tabela, CTA fixa, rodapé, banner, rótulos público/privado) | T001 | - | `DESIGN.md` | 🟡 | `[X]` |
| T003 | Documentar em `DESIGN.md` os tokens de design (cor, tipografia, espaço, raio, toque), incluindo `--color-primary` neutro/azul e derivados de contraste | T001 | - | `DESIGN.md` | 🟢 | `[X]` |
| T004 | Documentar em `DESIGN.md` responsividade (320/600/860 px) e acessibilidade (contraste, tamanhos, foco, reduced-motion, não depender só de cor) | T001 | - | `DESIGN.md` | 🟢 | `[X]` |

## Fase 2, Testes

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|----|-----------|--------------|-------------|--------------|-------------|--------|
| T005 | Registrar checklist verificável de contraste, tema, toque e responsividade em `onboarding.md` | T003, T004 | - | `_reversa_forward/002-layout-implementacao-real/onboarding.md` | 🟢 | `[X]` |

## Fase 3, Núcleo

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|----|-----------|--------------|-------------|--------------|-------------|--------|
| T006 | Introduzir o token layer `--color-primary` e derivados em `:root`, preservando os tokens existentes | T003 | - | `src/styles.css` | 🟢 | `[X]` |
| T007 | Aplicar o token de cor principal aos destaques (botões primários, links ativos, foco) mantendo contraste AA | T006 | - | `src/styles.css` | 🟡 | `[X]` |

## Fase 4, Integração

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|----|-----------|--------------|-------------|--------------|-------------|--------|
| T008 | Executar `npm run build` e confirmar que a aplicação compila com os tokens novos | T007 | - | `package.json` | 🟢 | `[X]` |
| T009 | Verificar visualmente em 320/600/860 px, contraste e alvos de toque; registrar achados | T008 | - | `src/styles.css` | 🟡 | `[X]` |

## Fase 5, Polimento

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|----|-----------|--------------|-------------|--------------|-------------|--------|
| T010 | Atualizar `onboarding.md` com o resultado da verificação e eventuais notas | T009 | - | `_reversa_forward/002-layout-implementacao-real/onboarding.md` | 🟢 | `[X]` |
| T011 | Alinhar `DESIGN.md` aos tokens efetivamente implementados e fechar pendências da especificação | T007, T010 | - | `DESIGN.md` | 🟢 | `[X]` |

## Notas de execução

## Histórico de alterações

| Data | Alteração | Autor |
|------|-----------|-------|
| 2026-11-18 | Versão inicial gerada por `/reversa-to-do` | reversa |
