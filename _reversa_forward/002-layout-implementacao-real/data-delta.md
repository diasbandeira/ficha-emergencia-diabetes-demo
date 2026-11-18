# Data Delta: Layout e design da ficha de emergência

> Identificador: `002-layout-implementacao-real`
> Data: `2026-11-18`

## 1. Modelo de runtime

| Aspecto | Delta |
|---------|-------|
| Entidades de domínio | Nenhuma mudança |
| Campos novos | Nenhum |
| Campos removidos | Nenhum |
| Persistência | Nenhuma mudança (continua sem backend/banco) |
| Migração de dados | n/a |
| Índices/consultas | n/a |

O protótipo continua usando dados sintéticos estáticos e estado em memória. Esta feature não cria nem altera dados de paciente.

## 2. Delta conceitual: tokens de design

Os únicos "dados" novos são tokens de design, documentados na especificação e aplicados como custom properties em `src/styles.css`. Não são dados persistidos.

### 2.1 Cor e superfícies

| Token | Valor padrão | Finalidade |
|-------|--------------|------------|
| `--color-primary` | `#2a6f9e` (neutro/azul) | Cor principal mutável pelo usuário no futuro |
| `--color-primary-strong` | `#1f5a80` | Estados hover/active da cor principal |
| `--color-primary-soft` | `#e6eef4` | Fundos suaves derivados da principal |
| `--color-on-primary` | `#ffffff` | Texto sobre a cor principal |
| `--color-text` | `#142f43` | Texto principal |
| `--color-text-muted` | `#435d70` | Texto secundário |
| `--color-surface` | `#ffffff` | Superfície de conteúdo |
| `--color-surface-alt` | `#edf4f3` | Fundo da página |
| `--color-border` | `#c9d8dd` | Bordas e divisores |
| `--color-public` | `#086c62` | Rótulo público (com texto, não só cor) |
| `--color-private` | `#325c76` | Rótulo privado (com texto, não só cor) |
| `--color-alert-bg` | `#fff3ec` | Fundo do alerta de hipoglicemia |
| `--color-alert-border` | `#c98267` | Borda do alerta |
| `--color-alert-text` | `#542718` | Texto do alerta |
| `--color-emergency` | `#b42318` | Ação de emergência (sempre com rótulo textual) |

### 2.2 Tipografia, espaçamento e alvos

| Token | Valor padrão | Finalidade |
|-------|--------------|------------|
| `--font-size-base` | `16px` | Corpo mínimo |
| `--font-size-alert` | `20px` | Texto do alerta |
| `--font-size-h1` | `28px` | Título da ficha |
| `--font-size-h2` | `20px` | Títulos de seção |
| `--space-1..6` | `4/8/12/16/24/32px` | Escala de espaçamento |
| `--radius-sm` / `--radius-md` | `4px` / `8px` | Raios de borda |
| `--touch-target` | `44px` | Alvo mínimo de toque |

## 3. Observações

- A troca de `--color-primary` deve recalcular contraste; tokens de texto sobre a principal usam `--color-on-primary` e devem ser verificados.
- Nenhum token carrega dado pessoal ou clínico.
- A especificação completa da anatomia e dos componentes fica em `DESIGN.md` (entregue na fase de coding).
