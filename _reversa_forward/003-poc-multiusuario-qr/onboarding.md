# Onboarding: POC multiusuário com QR por pessoa

> Identificador: `003-poc-multiusuario-qr`
> Data: `2026-11-18`

Roteiro para uma pessoa testar a POC pela primeira vez. Use **contas de teste** enquanto a revisão jurídica não estiver concluída.

## 1. Pré-requisitos

- Node.js instalado (mesma versão usada no build).
- Repositório clonado e dependências instaladas.
- Um ambiente de backend gratuito criado (a escolha é a decisão D-01 do plano).
- Cliente de login social configurado para as origens locais e do Pages.

```powershell
npm install
```

## 2. Configurar variáveis públicas

Crie um arquivo `.env.local` na raiz com as variáveis públicas do ambiente escolhido (nomes ilustrativos):

```
VITE_BACKEND_URL=...
VITE_BACKEND_ANON_KEY=...
```

Regras:
- A chave pública pode ir no cliente; o segredo de serviço **nunca** vai.
- Não faça commit de `.env.local`.

## 3. Subir a aplicação

```powershell
npm run dev
```

Abra o endereço exibido (por padrão `http://localhost:5173/`).

## 4. Roteiro de teste

### 4.1 Demo preservada
- [ ] A rota antiga `#/` abre a gestão demonstrativa.
- [ ] A rota `#/emergency` abre a visualização demonstrativa.

### 4.2 Conta e consentimento
- [ ] Em `#/login`, entrar com a conta de teste.
- [ ] O sistema pede aceite do termo antes de salvar dados de saúde.
- [ ] Tentar salvar sem aceitar: o salvamento é bloqueado com mensagem clara.
- [ ] Aceitar o termo e salvar: a ficha é gravada.

### 4.3 Uma ficha por conta
- [ ] A conta vê a própria ficha em `#/app`.
- [ ] Tentar criar uma segunda ficha: o sistema impede.

### 4.4 QR e página pública
- [ ] Marcar alguns blocos como públicos e outros como privados.
- [ ] Em `#/app/qr`, gerar o QR e baixar a imagem.
- [ ] Abrir uma janela anônima e ler o QR: abre `#/p/<token>` sem login.
- [ ] A página mostra só os blocos públicos, o nome de exibição escolhido e o aviso de POC.
- [ ] Nenhum bloco privado aparece.

### 4.5 Revogação
- [ ] Em `#/app/qr`, revogar o link.
- [ ] Abrir o endereço antigo: não exibe mais a ficha.
- [ ] Gerar um novo QR: abre a página atualizada.

### 4.6 Isolamento entre contas
- [ ] Entrar com uma segunda conta de teste.
- [ ] Confirmar que ela vê apenas a própria ficha.
- [ ] Tentar abrir a URL pública da primeira conta: funciona (é pública), mas não há acesso à edição.
- [ ] Tentar abrir a rota autenticada da primeira conta: o sistema nega.

### 4.7 Concorrência
- [ ] Abrir a mesma conta em duas abas e salvar em ambas.
- [ ] Confirmar que não surge uma segunda ficha e que a última gravação é a exibida.

### 4.8 Exclusão
- [ ] Excluir a conta de teste.
- [ ] Confirmar que a conta não acessa mais.
- [ ] Confirmar que o QR antigo não abre a ficha.
- [ ] Confirmar que os dados saíram do banco (consulta do operador).

## 5. Acessibilidade

- [ ] Navegar login, edição e geração do QR só com teclado, com foco visível.
- [ ] Conferir contraste e alvos de toque conforme `DESIGN.md`.
- [ ] Ativar redução de movimento e confirmar que não há animação essencial.

## 6. Build e publicação

```powershell
npm run build
```

- [ ] Build termina sem erros.
- [ ] O deploy no Pages conclui e as rotas novas funcionam sob a base `/ficha-emergencia-diabetes-demo/`.

## 7. Aplicar as migrações (operador)

Com o projeto gratuito criado (T003), rode os arquivos na ordem pelo SQL Editor
ou pela CLI do provedor:

1. `supabase/migrations/0001_init.sql` — tabelas, unicidade, índices e gatilhos.
2. `supabase/migrations/0002_rls.sql` — RLS default deny, grants e
   `get_public_card(p_token)`.

O consentimento é validado por gatilho: sem registro ativo em `consent`, o
salvamento da ficha falha com `consent_required`.

## 8. Rotina de exclusão da identidade de login

A exclusão pela tela remove `account`, `consent`, `emergency_card`, `card_block`
e invalida o QR. A linha correspondente em `auth.users` permanece, porque um
cliente com chave anônima não pode apagar identidade.

Rotina do operador, após um pedido de exclusão:

1. Confirmar que a ficha não existe mais (`select` em `emergency_card`).
2. Remover a identidade em Authentication → Users no painel do provedor, ou pela
   Admin API com a chave de serviço, em ambiente controlado.
3. Registrar data e responsável no controle da POC.

Enquanto a rotina não for executada, o login continua válido, mas sem ficha.

## 9. Custo, cotas e vigência (checagem mensal)

- [ ] Confirmar que o projeto Supabase segue no plano Free e ativo.
- [ ] Conferir consumo de banco, egress e usuários ativos no painel.
- [ ] Confirmar que o OAuth pede apenas `openid`, `email` e `profile`.
- [ ] Se a POC ficou mais de uma semana sem uso, reativar o projeto antes de demonstrar.
- [ ] Registrar a data da checagem e quem verificou.

Referência rápida:

| Item | Situação | Custo |
|------|----------|-------|
| Supabase Free | Pausa após ~1 semana de baixa atividade; restaurável pelo painel | R$ 0,00 |
| Google OAuth básico | Sem prazo e sem expiração de 7 dias para escopos básicos | R$ 0,00 |
| GitHub Pages/Actions | Sem prazo; limites de uso justo em repo público | R$ 0,00 |

Não existe período de teste com data de expiração. Se o plano gratuito deixar de
atender, o próximo degrau é o Supabase Pro (a partir de US$ 25/mês). Detalhes em
`investigation.md`, seções 2.2 e 2.3, e em `roadmap.md`, seção 10.

## 10. Resultado da verificação (2026-11-19)

- Migrações escritas: `0001_init.sql` e `0002_rls.sql` (não aplicadas: dependem
  de T003).
- Código entregue: cliente, sessão, serviço, login, consentimento, edição, QR,
  página pública, rotas e estilos.
- `npm run build` (`tsc --noEmit && vite build`): **passou**.
- Encode por hash verificado em navegador headless sem backend configurado:
  `#/` abre a gestão; `#/login`, `#/app` e `#/app/qr` mostram o aviso de backend
  não configurado; `#/p/<token>` mostra ficha indisponível. Nenhum erro de
  execução capturado.
- Acessibilidade revisada no código: foco visível em campos, selects e botões;
  alvos de toque de 44 px; rótulos associados; `aria-live` em carregamento e
  feedback.
- Pendências humanas: T003 (criar projeto e OAuth), variáveis `VITE_*` nos
  `vars` do repositório (T016 no GitHub), T019 (teste com duas contas reais) e a
  inspeção visual em 320/600/860 px.

## 11. Critérios de aceite da sessão

- [ ] Duas contas não se enxergam na edição.
- [ ] QR de cada conta abre somente a própria página pública.
- [ ] Revogar invalida o link antigo.
- [ ] Consentimento é obrigatório.
- [ ] Exclusão remove ficha e link.
- [ ] Demo antiga continua funcionando.
- [ ] Aviso de POC visível na gestão e na página pública.
