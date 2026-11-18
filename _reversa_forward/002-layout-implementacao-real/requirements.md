# Requirements: Layout e design da ficha de emergência para a implementação real

> Identificador: `002-layout-implementacao-real`
> Data: `2026-11-18`
> Pasta da extração reversa: `_reversa_sdd/`
> Confidência: 🟢 CONFIRMADO, 🟡 INFERIDO, 🔴 LACUNA / DÚVIDA

## 1. Resumo executivo

🟡 Esta feature define os requisitos de layout e design da ficha de emergência para a fase de implementação real do produto, tomando como referência visual positiva a imagem de um cartão médico de emergência fornecida pelo responsável do projeto. O objetivo é substituir uma apresentação densa e pouco hierarquizada por uma tela legível sob estresse, com agrupamento claro de condições de saúde, alerta destacado de hipoglicemia, blocos de uso contínuo, insulinas, tabela de correção e uma ação fixa de emergência, em abordagem mobile-first e acessível. A feature entrega uma especificação de layout implementável, não o código da implementação real.

## 2. Contexto a partir do legado

> Âncora greenfield: este projeto usa `prd.md` + specs SDD (não há `architecture.md`/`domain.md` de legado extraído). As fontes abaixo definem o comportamento e a fronteira de segurança que o novo layout deve preservar.

| Fonte | Trecho relevante | Confidência |
|-------|------------------|-------------|
| `_reversa_sdd/prd.md#Escopo (in)` | A ficha deve ser legível em dispositivo móvel sob pressão e distinguir informação pública de privada. | 🟢 |
| `_reversa_sdd/prd.md#Não-objetivos (out)` | O conteúdo não pode ser apresentado como orientação clínica real; exemplos devem ser sintéticos. | 🟢 |
| `_reversa_sdd/sdd/visualizacao-emergencial-e-qr-code.md#8. Design e Interface` | A visualização deve exibir aviso de demonstração antes do conteúdo e apenas blocos públicos sintéticos. | 🟢 |
| `_reversa_sdd/sdd/gestao-demonstrativa-da-ficha.md#8. Design e Interface` | A gestão deve tornar visível quais blocos são públicos ou privados antes da visualização. | 🟢 |
| `_reversa_sdd/sdd/validacao-e-publicacao-independente.md#8. Design e Interface` | A publicação é estática, e a página/rota pública deve permanecer verificável e isolada. | 🟢 |
| `_reversa_sdd/addenda/001-validar-prototipo-emergencia.md#Impacto por artefato da extração` | A entrega 001 implementou gestão, visualização e publicação; o layout novo deve preservar essas capacidades. | 🟢 |

## 3. Personas e cenários de uso

| Persona | Objetivo | Cenário-chave |
|---------|----------|---------------|
| Pessoa com diabetes ou cuidador | Preparar e revisar uma ficha que seja lida rapidamente em uma emergência | Percorre a ficha no celular e localiza condição, alerta e contato sem esforço |
| Pessoa que presta primeiros socorros | Encontrar a informação crítica sob estresse e em pouco tempo | Abre a ficha e identifica de imediato o alerta de hipoglicemia e a ação de emergência |
| Responsável pela implementação real | Construir a tela a partir de uma especificação de layout inequívoca | Usa a especificação de layout, hierarquia e tokens para implementar sem reinterpretar |
| Facilitador da validação | Avaliar a compreensão do layout com participantes | Observa se os participantes acham as informações e distinguem o que é demonstração |

## 4. Regras de negócio novas ou alteradas

1. **RN-01:** O layout é um requisito de produto de primeira classe na implementação real, não um acabamento posterior; a especificação de layout deve ser produzida e aprovada antes do código da implementação real. 🟡
   - Origem no legado: `_reversa_sdd/prd.md#Escopo (in)` (legibilidade em contexto de estresse).
   - Tipo: nova
2. **RN-02:** A imagem de referência fornecida é uma referência visual positiva; o layout real deve adotar seus acertos de hierarquia (cabeçalho de identificação, seções agrupadas, alerta em destaque e ação de emergência fixa) sem copiar literalmente sua paleta quente nem reproduzir conteúdo clínico fictício como dado real. 🟢
   - Origem no legado: `_reversa_sdd/prd.md#Não-objetivos (out)`; esclarecimento do responsável em 2026-11-18.
   - Tipo: nova
3. **RN-03:** Em qualquer tela, a ordem de prioridade visual é: identificação e condição crítica, alerta de hipoglicemia, informação de contato/ação de emergência, e só depois detalhes de uso contínuo, insulinas e tabela de correção. 🟡
   - Origem no legado: `_reversa_sdd/sdd/visualizacao-emergencial-e-qr-code.md#8. Design e Interface`.
   - Tipo: nova
4. **RN-04:** O layout deve manter visível a fronteira entre informação pública e privada e o aviso de demonstração, herdados da feature 001. 🟢
   - Origem no legado: `_reversa_sdd/addenda/001-validar-prototipo-emergencia.md#Impacto por artefato da extração`.
   - Tipo: alterada (restrição de design sobre a entrega 001)
5. **RN-05:** Nenhum elemento do layout pode depender apenas de cor para comunicar severidade, visibilidade ou estado; cada estado deve ter rótulo textual ou ícone com significado. 🟢
   - Origem no legado: `_reversa_sdd/prd.md#Acessibilidade & Inclusão` (implícita; ver `PRODUCT.md`).
   - Tipo: nova
6. **RN-06:** Textos, exemplos e rótulos da especificação de layout usam apenas conteúdo sintético e não podem introduzir diagnóstico, dose ou instrução clínica apresentada como orientação válida. 🟢
   - Origem no legado: `_reversa_sdd/prd.md#Não-objetivos (out)`.
   - Tipo: nova
7. **RN-07:** A cor principal é um token de tema. Nesta fase, usar uma cor neutra ou o azul; no futuro, o próprio usuário poderá escolher a cor principal. O restante da linguagem visual (tipografia, espaçamento, ícones e rótulos) deve ser neutro o suficiente para que a troca de cor não quebre contraste nem legibilidade. 🟢
   - Origem no legado: `_reversa_sdd/prd.md#Restrições` (coerência visual); esclarecimento do responsável em 2026-11-18.
   - Tipo: nova
8. **RN-08:** No protótipo, a ação fixa de emergência é visual e simulada, sem iniciar ligação. Na implementação real, ela aponta para o número de emergência local (por exemplo, 192/SAMU no Brasil), tratado como parâmetro configurável. 🟢
   - Origem no legado: `_reversa_sdd/sdd/visualizacao-emergencial-e-qr-code.md#8. Design e Interface`; esclarecimento do responsável em 2026-11-18.
   - Tipo: nova
9. **RN-09:** A validação clínica do conteúdo (alerta de hipoglicemia e tabela de correção) fica fora do escopo desta feature. A especificação usa apenas exemplos sintéticos e marcados como demonstração, e a aprovação por responsável clínico é pré-requisito da fase operacional, a ser definida depois. 🟢
   - Origem no legado: `_reversa_sdd/prd.md#Não-objetivos (out)`; esclarecimento do responsável em 2026-11-18.
   - Tipo: nova

## 5. Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de aceite | Confidência |
|----|-----------|------------|--------------------|-------------|
| RF-01 | A especificação de layout deve definir a estrutura e a ordem das seções da ficha: cabeçalho de identificação (nome de demonstração, idade, tipo sanguíneo), condições de saúde, alerta de hipoglicemia, uso contínuo, insulinas, tabela de correção e rodapé de aviso. | Must | A especificação lista cada seção na ordem de exibição e descreve seu conteúdo e peso visual. | 🟡 |
| RF-02 | O layout deve priorizar a legibilidade sob estresse, com escala tipográfica e contraste que permitam ler a informação crítica à distância de um braço no celular. | Must | A especificação fixa corpo de texto ≥ 16 px e texto do alerta ≥ 20 px, com contraste ≥ 4,5:1 no texto e ≥ 3:1 nos elementos de interface. | 🟡 |
| RF-03 | As condições de saúde devem ser agrupadas e exibidas como itens curtos e rotulados, fáceis de escanear. | Must | A especificação descreve o componente de condições e seu comportamento com uma ou várias condições. | 🟡 |
| RF-04 | O alerta de hipoglicemia deve ser um componente destacado, com título inequívoco, sintomas comuns e sintomas graves, sem depender apenas de cor. | Must | A especificação define o componente de alerta, seus rótulos e como ele se diferencia do restante da página; os exemplos são sintéticos e marcados como demonstração, não como orientação clínica. | 🟡 |
| RF-05 | O bloco de uso contínuo deve apresentar cada medicamento com nome, dose e frequência de forma consistente. | Must | A especificação define o padrão do item de medicamento e o que ocorre quando há vários itens. | 🟡 |
| RF-06 | O bloco de insulinas deve distinguir cada tipo de insulina com dose e janela de aplicação de forma legível. | Must | A especificação define o padrão do item de insulina e diferencia insulinas de medicamentos orais. | 🟡 |
| RF-07 | A tabela de correção deve relacionar faixa de glicemia a quantidade de unidades de forma tabular e legível em telas pequenas. | Must | A especificação define a tabela, o comportamento em largura reduzida e como evitar perda de contexto; os valores são sintéticos e marcados como demonstração. | 🟡 |
| RF-08 | A ação fixa de emergência deve permanecer acessível durante a rolagem no celular, sem cobrir informação crítica nem o aviso de demonstração. | Must | A especificação define posição, área de toque ≥ 44×44 px, comportamento com área segura do aparelho e convivência com o aviso de demonstração; no protótipo a ação é simulada sem discagem e, na implementação real, aponta para o número de emergência local (192/SAMU) como parâmetro. | 🟢 |
| RF-09 | O layout deve preservar os rótulos de visibilidade público/privado e o aviso persistente de demonstração definidos na feature 001. | Must | A especificação mostra onde esses elementos aparecem em cada seção e como continuam legíveis no novo layout. | 🟢 |
| RF-10 | A especificação deve incluir os tokens de design implementáveis (cores, tipografia, espaçamento, raios, sombras e estados), com um token de cor principal substituível cujo valor padrão seja neutro ou azul. | Should | A especificação contém uma tabela/lista de tokens com nomes, valores e finalidade, incluindo o token de cor principal e a indicação de que ele será configurável pelo usuário. | 🟢 |
| RF-11 | O layout deve ser mobile-first e responsivo, definindo o comportamento para larguras pequenas, médias e grandes. | Must | A especificação descreve a ordem e o empilhamento dos blocos em cada faixa de largura. | 🟡 |
| RF-12 | O layout deve ser acessível: contraste mínimo AA, alvos de toque adequados, foco visível, estrutura semântica de títulos e respeito a redução de movimento. | Must | A especificação lista os critérios de acessibilidade e como cada componente os atende. | 🟡 |
| RF-13 | A especificação deve indicar quais elementos são independentes de conteúdo, funcionando tanto com dados sintéticos quanto com dados reais futuros. | Should | A especificação marca os componentes que não mudam quando o conteúdo passa de sintético para real. | 🟡 |

## 6. Requisitos Não Funcionais

| Tipo | Requisito | Evidência ou justificativa | Confidência |
|------|-----------|----------------------------|-------------|
| Acessibilidade | Atender aos critérios de contraste e navegação por teclado/leitor de tela aplicáveis (Web Content Accessibility Guidelines — WCAG — 2.1 nível AA): contraste ≥ 4,5:1 no texto, ≥ 3:1 em elementos de interface e alvos de toque ≥ 44×44 px. | Público com baixa familiaridade digital e uso sob estresse (`prd.md#Acessibilidade & Inclusão`). | 🟡 |
| Legibilidade ambiental | O conteúdo crítico deve continuar legível em ambiente claro e com iluminação irregular. | Cenário de uso em emergência, possivelmente ao ar livre. | 🟡 |
| Privacidade | A especificação e seus exemplos usam apenas conteúdo sintético, sem dados pessoais ou de saúde reais. | `prd.md#Não-objetivos (out)`. | 🟢 |
| Desempenho | O layout deve ser compatível com uma aplicação estática leve, em hospedagem estática, sem dependências pesadas para renderizar a ficha. | `sdd/validacao-e-publicacao-independente.md#8. Design e Interface`. | 🟢 |
| Manutenibilidade | Os tokens e componentes devem ser nomeados de forma estável para reuso na implementação real. | RN-01 e RF-10. | 🟡 |
| Consistência | A linguagem visual deve ser coerente em todas as seções, sem estilos pontuais por bloco. | RN-07. | 🟡 |

## 7. Critérios de Aceitação

```gherkin
Cenário: Estrutura e prioridade visual definidas
  Dado que a especificação de layout é consultada por quem vai implementar
  Quando percorre a ordem das seções
  Então encontra identificação, alerta de hipoglicemia, contato/ação de emergência antes dos detalhes
  E cada seção tem conteúdo e peso visual descritos

Cenário: Leitura rápida do alerta de hipoglicemia
  Dado que uma pessoa abre a ficha no celular sob estresse
  Quando procura a informação mais crítica
  Então identifica o alerta de hipoglicemia e seus sintomas sem precisar de explicação
  E o alerta não depende apenas de cor para ser compreendido

Cenário: Ação de emergência sempre acessível
  Dado que a ficha é longa e exige rolagem no celular
  Quando a pessoa rola até o fim da página
  Então a ação de emergência continua acessível
  E não cobre o aviso de demonstração nem a informação crítica
  E no protótipo a ação é simulada, sem iniciar ligação
  E na implementação real aponta para o número de emergência local configurado

Cenário: Fronteira público/privado preservada
  Dado que a pessoa compara o que seria público e privado
  Quando consulta a ficha no novo layout
  Então cada bloco mantém seu rótulo de visibilidade
  E o aviso de demonstração continua visível

Cenário: Condições de saúde agrupadas e escaneáveis
  Dado que a ficha exibe uma ou várias condições de saúde
  Quando a pessoa procura saber a condição principal
  Então encontra as condições agrupadas em itens curtos e rotulados
  E consegue distinguir cada condição sem ler parágrafos longos

Cenário: Uso contínuo, insulinas e tabela de correção padronizados
  Dado que a ficha apresenta medicamentos, insulinas e tabela de correção
  Quando a pessoa percorre esses blocos
  Então cada medicamento mostra nome, dose e frequência no mesmo padrão
  E cada insulina mostra tipo, dose e janela de aplicação
  E a tabela de correção mantém o contexto de faixa e unidades em tela pequena

Cenário: Cor principal neutra agora e configurável no futuro
  Dado que a especificação define a cor principal como token de tema
  Quando a implementação usa o valor padrão
  Então a cor principal é neutra ou azul e mantém o contraste mínimo
  E a troca futura da cor principal pelo usuário não depende de reescrever os componentes

Cenário: Tokens e comportamento responsivo definidos
  Dado que a especificação de layout é entregue para implementação
  Quando a pessoa responsável consulta tokens e faixas de largura
  Então encontra cores, tipografia, espaçamento e estados nomeados
  E encontra o empilhamento dos blocos para larguras pequenas, médias e grandes

Cenário: Componentes independentes de conteúdo
  Dado que o conteúdo deixará de ser sintético no futuro
  Quando a pessoa responsável revisa a especificação
  Então identifica quais componentes permanecem iguais com dados reais
  E quais partes são apenas exemplos de demonstração

Cenário: Falha de acessibilidade detectada
  Dado que o layout proposto usa somente cor para indicar severidade
  Quando é avaliado contra os critérios de acessibilidade
  Então a especificação é reprovada
  E deve incluir rótulo textual ou ícone com significado

Cenário: Conteúdo clínico indevido nos exemplos
  Dado que a especificação usa um exemplo de tabela de correção
  Quando o exemplo apresenta dose como orientação válida ao usuário
  Então o exemplo deve ser marcado como demonstração
  E não pode ser apresentado como recomendação clínica real
```

## 8. Prioridade MoSCoW

| Item | MoSCoW | Justificativa |
|------|--------|---------------|
| RF-01 | Must | Sem estrutura definida não há especificação de layout implementável. |
| RF-02 | Must | Legibilidade sob estresse é o problema central desta feature. |
| RF-03 | Must | O agrupamento de condições é um acerto explícito da referência. |
| RF-04 | Must | O alerta de hipoglicemia é a informação mais crítica da ficha. |
| RF-05 | Must | Uso contínuo aparece na referência e é informação frequente. |
| RF-06 | Must | Insulinas têm risco de confusão e exigem padronização clara. |
| RF-07 | Must | A tabela de correção é o bloco de leitura mais difícil em tela pequena. |
| RF-08 | Must | A ação de emergência precisa estar sempre alcançável. |
| RF-09 | Must | Preserva a fronteira de segurança e o aviso de demonstração da 001. |
| RF-10 | Should | Tokens reduzem reinterpretação, mas podem seguir em iteração. |
| RF-11 | Must | O uso principal é no celular. |
| RF-12 | Must | Acessibilidade é condição de uso para o público-alvo. |
| RF-13 | Should | Ajuda a transição para dados reais, mas não bloqueia o layout. |
| RNF de acessibilidade | Must | Contraste e navegação são pré-requisito para o público-alvo. |

## 9. Esclarecimentos

### Sessão 2026-11-18

- **Q:** A direção visual da referência (cartão clínico em laranja) deve substituir a direção atual do protótipo ou vale apenas para a implementação real futura?
  **R:** A referência serve pelos acertos de hierarquia, não pela cor. No futuro, o usuário poderá escolher a cor principal; neste momento, a cor principal pode ser neutra ou azul. A cor deve ser tratada como token de tema substituível.
- **Q:** A tabela de correção e os alertas clínicos pressupõem conteúdo validado por profissional de saúde; quem aprova esse conteúdo e como garantir que a especificação de layout não transforme o protótipo em orientação clínica?
  **R:** Fora do escopo agora. A especificação usa somente exemplos sintéticos marcados como demonstração; a validação clínica fica para a fase operacional, com responsável definido depois.
- **Q:** A ação fixa de emergência precisa de um destino definido: qual é o esperado na implementação real e o que o protótipo deve exibir?
  **R:** No protótipo é visual/simulada, sem discagem. Na implementação real aponta para o número de emergência local (por exemplo, 192/SAMU no Brasil), tratado como parâmetro.

## 10. Lacunas

Nenhuma lacuna em aberto.

## 11. Histórico de alterações

| Data | Alteração | Autor |
|------|-----------|-------|
| 2026-11-18 | Versão inicial gerada por `/reversa-requirements` a partir da referência visual desejada fornecida pelo responsável. | reversa |
