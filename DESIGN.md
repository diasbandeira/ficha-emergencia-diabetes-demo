# Design e Layout: ficha de emergência para diabetes

> Feature: `002-layout-implementacao-real`
> Data: `2026-11-18`
> Status: ✅ ESPECIFICADO
> Fontes: `_reversa_forward/002-layout-implementacao-real/requirements.md`, `roadmap.md`, `data-delta.md`

Este documento é a especificação de layout e design da ficha de emergência para a **fase de implementação real**. Ele orienta quem vai construir a tela; não descreve uma ficha operacional pronta nem contém conteúdo clínico validado.

## 1. Princípios de design

1. **Leitura sob estresse primeiro.** A informação crítica (identificação, alerta de hipoglicemia, ação de emergência) aparece antes dos detalhes.
2. **Nunca depender só de cor.** Todo estado tem rótulo textual ou ícone com significado (severidade, público/privado, estado de compartilhamento).
3. **Mobile-first.** O layout base serve telas de 320 px; larguras maiores apenas reorganizam.
4. **Demonstração sempre visível.** O banner de demonstração e o rodapé de aviso são obrigatórios e persistentes.
5. **Fronteira público/privado explícita.** Cada bloco indica se é público ou privado.
6. **Cor principal é tema.** A cor principal é um token substituível; o conteúdo e a hierarquia não dependem dela.
7. **Conteúdo sintético.** Exemplos são fictícios e marcados; nenhuma dose ou faixa é orientação clínica real.

## 2. Anatomia e ordem das seções

A ficha exibe, de cima para baixo:

1. **Banner de demonstração** — faixa persistente "Conteúdo fictício / demonstração".
2. **Cabeçalho de identificação** — nome de demonstração, idade e tipo sanguíneo, com a cor principal como superfície.
3. **Condições de saúde** — itens curtos e agrupados (ex.: condições sintéticas).
4. **Alerta de hipoglicemia** — bloco destacado com título, sintomas comuns e sintomas graves.
5. **Uso contínuo** — lista de medicamentos com nome, dose e frequência.
6. **Insulinas** — lista separada, com tipo, dose e janela de aplicação.
7. **Tabela de correção** — faixa de glicemia e unidades, em formato tabular.
8. **Rodapé de aviso** — texto de limite de uso e assinatura de demonstração.
9. **Ação fixa de emergência** — botão persistente, sempre alcançável.

> Ordem de prioridade visual (RN-03): identificação e condição crítica → alerta de hipoglicemia → contato/ação de emergência → uso contínuo, insulinas e tabela de correção. A ordem de leitura pode agrupar contato próximo da ação, desde que o alerta venha antes dos detalhes.

## 3. Componentes e estados

### 3.1 Banner de demonstração
- Superfície de aviso, texto "Demonstração — conteúdo fictício".
- Sempre visível; não pode ser ocultado por rolagem nem pela ação de emergência.
- Contraste mínimo AA; não depende só de cor (tem texto).

### 3.2 Cabeçalho de identificação
- Conteúdo: nome de demonstração, idade, tipo sanguíneo.
- Superfície com `--color-primary` e texto `--color-on-primary`.
- Estado padrão apenas; sem interação.

### 3.3 Chips de condições de saúde
- Cada condição é um item curto e rotulado.
- Comportamento com 1..N condições; nunca em parágrafo corrido.
- Rótulo textual sempre presente.

### 3.4 Alerta de hipoglicemia
- Título inequívoco (ex.: "Atenção: hipoglicemia").
- Subtítulos "Sintomas comuns" e "Sintomas graves".
- Sintomas graves em destaque tipográfico, não apenas em cor.
- Texto do corpo ≥ 20 px.

### 3.5 Lista de uso contínuo
- Item: nome, dose, frequência, no mesmo padrão para todos.
- Estado vazio: informar "nenhum medicamento de demonstração".

### 3.6 Lista de insulinas
- Item: tipo, dose, janela de aplicação.
- Diferencia-se visualmente da lista de medicamentos orais, mantendo o mesmo padrão de dados.

### 3.7 Tabela de correção
- Colunas: faixa de glicemia e unidades.
- Contêiner com rolagem horizontal contida; o cabeçalho de contexto permanece visível.
- Valores sintéticos; legenda "exemplo de demonstração".

### 3.8 Rótulos público/privado
- Cada bloco da ficha recebe rótulo textual "Público" ou "Privado".
- Cor auxilia, mas o texto é o que informa.

### 3.9 Ação fixa de emergência
- Barra inferior persistente, alvo ≥ 44×44 px.
- Respeita `env(safe-area-inset-bottom)`.
- Rótulo textual explícito; no protótipo é simulada (sem discagem). Na implementação real, aponta para o número de emergência local (192/SAMU), parametrizável.
- Reserva espaço no fim do conteúdo para não cobrir o rodapé.

### 3.10 Rodapé de aviso
- Texto de limite de uso ("não é orientação clínica / não é serviço real").
- Assinatura de demonstração.

## 4. Tokens de design

Aplicados como custom properties em `src/styles.css`. A cor principal é o único token que o usuário poderá escolher no futuro.

### 4.1 Cor

| Token | Valor padrão | Finalidade |
|-------|--------------|------------|
| `--color-primary` | `#2a6f9e` | Cor principal (neutro/azul), configurável no futuro |
| `--color-primary-strong` | `#1f5a80` | Hover/active da principal |
| `--color-primary-soft` | `#e6eef4` | Fundos suaves derivados |
| `--color-on-primary` | `#ffffff` | Texto sobre a principal |
| `--color-text` | `#142f43` | Texto principal |
| `--color-text-muted` | `#435d70` | Texto secundário |
| `--color-surface` | `#ffffff` | Superfície de conteúdo |
| `--color-surface-alt` | `#edf4f3` | Fundo da página |
| `--color-border` | `#c9d8dd` | Bordas e divisores |
| `--color-public` | `#086c62` | Rótulo público (com texto) |
| `--color-private` | `#325c76` | Rótulo privado (com texto) |
| `--color-alert-bg` | `#fff3ec` | Fundo do alerta |
| `--color-alert-border` | `#c98267` | Borda do alerta |
| `--color-alert-text` | `#542718` | Texto do alerta |
| `--color-emergency` | `#b42318` | Ação de emergência (com rótulo textual) |

### 4.2 Tipografia, espaçamento e alvos

| Token | Valor padrão | Finalidade |
|-------|--------------|------------|
| `--font-size-base` | `16px` | Corpo mínimo |
| `--font-size-alert` | `20px` | Texto do alerta |
| `--font-size-h1` | `28px` | Título da ficha |
| `--font-size-h2` | `20px` | Títulos de seção |
| `--space-1` | `4px` | Espaço mínimo |
| `--space-2` | `8px` | — |
| `--space-3` | `12px` | — |
| `--space-4` | `16px` | — |
| `--space-5` | `24px` | — |
| `--space-6` | `32px` | — |
| `--radius-sm` | `4px` | Bordas pequenas |
| `--radius-md` | `8px` | Cartões |
| `--touch-target` | `44px` | Alvo mínimo de toque |

### 4.3 Contraste verificado (WCAG 2.1 AA)

| Par | Razão | Resultado |
|-----|-------|-----------|
| `#2a6f9e` sobre `#ffffff` | 5.43:1 | ✅ AA texto normal |
| `#1f5a80` sobre `#ffffff` | 7.41:1 | ✅ AAA |
| `#2a6f9e` sobre `#edf4f3` | 4.87:1 | ✅ AA |
| `#b42318` sobre `#ffffff` | 6.57:1 | ✅ AA |
| `#142f43` sobre `#edf4f3` | 12.41:1 | ✅ AAA |
| `#435d70` sobre `#edf4f3` | 6.20:1 | ✅ AA |
| `#086c62` sobre `#ffffff` | 6.30:1 | ✅ AA |
| `#325c76` sobre `#ffffff` | 7.17:1 | ✅ AA |
| `#542718` sobre `#fff3ec` | 11.48:1 | ✅ AAA |

> Ao trocar `--color-primary`, recalcular o contraste de `--color-on-primary` e dos textos sobre superfícies derivadas. Manter ≥ 4,5:1 para texto e ≥ 3:1 para elementos de interface.

## 5. Responsividade

| Faixa | Largura | Comportamento |
|-------|---------|---------------|
| Pequena | < 600 px | Uma coluna; banner compacto; tabela com rolagem horizontal contida; CTA fixa na base |
| Média | 600–860 px | Uma coluna com mais respiro; CTA fixa; tabela ocupa a largura |
| Grande | > 860 px | Conteúdo centralizado com largura máxima; CTA pode virar barra inferior centralizada |

- Largura mínima suportada: 320 px.
- Área segura inferior reservada para a CTA (`env(safe-area-inset-bottom)`).
- Nada de texto abaixo de 16 px no conteúdo crítico.

## 6. Acessibilidade

1. Contraste: texto ≥ 4,5:1; elementos de interface ≥ 3:1.
2. Tamanho: corpo ≥ 16 px; texto do alerta ≥ 20 px.
3. Alvos de toque: ≥ 44×44 px.
4. Foco visível em todo elemento interativo.
5. Estrutura semântica: um `h1`, seções com `h2`, tabela com `caption` e cabeçalhos `th`.
6. Não depender só de cor: severidade e visibilidade sempre com rótulo textual/ícone.
7. Respeitar `prefers-reduced-motion` (transições mínimas).
8. A ação de emergência tem rótulo textual e não é apenas um ícone.

## 7. Tema e troca de cor principal

- A cor principal é `--color-primary`; trocar o valor muda os destaques sem alterar componentes.
- Tokens derivados (`--color-primary-strong`, `--color-primary-soft`, `--color-on-primary`) devem ser ajustados junto.
- No futuro, um controle do usuário poderá escrever `--color-primary` (por exemplo, em `:root` ou em um escopo de tema).
- O restante da linguagem visual (tipografia, espaçamento, ícones, rótulos) é neutro e não depende da cor.

## 8. Regras de conteúdo

- Usar somente conteúdo sintético e predefinido.
- Marcar exemplos (alertas, tabela de correção) como demonstração.
- Não apresentar diagnóstico, dose ou instrução clínica como orientação válida.
- Não coletar, persistir ou publicar dados pessoais/de saúde.

## 9. Fora de escopo

- Construir a ficha operacional real ou integrar backend/banco.
- Definir conteúdo clínico validado (depende de responsável clínico na fase operacional).
- Escolher o destino final do número de emergência por região (parametrizável depois).
- Implementar autenticação, persistência ou revogação real.

## 10. Status de implementação (2026-11-18)

- Tokens de cor, tipografia, espaçamento, raio e toque declarados em `:root` de `src/styles.css`.
- Consumidos agora: `--color-primary` (botão primário, link ativo), `--color-primary-strong` (hover/links), `--color-on-primary` (texto sobre cor principal), `--color-public`/`--color-private` (rótulos) e `--touch-target` (botão de texto e opções de observação).
- A escala de tipografia e espaçamento fica declarada para a implementação real; a adoção é incremental e não altera a hierarquia atual.
- Contraste verificado conforme a seção 4.3; build de produção concluído sem erros.
- Pendência humana: inspeção visual em 320/600/860 px e troca de `--color-primary` no navegador.
