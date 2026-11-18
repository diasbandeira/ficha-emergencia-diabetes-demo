# Investigation: Layout e design da ficha de emergência

> Identificador: `002-layout-implementacao-real`
> Data: `2026-11-18`
> Requirements: `_reversa_forward/002-layout-implementacao-real/requirements.md`

## 1. Pergunta de investigação

Como especificar um layout de ficha de emergência que seja lido rapidamente sob estresse, no celular, e que possa receber uma cor principal escolhida pelo usuário no futuro — sem transformar o protótipo em orientação clínica?

## 2. Referência visual fornecida

O responsável forneceu uma imagem de um cartão médico de emergência como referência **positiva** (bom layout). Características observadas e o que aproveitar:

| Característica da referência | Aproveitar? | Observação |
|-----------------------------|-------------|------------|
| Cabeçalho colorido com nome, idade e tipo sanguíneo | Sim (estrutura) | Cor vira token; dados continuam sintéticos |
| Condições de saúde como itens curtos e agrupados | Sim | Facilita leitura por varredura (RF-03) |
| Alerta de hipoglicemia com sintomas comuns e graves | Sim (estrutura) | Conteúdo continua sintético e marcado como demonstração (RN-09) |
| Blocos de uso contínuo com nome, dose e frequência | Sim | Padronização (RF-05) |
| Seção de insulinas separada | Sim | Diferencia tipos (RF-06) |
| Tabela de correção por faixa e unidades | Sim (estrutura) | Valores sintéticos; rolagem contida (RF-07) |
| Botão fixo "Ligar para emergência" | Sim (comportamento) | Simulado no protótipo; destino real parametrizável (RN-08) |
| Paleta quente (laranja) | Não | Cor principal será token neutro/azul, configurável (RN-07) |

## 3. Alternativas avaliadas

| Alternativa | Prós | Contras | Veredito |
|-------------|------|---------|----------|
| A. Reconstruir a ficha real agora, com conteúdo clínico | Resultado imediato | Exige conteúdo validado, fere RN-09 e o escopo greenfield | Descartada |
| B. Só refazer o visual do protótipo, sem especificação | Rápido | Não orienta a implementação real nem a troca de cor futura | Descartada |
| C. Especificação de layout + tokens + seam de tema no protótipo | Orienta a implementação real, mantém segurança e permite tema | Não entrega a ficha real nesta fase | **Escolhida** |
| D. Adotar uma biblioteca de UI/design system pronto | Componentes prontos | Adiciona dependência, conflita com D-09 e com a identidade do protótipo | Descartada |

## 4. Padrões aplicáveis

- **Hierarquia de alerta:** título inequívoco + ícone + rótulo textual + agrupamento de severidade, sem depender de cor (RN-05).
- **Action bar fixa:** barra inferior persistente com área segura (`env(safe-area-inset-bottom)`) e espaço reservado no conteúdo para não cobrir o rodapé.
- **Tabela responsiva:** contêiner com rolagem horizontal e primeira coluna/contexto visível.
- **Mobile-first:** layout base para largura mínima de 320 px, com ajustes em faixas maiores.
- **Tema por token:** cor principal em custom property, com tokens derivados de contraste.

## 5. Fontes externas

- Web Content Accessibility Guidelines (WCAG) 2.1 — https://www.w3.org/TR/WCAG21/
- MDN — `env()` e áreas seguras — https://developer.mozilla.org/en-US/docs/Web/CSS/env
- MDN — `position` e `sticky` — https://developer.mozilla.org/en-US/docs/Web/CSS/position
- MDN — contraste e acessibilidade de cores — https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast

## 6. Leitura do código atual

- `src/styles.css` centraliza tokens em `:root` (navy, teal, blue, paper, ink, public, private, amber). Já existe um token azul (`--blue: #2a6f9e`), bom candidato a padrão de `--color-primary`.
- Existe `@media (prefers-reduced-motion: reduce)` e foco visível (`:focus-visible`), base de acessibilidade a preservar.
- `src/components/emergency-demo/EmergencyView.tsx` exibe a ficha pública como lista de blocos; a especificação nova descreve uma anatomia mais rica para a implementação real, sem exigir reescrever o protótipo.
- Não há backend, banco, persistência nem testes automatizados configurados; validação é por build e inspeção.

## 7. Conclusão

O caminho de menor risco é especificação primeiro, com tokens e um seam de tema mínimo no protótipo. Isso atende ao objetivo de "considerar o layout na implementação real" sem introduzir conteúdo clínico nem acoplar a entrega a um framework externo.
