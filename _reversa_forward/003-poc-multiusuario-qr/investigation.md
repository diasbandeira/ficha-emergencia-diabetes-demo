# Investigation: POC multiusuário com QR por pessoa

> Identificador: `003-poc-multiusuario-qr`
> Data: `2026-11-18`

## 1. Ponto de partida

- O app é uma SPA React + TypeScript + Vite, publicada como estático no GitHub Pages (`vite.config.ts`, base `/ficha-emergencia-diabetes-demo/`).
- Já existe `qrcode.react@3.1.0` nas dependências, hoje usado na demo.
- Não há backend, banco, contas nem persistência: todo o estado vive em memória (`App.tsx`, `EmergencyDemo.tsx`, `emergencyDemoData.ts`).
- Requisito de custo: **zero** (planos gratuitos), com estudo das opções nesta fase.

## 2. Alternativas de backend (custo zero)

| Critério | Backend gerenciado relacional + auth | Backend gerenciado de documentos + auth | API própria |
|----------|--------------------------------------|------------------------------------------|-------------|
| Esforço inicial | Baixo | Baixo | Alto |
| Isolamento por conta | Regras por linha no banco | Regras por documento | Implementar do zero |
| Leitura pública restrita | Função/view dedicada | Regra de leitura por token | Implementar do zero |
| Login social | Nativo | Nativo | Implementar integração |
| Custo no plano gratuito | Sim | Sim | Precisa de hospedagem/banco gratuitos e manutenção |
| Risco principal | Pausa por inatividade | Cotas diárias de leitura/escrita | Operação e segurança |

### 2.1 Fatos dos planos gratuitos (verificar novamente na implementação)

- **Supabase Free:** 500 MB de banco, 50.000 usuários ativos mensais, 5 GB de egress, 1 GB de armazenamento de arquivos, até 2 projetos ativos; projetos gratuitos são **pausados após uma semana de baixa atividade**. A documentação atual informa restauração pelo painel por até 1 ano após a pausa; versões anteriores citavam 90 dias. Fonte: <https://supabase.com/pricing> e <https://supabase.com/docs/guides/platform/free-project-pausing>.
- **Firebase Spark:** Firestore com 1 GiB armazenado, 50.000 leituras/dia, 20.000 gravações/dia, 20.000 exclusões/dia e 10 GiB/mês de egress; autenticação com 50.000 usuários ativos mensais (3.000 diários com Identity Platform). Fonte: <https://firebase.google.com/pricing> e <https://firebase.google.com/docs/firestore/quotas>.
- **Login social (Google) com escopos básicos:** o limite de 100 usuários de teste e a expiração de 7 dias da autorização valem para apps em "Testing" com escopos sensíveis. A exceção cobre quem pede apenas `openid`, `email` e `profile` (caso do "Sign in with Google"): qualquer usuário pode entrar, sem lista de teste e sem expiração de 7 dias. Fonte: <https://support.google.com/cloud/answer/10311615> e <https://developers.google.com/identity/protocols/oauth2/production-readiness/overview>.
- **GitHub Pages:** site estático em repositório público sem cobrança; minutos de Actions são gratuitos para repositórios públicos, sujeitos a limites de uso justo. Fonte: <https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits>.

> Os números acima são referência de 2026-11-19 e mudam com frequência. O plano trata a escolha como D-01 em aberto; a recomendação inicial é o modelo relacional gerenciado, por facilitar isolamento por conta e leitura pública restrita.

### 2.2 Estimativa de custo de infraestrutura

Premissas da POC: ~50 contas, uma ficha por conta, 7 blocos de texto curto, ~200
leituras públicas por dia e nenhuma imagem armazenada. O código entregue usa o
Supabase como provedor de referência.

| Item | Plano | Custo mensal estimado | Observação |
|------|-------|-----------------------|------------|
| Backend (banco + auth + função de leitura) | Supabase Free | **US$ 0,00** (R$ 0,00) | Sem cartão de crédito. |
| Login social | Google Identity (escopos básicos) | **US$ 0,00** | Sem cobrança; isento de verificação para escopos básicos. |
| Front-end estático | GitHub Pages (repositório público) | **US$ 0,00** | Sem domínio próprio. |
| Build/CI | GitHub Actions (repositório público) | **US$ 0,00** | Minutos gratuitos para repositório público. |
| **Total da POC** | — | **R$ 0,00/mês** | Enquanto as cotas abaixo forem respeitadas. |

Uso estimado contra o limite do Supabase Free:

| Recurso | Limite Free | Uso estimado da POC | Folga |
|---------|-------------|---------------------|-------|
| Banco | 500 MB | < 5 MB (50 fichas de texto curto) | ~99% |
| Usuários ativos mensais | 50.000 | 50 | ~99,9% |
| Egress | 5 GB/mês | < 100 MB/mês | ~98% |
| Projetos ativos | 2 | 1 | 1 projeto livre |
| Requisições de API | ilimitadas | ~6.000 leituras/mês | sem cota |

Custos de contingência, se a POC crescer ou a pausa incomodar:

- **Supabase Pro:** a partir de **US$ 25/mês**; remove a pausa por inatividade.
- **Firebase Blaze:** consumo variável, com cota gratuita diária; exige cartão.
- **Domínio próprio:** opcional, tipicamente US$ 10–15/ano.

### 2.3 Vigência e período de teste

Nenhum dos recursos escolhidos é um teste com prazo fixo. Não há data de
expiração do serviço; o que existe são condições de uso e limites:

| Recurso | É teste com prazo? | O que pode acontecer | Como manter |
|---------|--------------------|----------------------|-------------|
| Supabase Free | Não | Pausa após ~1 semana de baixa atividade; sem perda de dados; restauração pelo painel (documentação atual: até 1 ano) | Algumas requisições de banco por dia ou abrir o painel; ping opcional (D-12) |
| Google OAuth (escopos básicos) | Não | Sem expiração de 7 dias e sem lista de 100 testadores para `openid`/`email`/`profile` | Manter apenas esses escopos |
| GitHub Pages | Não | Sem cobrança; limites de uso justo e de minutos de Actions | Uso normal da POC |
| Firebase Spark (alternativa) | Não | Sem prazo; cotas diárias de leitura/escrita | Monitorar o painel se adotado |

Registro operacional: revisar mensalmente consumo e status do projeto. Se a POC
ficar sem uso por mais de uma semana, reativar o projeto antes de demonstrar.


## 3. Como a leitura pública deve funcionar

1. O dono gera um token aleatório (256 bits) e o guarda na ficha.
2. O QR codifica `https://<origem>/<base>/#/p/<token>`.
3. A rota pública chama uma **função de leitura** que recebe o token e devolve apenas: nome de exibição, blocos marcados como públicos e data da última alteração.
4. A tabela da ficha **não** é legível pelo público; a função é o único caminho.
5. Revogar troca o token; o antigo deixa de resolver (404).

Isso atende RN-03, RN-04, RN-05, RN-06 e RF-04/RF-05 sem expor a tabela nem depender de filtro no cliente.

## 4. Autenticação e sessão

- Login social com escopos básicos; nenhuma permissão extra (sem acesso a contatos, Drive etc.).
- Sessão mantida no cliente; rotas autenticadas redirecionam para o login quando não há sessão.
- O servidor valida a identidade em cada leitura/escrita; a interface não é fonte de autorização.

## 5. Geração do QR

- `qrcode.react` já está instalado; gerar no cliente evita custo e chamada de servidor.
- O QR contém **apenas a URL**. Nenhum dado de saúde é codificado, o que também reduz risco de vazamento por leitura do código.
- Download: renderizar o QR em canvas e exportar PNG; impressão fica a cargo do navegador.

## 6. Exclusão de conta

- O cliente consegue apagar ficha, consentimento e token.
- Apagar a **identidade de login** exige credencial de serviço (não pode ficar no navegador). Na POC, isso pode ser:
  - uma função de servidor no provedor (se o plano gratuito permitir), ou
  - uma rotina administrativa executada pelo operador.
- Recomendação: implementar a função de servidor se o plano gratuito cobrir; senão, documentar a rotina manual.

## 7. Riscos e pontos a validar na implementação

- Pausa por inatividade do plano gratuito (mitigável com ping agendado).
- Cotas diárias de leitura/escrita (Firestore) ou tamanho/egress (Supabase).
- Aviso de app em teste no login social.
- Falta de limites de abuso, decidida para a POC.
- Dados reais de saúde e ausência de restrição etária: exigem consentimento versionado e revisão jurídica antes de ampliar.
- Concorrência: garantir unicidade por conta e atualização com carimbo de tempo.

## 8. Critérios de escolha do provedor (para fechar D-01)

1. Cabe no plano gratuito para ~50 contas e ~200 leituras públicas/dia.
2. Permite isolar dados por conta sem escrever servidor.
3. Permite uma função de leitura pública restrita ao token.
4. Suporta login social com escopos básicos.
5. Não exige cartão de crédito.
6. Tem exportação/saída simples (evitar aprisionamento).

## 9. Fontes

- `package.json`, `vite.config.ts`, `src/App.tsx`, `src/navigation/hashRoute.ts`
- `_reversa_sdd/prd.md`, `_reversa_sdd/sdd/*.md`, `_reversa_sdd/addenda/*.md`
- `DESIGN.md`
- <https://supabase.com/pricing>
- <https://supabase.com/docs/guides/platform/free-project-pausing>
- <https://firebase.google.com/pricing>
- <https://firebase.google.com/docs/firestore/quotas>
- <https://support.google.com/cloud/answer/10311615>
- <https://developers.google.com/identity/protocols/oauth2/production-readiness/overview>
- <https://developers.google.com/identity/protocols/oauth2>
- <https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits>
