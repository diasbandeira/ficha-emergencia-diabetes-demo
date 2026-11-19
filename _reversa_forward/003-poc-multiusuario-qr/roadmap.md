# Roadmap: POC multiusuário com QR por pessoa

> Identificador: `003-poc-multiusuario-qr`
> Data: `2026-11-18`
> Requirements: `_reversa_forward/003-poc-multiusuario-qr/requirements.md`
> Confidência: 🟢 CONFIRMADO, 🟡 INFERIDO, 🔴 LACUNA

## 1. Resumo da abordagem

Manter o site estático no GitHub Pages e adicionar um backend gerenciado de custo zero para contas, dados e leitura pública. A área autenticada (login social) edita **uma ficha por conta** e gera o QR localmente com a biblioteca já presente (`qrcode.react`). A página pública fica numa rota de hash com **token opaco** (`#/p/<token>`) e lê os dados por uma função de leitura que devolve **apenas blocos públicos**, sem exigir login. O isolamento entre contas é garantido por regras de acesso no banco, não pela interface. Revogar gira o token e invalida o QR antigo; excluir remove ficha, consentimento e link. A demo atual continua intacta como rota separada.

## 2. Princípios aplicados

Nenhum arquivo `.reversa/principles.md` existe no projeto; não há princípios formais a verificar.

| Princípio | Como a feature se relaciona | Status |
|-----------|------------------------------|--------|
| n/a | Sem princípios registrados | n/a |

## 3. Decisões técnicas

| ID | Decisão | Justificativa | Alternativas descartadas | Confidência |
|----|---------|----------------|--------------------------|-------------|
| D-01 | Usar backend gerenciado em plano gratuito, com recomendação inicial de banco relacional + autenticação + regras por linha. | Atende custo zero e reduz código de servidor; a investigação compara os planos gratuitos. | API própria (custo/manutenção), backend só local (não é multiusuário). | 🟡 |
| D-02 | Login social com escopos básicos de identidade (nome, e-mail e perfil). | Evita verificação de escopos sensíveis e o limite de usuários de teste do provedor. | Escopos sensíveis, login por senha. | 🟢 |
| D-03 | Uma ficha por conta garantida por restrição de unicidade no banco. | Impede duplicidade mesmo com cliques repetidos ou abas concorrentes. | Validação só na interface. | 🟢 |
| D-04 | Página pública acessada por token aleatório de 256 bits, servida por função de leitura que só devolve blocos públicos. | Evita expor a tabela e evita URLs previsíveis; separa leitura pública de escrita. | ID sequencial, e-mail na URL, acesso direto à tabela. | 🟢 |
| D-05 | Gerar o QR no navegador com `qrcode.react`, codificando a URL pública. | Biblioteca já instalada, custo zero e nenhum dado de saúde no QR. | Serviço externo de QR, geração no servidor. | 🟢 |
| D-06 | Exigir registro de consentimento antes da primeira gravação de dados de saúde, validado no banco além da interface. | RN-01/RN-09 e LGPD; evita gravação por chamada direta à API. | Aviso apenas visual. | 🟢 |
| D-07 | Revogação = rotação do token público; o token anterior deixa de resolver. | RN-06 e RF-06; simples e irreversível para o link antigo. | Excluir a ficha, marcar flag sem trocar o token. | 🟢 |
| D-08 | Exclusão remove ficha, consentimento e token; a remoção da identidade de login é feita por rotina administrativa ou função de servidor. | O cliente não pode apagar a própria identidade no provedor com a chave pública. | Exclusão apenas lógica. | 🟡 |
| D-09 | Manter a demo atual em rota própria e adicionar as rotas novas ao roteador por hash. | Preserva a feature 001 e permite comparar demo x POC. | Substituir a demo. | 🟢 |
| D-10 | Configuração por variáveis de ambiente públicas (`VITE_*`) para o cliente e segredo de serviço apenas em rotinas server-side. | Chave pública é projetada para o navegador; o segredo nunca vai ao cliente. | Embutir chaves no código. | 🟢 |
| D-11 | Negar por padrão no banco; conceder leitura/escrita apenas ao dono e leitura pública apenas pela função de token. | RN-07/RF-08; autorização no servidor, não na interface. | Confiar no filtro do cliente. | 🟢 |
| D-12 | Mitigar a pausa de projetos gratuitos por inatividade com um ping agendado opcional enquanto a POC estiver em uso. | Mantém a página pública disponível na demonstração. | Aceitar a pausa e reativar manualmente. | 🟡 |

## 4. Premissas

Nenhuma. Não há marcadores de dúvida em aberto no `requirements.md`. A escolha do provedor gratuito é a decisão D-01, que será fechada na investigação.

| Premissa | Origem (`requirements.md` seção) | Risco se errada |
|----------|----------------------------------|-----------------|
| n/a | n/a | n/a |

## 5. Delta arquitetural

| Componente | Arquivo de origem no legado | Tipo de mudança | Resumo |
|------------|------------------------------|-----------------|--------|
| `Aplicação (shell)` | `_reversa_sdd/addenda/001-validar-prototipo-emergencia.md` | contrato-alterado | `App.tsx` passa a carregar sessão e a montar rotas autenticadas e públicas. |
| `Roteamento por hash` | `_reversa_sdd/sdd/visualizacao-emergencial-e-qr-code.md#8. Design e Interface` | contrato-alterado | `hashRoute.ts` ganha `#/login`, `#/app`, `#/app/qr` e `#/p/<token>`, mantendo `#/` e `#/emergency`. |
| `Gestão demonstrativa da ficha` | `_reversa_sdd/sdd/gestao-demonstrativa-da-ficha.md` | regra-alterada | A edição deixa de ser simulada e passa a gravar na conta autenticada. |
| `Visualização emergencial e QR Code` | `_reversa_sdd/sdd/visualizacao-emergencial-e-qr-code.md` | regra-alterada | A visualização passa a renderizar a ficha pública do token, além da demo. |
| `Serviço de ficha` | — (greenfield) | componente-novo | Camada de acesso a dados: conta, consentimento, ficha, token e leitura pública. |
| `Autenticação` | — (greenfield) | componente-novo | Sessão com login social e proteção das rotas autenticadas. |
| `Página pública` | — (greenfield) | componente-novo | Rota anônima que lê apenas blocos públicos pelo token. |
| `Esquema e regras do banco` | — (greenfield) | componente-novo | Tabelas, unicidade, índices e regras de acesso por linha. |

## 6. Delta no modelo de dados

- Resumo: novas tabelas para conta/perfil, consentimento, ficha (uma por conta), token público e evento de auditoria; a ficha guarda blocos e visibilidade. Nenhum dado do protótipo é migrado; a demo permanece como seed local.
- Detalhe completo em: `_reversa_forward/003-poc-multiusuario-qr/data-delta.md`

## 7. Delta de contratos externos

| Contrato | Tipo | Arquivo de detalhe |
|----------|------|--------------------|
| Serviço de ficha (operações da conta e leitura pública) | HTTP (funções do backend gerenciado) | `_reversa_forward/003-poc-multiusuario-qr/interfaces/card-service.md` |
| Login social | Redirecionamento OAuth do provedor | `_reversa_forward/003-poc-multiusuario-qr/interfaces/card-service.md#login-social` |

## 8. Plano de migração

1. Escolher o provedor gratuito na investigação e criar o projeto/ambiente.
2. Criar o esquema, índices, restrição de unicidade e regras de acesso por linha.
3. Criar a função de leitura pública por token e a rotina de exclusão de identidade.
4. Configurar o cliente de login social com escopos básicos e as origens permitidas (localhost e Pages).
5. Configurar as variáveis públicas no build do Pages e no ambiente local.
6. Publicar o esquema em ambiente de teste e rodar o roteiro de `onboarding.md` com duas contas.
7. Manter a demo atual acessível; publicar a POC na mesma origem, em rotas novas.

## 9. Riscos e mitigações

| Risco | Impacto | Probabilidade | Mitigação |
|-------|---------|---------------|-----------|
| Plano gratuito pausar por inatividade | alto | médio | Ping agendado opcional (D-12); reativar antes de demonstrações; dados permanecem e a restauração é pelo painel. |
| Dados reais sem restrição de idade e sem limites | alto | médio | Consentimento versionado, exclusão, aviso de POC e aceite explícito do risco; revisão jurídica antes de ampliar. |
| Provedor social exibir aviso de app em teste | baixo | alto | Usar só escopos básicos; documentar o aviso no roteiro. |
| Vazamento do link público (QR compartilhado) | médio | médio | Token opaco, revogação por rotação e orientação ao dono. |
| Abuso por falta de limites | médio | médio | Monitorar consumo do plano gratuito; limites entram na fase seguinte. |
| Exclusão da identidade de login depender de rotina | médio | médio | Documentar o fluxo e executar a rotina na POC; evoluir para automação. |
| Estouro de cota (banco/egress/leituras) | médio | baixo | Dados mínimos, sem imagens, leitura pública enxuta; acompanhar o painel do provedor. |
| Concorrência entre abas | baixo | médio | Unicidade por conta e atualização com versão/horário. |

## 10. Custo e vigência da infraestrutura

| Item | Plano | Custo mensal | Vigência |
|------|-------|--------------|----------|
| Banco + auth + leitura pública | Supabase Free | **R$ 0,00** | Sem prazo; pausa após ~1 semana de baixa atividade, restaurável pelo painel |
| Login social | Google Identity (escopos básicos) | **R$ 0,00** | Sem prazo e sem expiração de 7 dias para `openid`/`email`/`profile` |
| Front-end e build | GitHub Pages + Actions (repo público) | **R$ 0,00** | Sem prazo; limites de uso justo |
| **Total** | — | **R$ 0,00/mês** | Enquanto as cotas gratuitas forem respeitadas |

- Uso estimado: < 5 MB de banco, ~50 usuários ativos e < 100 MB de egress/mês,
  dentro do Free (500 MB, 50.000 MAU e 5 GB).
- Se a pausa por inatividade ou o limite apertar: Supabase Pro a partir de
  **US$ 25/mês**. Firebase Blaze é alternativa por consumo, com cartão.
- Não há período de teste com data de expiração. O risco é operacional (pausa),
  não prazo contratual. Revisar consumo e status mensalmente; reativar antes de
  demonstrar após uma semana parada.
- Detalhes e fontes: `investigation.md`, seção 2.2 e 2.3.

## 11. Critério de pronto

- [ ] Todas as ações do `actions.md` marcadas `[X]`
- [ ] `cross-check.md` (se executado) sem CRITICAL nem HIGH
- [ ] `regression-watch.md` gerado
- [ ] Duas contas distintas criam fichas e não enxergam uma à outra
- [ ] QR de cada conta abre somente a página pública correspondente, em navegador anônimo
- [ ] Revogar invalida o link antigo e o novo QR funciona
- [ ] Salvar sem consentimento é bloqueado
- [ ] Excluir a conta remove ficha e link, e o QR antigo deixa de abrir
- [ ] Demo atual continua funcionando nas rotas antigas
- [ ] `npm run build` verde e deploy no Pages concluído
- [ ] Re-extração reversa executada e sem regressão vermelha (recomendado, não obrigatório)

## 12. Histórico de alterações

| Data | Alteração | Autor |
|------|-----------|-------|
| 2026-11-18 | Versão inicial gerada por `/reversa-plan` | reversa |
| 2026-11-19 | Registro de custo, cotas e vigência da infraestrutura | reversa |
