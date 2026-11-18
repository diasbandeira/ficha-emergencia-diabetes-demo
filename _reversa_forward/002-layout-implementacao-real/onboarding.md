# Onboarding: layout e design da ficha de emergência

> Identificador: `002-layout-implementacao-real`
> Data: `2026-11-18`

Passo a passo para uma pessoa que vai testar a entrega pela primeira vez. Nenhum dado real é usado; tudo é demonstração.

## 1. Pré-requisitos

- Node.js instalado (mesma versão usada no build).
- Repositório clonado e dependências instaladas.

```powershell
npm install
npm run dev
```

Abra o endereço local exibido no terminal (por padrão `http://localhost:5173/`).

## 2. O que conferir na especificação

1. Abra `DESIGN.md` na raiz.
2. Verifique se a anatomia lista, nesta ordem: identificação, condições de saúde, alerta de hipoglicemia, uso contínuo, insulinas, tabela de correção, aviso e ação de emergência.
3. Confirme que há uma tabela de tokens com `--color-primary` (neutro/azul) e derivados de contraste.
4. Confirme as regras de acessibilidade: texto ≥ 16 px, alerta ≥ 20 px, contraste ≥ 4,5:1 (texto) e ≥ 3:1 (interface), toque ≥ 44×44 px.

## 3. Testar a troca de cor principal (tema)

1. Abra a aplicação no navegador.
2. Abra o DevTools e inspecione `:root`.
3. Altere o valor de `--color-primary` para outra cor (por exemplo, `#0f766e`).
4. Confirme que os elementos de destaque mudam sem quebrar o texto sobre a cor principal.
5. Confirme que os rótulos público/privado e o aviso de demonstração continuam legíveis com texto, não apenas cor.

## 4. Testar legibilidade e responsividade

1. No DevTools, ative o modo responsivo.
2. Teste larguras 320 px, 600 px e 860 px.
3. Confirme que a ordem dos blocos respeita a prioridade: identificação/alerta antes de detalhes.
4. Confirme que a tabela de correção não perde o contexto de faixa/unidades em 320 px.

## 5. Testar a ação de emergência

1. Role até o fim de uma página longa no celular.
2. Confirme que a ação de emergência continua acessível.
3. No protótipo, confirme que a ação é simulada e não inicia ligação.
4. Anote que, na implementação real, o destino é o número de emergência local (192/SAMU), parametrizável.

## 6. Testar acessibilidade

1. Navegue só com teclado (Tab/Shift+Tab) e confirme foco visível.
2. Ative `prefers-reduced-motion` no sistema/DevTools e confirme que animações são reduzidas.
3. Confirme que cada estado tem rótulo textual ou ícone com significado (não só cor).

## 7. Verificar build

```powershell
npm run build
```

O build deve terminar sem erros. Não é necessário reconfigurar GitHub Pages nem tocar no site atual.

## 8. Critérios de aceite da sessão

- [ ] A especificação cobre todas as seções e tokens.
- [ ] A troca de `--color-primary` funciona e mantém contraste.
- [ ] A prioridade visual é respeitada no celular.
- [ ] A ação de emergência é simulada e alcançável.
- [ ] Aviso de demonstração e rótulos público/privado permanecem visíveis.

## 9. Checklist verificável de aceite (design)

Use este checklist no DevTools e no navegador. Cada item corresponde a um requisito.

### Estrutura e hierarquia
- [ ] A ficha mostra identificação, condições, alerta de hipoglicemia, uso contínuo, insulinas, tabela e rodapé (RF-01).
- [ ] No celular, o alerta de hipoglicemia aparece antes dos detalhes (RN-03).
- [ ] A tabela de correção tem cabeçalho de faixa/unidades visível (RF-03).

### Tema e cor
- [ ] `--color-primary` existe em `:root` com valor padrão `#2a6f9e` (RF-10).
- [ ] Trocar `--color-primary` no DevTools altera só os destaques, sem texto ilegível (RF-10, RN-07).
- [ ] Texto sobre `--color-primary` e sobre superfícies derivadas mantém ≥ 4,5:1.
- [ ] Há derivados `--color-primary-strong`, `--color-primary-soft` e `--color-on-primary`.

### Legibilidade e alvos
- [ ] Corpo do texto ≥ 16 px e texto do alerta ≥ 20 px (RF-11).
- [ ] Botões e controles interativos têm alvo ≥ 44×44 px (RF-12).
- [ ] Nenhum estado depende só de cor (rótulo textual em severidade e visibilidade) (RN-06).

### Responsividade
- [ ] Em 320 px não há rolagem horizontal da página (só a tabela rola dentro do contêiner) (RF-02).
- [ ] Em 600 px e 860 px a ordem e a legibilidade se mantêm (RF-02).
- [ ] A CTA de emergência reserva espaço e respeita a área segura inferior (RF-08).

### Ação de emergência e conteúdo
- [ ] A CTA de emergência é fixa, alcançável e rotulada por texto (RF-08).
- [ ] No protótipo, a ação é simulada (sem discagem); o destino real 192/SAMU é documentado (RN-08).
- [ ] Banner "demonstração" e rodapé de aviso continuam visíveis (RF-09).
- [ ] Rótulos público/privado aparecem por bloco (RF-07).
- [ ] Nenhum dado real ou orientação clínica é apresentado (RN-01, RN-02).

## 10. Resultado da verificação (2026-11-18)

- **Build:** `npm run build` (`tsc --noEmit` + `vite build`) concluído sem erros.
- **Contraste:** pares verificados passam AA — `#2a6f9e`/`#ffffff` 5.43:1; `#1f5a80`/`#ffffff` 7.41:1; `#2a6f9e`/`#edf4f3` 4.87:1; `#b42318`/`#ffffff` 6.57:1; `#435d70`/`#edf4f3` 6.20:1.
- **Alvos de toque:** nav 44 px; botões e `select` 46 px; botão de texto 44 px; opções de observação 44 px. O banner (não interativo) tem 42 px.
- **Breakpoints:** regras para <=860 px e <=600 px; `html`/`body` com `min-width: 320px`.
- **Movimento:** bloco `@media (prefers-reduced-motion: reduce)` presente.
- **Pendente de confirmação humana:** inspeção visual em navegador real nos 320/600/860 px e teste de troca de `--color-primary` no DevTools (passos das seções 3 e 4).
