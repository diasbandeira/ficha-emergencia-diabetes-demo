# Regression Watch: Layout e design da ficha de emergência para a implementação real

> Identificador da feature: `002-layout-implementacao-real`
> Data: `2026-11-18`
> Cenário: **greenfield** (âncora em `prd.md` + specs SDD)

## Pontos de atenção

| Área | O que observar | Por quê | Como verificar |
|------|----------------|---------|----------------|
| Tema | Contraste do texto sobre `--color-primary` e derivados | RN-07 permite trocar a cor principal; uma cor escura pode derrubar o contraste | Recalcular contraste ao trocar o token; manter ≥ 4,5:1 |
| Navegação | Estado ativo do menu e ponto de rota atual | Passaram a usar `--color-primary` em vez do teal fixo | Abrir `#/` e `#/emergency` e conferir legibilidade |
| Botões/link | Hover do botão primário e cor do link de texto | Troca de `--teal` por `--color-primary-strong` | Passar o mouse e conferir o tom no hover |
| Rótulos | Público/privado | Passaram a usar `--color-public`/`--color-private` | Conferir texto branco sobre os rótulos |
| Toque | Botão de texto e opções de observação | Subiram para 44 px | Medir no DevTools |
| Responsivo | Tabela de correção em 320 px | Rolagem horizontal deve ficar contida na tabela | Testar 320/600/860 px |
| Acessibilidade | Foco visível e `prefers-reduced-motion` | Tokens novos não podem remover estados existentes | Navegar por Tab e ativar redução de movimento |
| Conteúdo | Banner e rodapé de demonstração | Não podem ser cobertos pela CTA fixa | Rolar até o fim em tela pequena |
| Build/Pages | `npm run build` e deploy | Mudanças só em CSS/DESIGN, mas o build é o gate | Rodar `npm run build`; verificar workflow do Pages |

## Cenário de teste focado

1. Build de produção sem erros.
2. Trocar `--color-primary` no DevTools para `#0f766e` e `#7a1f1f`; conferir contraste e legibilidade em todas as seções.
3. Em 320 px, confirmar ausência de rolagem horizontal da página e CTA acessível ao fim.
4. Navegar por teclado e confirmar foco visível em menu, botões e opções.
5. Confirmar que banner e rodapé de demonstração continuam visíveis.

## Fontes

- `_reversa_forward/002-layout-implementacao-real/requirements.md`
- `_reversa_forward/002-layout-implementacao-real/onboarding.md`
- `DESIGN.md`
