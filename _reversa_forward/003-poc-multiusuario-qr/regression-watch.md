# Regression Watch: POC multiusuário com QR por pessoa

> Identificador da feature: `003-poc-multiusuario-qr`
> Data: `2026-11-19`
> Cenário: **greenfield** (âncora em `prd.md` + specs SDD)

## Pontos de atenção

| Área | O que observar | Por quê | Como verificar |
|------|----------------|---------|----------------|
| RLS | Usuário A não lê nem edita ficha de B | É o núcleo do isolamento multiusuário | Duas contas; abrir DevTools e tentar `select`/`update` direto na API |
| Leitura pública | `get_public_card` devolve só nome, data e blocos públicos | Evita vazamento de blocos privados | Marcar um bloco como privado e abrir `#/p/<token>` |
| Token | Rotacionar invalida o QR anterior; revogar fecha o acesso | Compartilhamento é o risco central | Abrir o endereço antigo após cada ação |
| Consentimento | Salvar sem consentimento falha com mensagem clara | O gatilho protege o uso de dado de saúde | Segundo login, tentar salvar antes do aceite |
| Uma ficha | Duas abas não criam segunda ficha | `unique(account_id)` + upsert | Salvar em duas abas da mesma conta |
| Exclusão | Ficha, blocos, consentimento e link somem; login permanece | Exclusão de identidade exige operador | Excluir na tela e consultar o banco; rodar rotina do onboarding |
| OAuth | Tokens no hash não quebram o roteador | SPA usa hash para rotas | Concluir login Google e conferir destino `#/app` |
| Demo antiga | `#/` e `#/emergency` continuam funcionando | Regressão da entrega anterior | Abrir as duas rotas após login e deslogado |
| Estilos | Novas telas herdam tokens e foco visível | `DESIGN.md` e acessibilidade | Teclado em login/edição/QR; 320/600/860 px |
| Build | `tsc --noEmit` e `vite build` passam | Gate de publicação | `npm run build` |
| Env | Sem `VITE_*`, app orienta configuração em vez de quebrar | Build do Pages pode não ter vars | Build sem env e abrir `#/login` |
| Auditoria | `audit_event` não guarda texto de saúde | Privacidade e rastreabilidade | Inserir/editar ficha e conferir linhas |

## Cenário de teste focado

1. `npm run build` sem erros.
2. Abrir `#/login` sem env: mensagem de backend não configurado; demo em `#/` intacta.
3. Com env: entrar com duas contas distintas; conferir fichas separadas.
4. Salvar sem aceite: erro `consent_required` visível.
5. Aceitar, salvar, gerar QR, abrir em janela anônima: só blocos públicos.
6. Rotacionar e revogar: endereços antigos deixam de abrir a ficha.
7. Excluir uma conta: QR antigo inválido; rotina de identidade documentada.
8. Navegar por teclado e conferir foco, contraste e alvos de toque.

## Fontes

- `_reversa_forward/003-poc-multiusuario-qr/requirements.md`
- `_reversa_forward/003-poc-multiusuario-qr/onboarding.md`
- `_reversa_forward/003-poc-multiusuario-qr/data-delta.md`
- `_reversa_forward/003-poc-multiusuario-qr/interfaces/card-service.md`
- `DESIGN.md`
