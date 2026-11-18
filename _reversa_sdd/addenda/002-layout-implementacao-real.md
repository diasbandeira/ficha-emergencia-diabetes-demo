# Adendo: Layout e design da ficha de emergência para a implementação real

> Identificador da feature: `002-layout-implementacao-real`
> Data: `2026-11-18`
> Cenário: **greenfield** (âncora em `prd.md` + specs em `sdd/`)

## Vigência

Vigente desde 2026-11-18.

## Resumo da entrega

A feature especificou o layout e o design da ficha de emergência para a fase de implementação real: princípios de leitura sob estresse, anatomia e ordem das seções, componentes nomeados com estados, tokens de design (cor, tipografia, espaçamento, raio e toque), responsividade mobile-first e critérios de acessibilidade AA. Entregou também um token layer em `src/styles.css` com `--color-primary` padrão neutro/azul (`#2a6f9e`) e derivados, aplicado aos destaques da interface. Conteúdo permanece sintético e a ação de emergência segue simulada no protótipo.

Ações concluídas: **11 de 11**.

## Impacto por artefato da extração

| Artefato | Seção | Tipo de impacto | Delta |
|----------|-------|-----------------|-------|
| `_reversa_sdd/prd.md` | Objetivos / Escopo da ficha | componente-novo | O PRD deve ser lido com a especificação de design em `DESIGN.md`: ordem das seções e prioridade visual agora estão fixadas (RF-01, RN-03). |
| `_reversa_sdd/sdd/visualizacao-emergencial-e-qr-code.md` | Layout e apresentação | componente-novo | A visualização passa a ter anatomia e componentes nomeados, com alerta de hipoglicemia antes dos detalhes e CTA de emergência fixa (RF-01, RF-03, RF-08). |
| `_reversa_sdd/sdd/gestao-demonstrativa-da-ficha.md` | Composição e rótulos | componente-novo | Os blocos da ficha usam o mesmo padrão visual e rótulos público/privado com suporte textual, não apenas cor (RF-07, RN-06). |
| `_reversa_sdd/sdd/visualizacao-emergencial-e-qr-code.md` | Interface e estilos | componente-novo | A cor principal vira token de tema (`--color-primary`), com derivados de contraste e alvos de toque de 44 px (RF-10, RF-12, RN-07). |

## Regras sob vigilância

Os identificadores abaixo seguem a ordem das linhas da tabela de `_reversa_forward/002-layout-implementacao-real/regression-watch.md`:

- `W001` — contraste ao trocar `--color-primary`
- `W002` — estado ativo do menu e ponto de rota atual
- `W003` — hover do botão primário e cor do link de texto
- `W004` — rótulos público/privado
- `W005` — alvos de toque
- `W006` — tabela de correção em 320 px
- `W007` — foco visível e `prefers-reduced-motion`
- `W008` — banner e rodapé de demonstração sob a CTA fixa
- `W009` — build e deploy no Pages

## Fontes

- `_reversa_forward/002-layout-implementacao-real/legacy-impact.md`
- `_reversa_forward/002-layout-implementacao-real/regression-watch.md`
- `_reversa_forward/002-layout-implementacao-real/requirements.md`
- `_reversa_forward/002-layout-implementacao-real/progress.jsonl`
- `_reversa_forward/002-layout-implementacao-real/actions.md`
- `DESIGN.md`
