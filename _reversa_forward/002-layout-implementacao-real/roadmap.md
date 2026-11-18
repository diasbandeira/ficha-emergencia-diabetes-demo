# Roadmap: Layout e design da ficha de emergência para a implementação real

> Identificador: `002-layout-implementacao-real`
> Data: `2026-11-18`
> Requirements: `_reversa_forward/002-layout-implementacao-real/requirements.md`
> Confidência: 🟢 CONFIRMADO, 🟡 INFERIDO, 🔴 LACUNA

## 1. Resumo da abordagem

A feature entrega uma **especificação de layout implementável** (não o código da ficha real) mais o **seam de tema** no protótipo atual. Primeiro, documenta-se a anatomia da ficha — cabeçalho de identificação, condições de saúde, alerta de hipoglicemia, uso contínuo, insulinas, tabela de correção, rodapé de aviso e ação fixa de emergência — com hierarquia, tokens, componentes, responsividade e acessibilidade. Em seguida, o protótipo existente recebe um token de cor principal (`--color-primary`, padrão neutro/azul) para provar que a troca de cor futura é viável sem reescrever componentes.

A referência visual fornecida é usada pelos acertos de **hierarquia e agrupamento**, não pela paleta quente. A entrega não reconstrói a ficha real, não adiciona conteúdo clínico validado e não muda a fronteira público/privado nem o aviso de demonstração da feature 001.

## 2. Princípios aplicados

`.reversa/principles.md` não existe neste projeto. Aplicam-se os princípios já materializados em `PRODUCT.md` e nas specs SDD.

| Princípio | Como a feature se relaciona | Status |
|-----------|------------------------------|--------|
| Tornar público/privado distinguível antes de qualquer ação | O layout mantém rótulos de visibilidade e o aviso de demonstração (RF-09) | respeita |
| Deixar o status de demonstração e seus limites sempre claros | A especificação reserva o banner e o rodapé de aviso como elementos obrigatórios | respeita |
| Usar somente conteúdo sintético | Exemplos da especificação e da tabela de correção são sintéticos e marcados (RN-06, RN-09) | respeita |
| Priorizar mobile e baixa familiaridade digital | Abordagem mobile-first, alvos de toque e legibilidade sob estresse (RF-02, RF-11, RF-12) | respeita |
| Isolar o protótipo do site existente | Nenhuma alteração em publicação, workflow ou URL; mudança restrita ao código do protótipo | respeita |

## 3. Decisões técnicas

| ID | Decisão | Justificativa | Alternativas descartadas | Confidência |
|----|---------|----------------|--------------------------|-------------|
| D-01 | Entregar a feature como especificação de layout + tokens, não como reconstrução da ficha real | O objetivo é orientar a fase de implementação real; o protótipo não deve incorporar conteúdo clínico real | reescrever a ficha real agora, alterar o legado/site existente | 🟢 |
| D-02 | Centralizar cores em um token layer com `--color-primary` (padrão neutro/azul) e derivados de contraste | Permite a troca de cor principal pelo usuário no futuro sem tocar componentes (RN-07) | cores fixas espalhadas, troca por CSS inline caso a caso | 🟢 |
| D-03 | Adotar da referência apenas a hierarquia e o agrupamento, não a paleta quente | O responsável confirmou que a referência é positiva pela estrutura; cor fica como token | copiar literalmente o layout/paleta da referência | 🟢 |
| D-04 | Documentar componentes como blocos nomeados (header, chips, alert, med list, insulin list, table, sticky CTA, footer) | Dá à implementação real um vocabulário estável e testável | descrever a tela como uma página única sem componentes | 🟡 |
| D-05 | Ação fixa de emergência via posicionamento fixo/sticky com `env(safe-area-inset-*)` e sem depender de cor | Atende RF-08 e respeita aparelhos com recorte/área segura | botão no fim do conteúdo, botão flutuante sem área segura | 🟡 |
| D-06 | Tabela de correção com rolagem horizontal contida e cabeçalho de contexto fixo | Evita perda de contexto em telas pequenas (RF-07) | esconder colunas, quebrar a tabela em texto corrido | 🟡 |
| D-07 | Faixas de responsividade alinhadas ao CSS atual: pequena < 600 px, média 600–860 px, grande > 860 px | Coerência com `src/styles.css` e menor risco de regressão | breakpoints novos sem relação com o existente | 🟡 |
| D-08 | Alvos de acessibilidade concretos: texto ≥ 16 px, alerta ≥ 20 px, contraste ≥ 4,5:1 (texto) e ≥ 3:1 (interface), toque ≥ 44×44 px | Torna RF-02/RF-12 verificáveis | diretrizes vagas ("legível", "grande") | 🟢 |
| D-09 | Não introduzir dependências novas | Mantém a entrega leve e estática (RNF Desempenho) | bibliotecas de UI, frameworks de design | 🟢 |
| D-10 | Não incluir orientação clínica; exemplos são sintéticos e marcados | Respeita RN-06/RN-09 e a fronteira da feature 001 | usar doses/faixas reais como exemplo | 🟢 |

## 4. Premissas

Nenhuma. O `requirements.md` não tem marcadores `[DÚVIDA]` em aberto (as três dúvidas foram resolvidas na sessão 2026-11-18).

| Premissa | Origem (`requirements.md` seção) | Risco se errada |
|----------|----------------------------------|-----------------|
| n/a | n/a | n/a |

## 5. Delta arquitetural

> Não há `_reversa_sdd/architecture.md` (projeto greenfield). A âncora é `prd.md` + specs SDD. Componentes abaixo são do protótipo atual.

| Componente | Arquivo de origem no legado | Tipo de mudança | Resumo |
|------------|------------------------------|-----------------|--------|
| Camada de tokens de estilo | `src/styles.css` | regra-alterada | Introduzir `--color-primary` (neutro/azul) e derivados; manter demais tokens. |
| Especificação de layout | documento novo `DESIGN.md` (raiz) | componente-novo | Anatomia, componentes, tokens, responsividade e acessibilidade da ficha. |
| Visualização emergencial | `src/components/emergency-demo/EmergencyView.tsx` | regra-alterada (mínima) | Consumir tokens de cor principal sem alterar conteúdo/lógica. |
| Gestão demonstrativa | `src/pages/EmergencyDemo.tsx` | regra-alterada (mínima) | Consumir tokens onde houver cor de destaque; sem mudança funcional. |

## 6. Delta no modelo de dados

- Resumo das mudanças: **nenhuma** mudança no modelo de dados de runtime. O "delta" é conceitual: nomes de tokens de design. Não há persistência, migração ou schema.
- Detalhe completo em: `_reversa_forward/002-layout-implementacao-real/data-delta.md`

## 7. Delta de contratos externos

| Contrato | Tipo | Arquivo de detalhe |
|----------|------|--------------------|
| nenhum | n/a | n/a |

## 8. Plano de migração

1. Documentar a anatomia da ficha e a ordem das seções (RF-01, RN-03).
2. Definir os componentes nomeados e seus estados (RF-03 a RF-08).
3. Definir tokens de design com `--color-primary` neutro/azul e derivados de contraste (RF-10, RN-07).
4. Definir regras de responsividade e acessibilidade com valores concretos (RF-02, RF-11, RF-12).
5. Implementar o token layer no `src/styles.css` e consumir nos componentes existentes, sem mudar conteúdo nem lógica.
6. Validar contraste, alvos de toque e comportamento do token em viewport móvel.
7. Registrar no `onboarding.md` o roteiro de verificação para o responsável.

## 9. Riscos e mitigações

| Risco | Impacto | Probabilidade | Mitigação |
|-------|---------|---------------|-----------|
| Cor principal escolhida pelo usuário quebrar contraste | alto | médio | Derivar tokens de texto/contraste a partir da cor principal e documentar verificação de contraste |
| Ação fixa cobrir conteúdo crítico no celular | alto | médio | Reservar espaço inferior, usar área segura e testar em viewport pequeno |
| Tabela de correção perder contexto em tela pequena | médio | médio | Rolagem horizontal contida com cabeçalho de contexto |
| Escopo escorregar para reconstruir a ficha real | alto | médio | Entregar especificação + token seam, sem conteúdo clínico real (RN-09) |
| Conflito com a direção visual atual do protótipo | médio | baixo | Cor como token; manter estrutura e padrões existentes |
| Acessibilidade tratada como opcional | alto | baixo | Valores concretos e cenário Gherkin de falha no requirements |

## 10. Critério de pronto

- [ ] `DESIGN.md` cobre anatomia, componentes, tokens, responsividade e acessibilidade.
- [ ] Tokens incluem `--color-primary` neutro/azul e derivados de contraste documentados.
- [ ] `src/styles.css` expõe o token e os componentes consumem sem mudar conteúdo.
- [ ] Texto ≥ 16 px, alerta ≥ 20 px, contraste ≥ 4,5:1/≥ 3:1 e toque ≥ 44×44 px verificados.
- [ ] Ação de emergência simulada no protótipo, sem discagem; destino real parametrizável documentado.
- [ ] Fronteira público/privado e aviso de demonstração preservados.
- [ ] Todas as ações do `actions.md` marcadas `[X]`.
- [ ] `regression-watch.md` gerado.

## 11. Histórico de alterações

| Data | Alteração | Autor |
|------|-----------|-------|
| 2026-11-18 | Versão inicial gerada por `/reversa-plan` após `/reversa-clarify` zerar as dúvidas. | reversa |
