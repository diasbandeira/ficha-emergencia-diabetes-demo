# Legacy Impact: Layout e design da ficha de emergência para a implementação real

> Identificador da feature: `002-layout-implementacao-real`
> Data: `2026-11-18`
> Cenário: **greenfield**
> Feature greenfield, sem legado pré-existente. Âncora: `prd.md` + specs SDD em `_reversa_sdd/sdd/`.
> Política de edição no momento da execução: `allowLegacyEdits: true`, `allowedPaths: []` (liberação irrestrita).

Nenhum arquivo de um sistema legado foi criado, alterado ou removido por esta feature. A tabela abaixo mapeia cada arquivo entregue ao componente correspondente das specs SDD, usando o tipo `componente-novo` para todos.

## Arquivos afetados

| Arquivo afetado | Componente | Tipo | Severidade | Justificativa |
|-----------------|------------|------|------------|---------------|
| `DESIGN.md` | Visualização emergencial e QR Code | componente-novo | MEDIUM | Especificação de design: princípios, anatomia, componentes, tokens, responsividade e acessibilidade (RF-01..RF-13). |
| `src/styles.css` | Aplicação (design/UI) | componente-novo | MEDIUM | Token layer `--color-*`, tipografia, espaçamento, raio e toque; aplicação da cor principal em destaques (RF-10..RF-12, RN-07). |
| `_reversa_forward/002-layout-implementacao-real/onboarding.md` | Validação e publicação independente | componente-novo | LOW | Checklist verificável e resultado da verificação de tema, contraste, toque e responsividade. |

## Diff conceitual por componente

- **Visualização emergencial e QR Code:** nova especificação `DESIGN.md` que fixa a ordem das seções (identificação, condições, alerta de hipoglicemia, uso contínuo, insulinas, tabela, aviso e ação de emergência), os componentes nomeados com estados e as regras de acessibilidade. O conteúdo permanece sintético e a ação de emergência segue simulada no protótipo.
- **Aplicação (design/UI):** `src/styles.css` ganha um token layer neutro com `--color-primary` padrão `#2a6f9e` e derivados, além de tokens de tipografia, espaçamento, raio e alvo de toque. A cor principal passa a alimentar botão primário, link ativo, link de texto e rótulos público/privado; alvos de toque sobem para 44 px. A troca de `--color-primary` altera os destaques sem tocar no conteúdo.
- **Validação e publicação independente:** `onboarding.md` recebe checklist verificável por requisito e o resultado da verificação (build, contraste, alvos e breakpoints), permitindo repetir a validação sem dados reais.

## Preservadas

Nenhuma. Cenário greenfield: não existe `domain.md` de legado com regras 🟢 a preservar.

## Modificadas

Nenhuma. Cenário greenfield: não existem regras 🟢 de legado alteradas ou removidas.

## Fontes

- `_reversa_forward/002-layout-implementacao-real/requirements.md`
- `_reversa_forward/002-layout-implementacao-real/actions.md`
- `_reversa_forward/002-layout-implementacao-real/roadmap.md`
- `_reversa_sdd/prd.md`
- `_reversa_sdd/sdd/visualizacao-emergencial-e-qr-code.md`
- `_reversa_sdd/sdd/gestao-demonstrativa-da-ficha.md`
