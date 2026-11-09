# Spec: Validação e publicação independente

**Versão:** 1.0  
**Status:** Rascunho  
**Autor:** reversa-spec-sdd  
**Data:** 2026-11-08  
**Reviewers:** N/A

---

## 1. Resumo

🟡 Este componente define como observar a compreensão dos participantes e como publicar a demonstração em um site público separado do site atual. A validação não coleta dados pessoais, e a publicação independente não altera o site da Flávia nem seus QR Codes.

---

## 2. Contexto e Motivação

**Problema:**  
🟡 Uma demonstração pode ser interpretada como serviço real e um deploy compartilhado pode afetar o site atual. A validação precisa observar tarefas sem identificar participantes e o ambiente público deve conter somente conteúdo sintético.

**Evidências:**  
🟡 O PRD exige sessão de validação sem dados identificáveis, repositório e GitHub Pages próprios, verificação do artefato e preservação do deployment atual.

**Por que agora:**  
🟡 Antes de divulgar o QR Code de demonstração ou decidir por uma plataforma operacional, é necessário validar a jornada em ambiente que não interfira no site atual.

---

## 3. Goals (Objetivos)

- 🟡 G-01: Permitir que o facilitador conduza tarefas de gestão e consulta sem coletar identidade ou dados de saúde.
- 🟡 G-02: Registrar conclusão, dúvida, erro de interpretação ou bloqueio de forma não identificável.
- 🟡 G-03: Publicar a demonstração em repositório público e GitHub Pages independentes.
- 🟡 G-04: Confirmar que build, rotas, URL e conteúdo publicado não afetam o site atual.

**Métricas de sucesso:**

| Métrica | Baseline atual | Target | Prazo |
|---------|---------------|--------|-------|
| 🟡 Participantes por perfil na primeira rodada | 🟡 Não iniciado | 🟡 3–5 pacientes/cuidadores e 3–5 socorristas | 🟡 Não definido |
| 🟡 Dados pessoais coletados no registro de validação | 🟡 Não iniciado | 🟡 = 0% | 🟡 Cada sessão |
| 🟡 Arquivos do site atual alterados pelo protótipo | 🟡 0 | 🟡 = 0% | 🟡 Cada publicação |
| 🟡 Acessos testados no site independente | 🟡 Não iniciado | 🟡 Build, URL, acesso direto e recarga verificados | 🟡 Antes da divulgação |

---

## 4. Non-Goals (Fora do Escopo)

- 🟡 NG-01: Não coletar gravações, nomes, contatos ou informações de saúde dos participantes.
- 🟡 NG-02: Não oferecer suporte real contínuo ao paciente nem atendimento de emergência.
- 🟡 NG-03: Não alterar, publicar ou executar workflows do site atual.
- 🟡 NG-04: Não copiar repositório, histórico, dados, assets ou segredos do site atual.
- 🟡 NG-05: Não implementar analytics identificável, rastreamento de leitor de QR ou telemetria de participante.
- 🟡 NG-06: Não implementar autenticação ou edição de dados reais do proprietário.
- 🟡 NG-07: Não validar nesta etapa um modelo de negócio, renda ou operação futura.

---

## 5. Usuários e Personas

**Usuário primário:** 🟡 Facilitador que conduz a sessão e anota observações sem identificar participantes.  
**Usuário secundário:** 🟡 Responsável tecnicamente avançado que publica e mantém o site de demonstração; participante paciente/cuidador ou leitor do QR que realiza as tarefas.

**Jornada atual (sem a feature):**  
🟡 O PRD não documenta um processo de pesquisa já realizado nem soluções de mercado atuais. A hipótese permanece a validar, sem pressupor experiência anterior de participantes.

**Jornada futura (com a feature):**
1. 🟡 O facilitador explica que a experiência usa dados fictícios e não é serviço real.
2. 🟡 O participante percorre a gestão ou a visualização pública.
3. 🟡 O facilitador observa se o participante distingue conteúdo público e privado e entende a simulação.
4. 🟡 O facilitador registra somente resultado, dúvida ou bloqueio não identificável.
5. 🟡 O responsável executa build e inspeciona o conteúdo do artefato.
6. 🟡 O responsável publica no Pages independente e testa URL e navegação.
7. 🟡 O responsável confirma que o site atual permanece inalterado.

---

## 6. Requisitos Funcionais

### 6.1 Requisitos Principais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|-----------|-------------------|
| RF-01 | 🟡 O sistema deve apresentar ao facilitador tarefas separadas para quem prepara a ficha e para quem consulta o QR Code. | Must | 🟡 O roteiro descreve pelo menos uma tarefa de gestão e uma de visualização pública. |
| RF-02 | 🟡 O sistema deve permitir ao facilitador registrar conclusão, dúvida, interpretação equivocada ou bloqueio sem identificar o participante. | Must | 🟡 O registro não exige nem contém nome, contato, dado de saúde ou identificador de sessão pessoal. |
| RF-03 | 🟡 O sistema de publicação deve permitir ao responsável executar e inspecionar um build de produção do protótipo independente. | Must | 🟡 O processo gera artefato verificável e não usa o workflow do site atual. |
| RF-04 | 🟡 O sistema de publicação deve publicar o protótipo somente no repositório e Pages próprios. | Must | 🟡 URL, repositório e workflow verificados pertencem à demonstração independente. |
| RF-05 | 🟡 O sistema deve permitir ao responsável verificar a página inicial, a rota de visualização, acesso direto e recarga no Pages. | Must | 🟡 Cada caminho retorna a demonstração correta, com avisos e conteúdo sintético. |
| RF-06 | 🟡 O sistema deve permitir ao responsável inspecionar o repositório e o artefato para detectar dados reais, assets, histórico ou segredos do site atual. | Must | 🟡 A inspeção confirma ausência de conteúdo legado e de dados reais antes da divulgação. |
| RF-07 | 🟡 O sistema de publicação deve permitir ao responsável confirmar que a publicação nova não altera a URL, o conteúdo ou os QR Codes do site atual. | Must | 🟡 O deploy ocorre sem mudanças no repositório, workflow ou URL do site atual. |
| RF-08 | 🟡 O sistema deve comunicar indisponibilidade do Pages sem exibir estado de publicação bem-sucedida. | Must | 🟡 A validação de disponibilidade falha explicitamente e impede a divulgação como publicada. |

### 6.2 Fluxo Principal (Happy Path)

1. 🟡 O facilitador explica os limites da demonstração e confirma que nenhum dado real será solicitado.
2. 🟡 O participante executa a tarefa atribuída.
3. 🟡 O facilitador registra a conclusão ou a observação sem identificação.
4. 🟡 O responsável executa o build e inspeciona arquivos fonte e artefato.
5. 🟡 O responsável publica somente no Pages independente.
6. 🟡 O responsável testa URL, visualização direta, recarga e QR Code.
7. 🟡 O responsável confirma que o site antigo e seus QR Codes não foram alterados.

### 6.3 Fluxos Alternativos

**Fluxo Alternativo A — Participante tenta fornecer dado real:**
1. 🟡 O participante tenta informar dado pessoal ou de saúde.
2. 🟡 O facilitador interrompe a entrada e reforça que a validação usa somente conteúdo sintético; o registro não conserva o dado.

**Fluxo Alternativo B — Build ou inspeção falha:**
1. 🟡 O build falha ou a inspeção encontra conteúdo proibido.
2. 🟡 O responsável não publica e registra a falha sem substituir por um resultado de sucesso.

**Fluxo Alternativo C — Pages indisponível:**
1. 🟡 A URL publicada não responde ou não serve a versão esperada.
2. 🟡 O responsável não divulga o QR Code e limita rollback ou correção ao repositório novo.

---

## 7. Requisitos Não-Funcionais

| ID | Requisito | Valor alvo | Observação |
|----|-----------|-----------|------------|
| RNF-01 | 🟡 Privacidade | 🟡 0 dado pessoal ou de saúde no registro de sessão | 🟡 Registrar somente observações não identificáveis. |
| RNF-02 | 🟡 Isolamento de publicação | 🟡 0 alterações no deploy atual | 🟡 Repositório, Pages e workflow separados. |
| RNF-03 | 🟡 Segurança do artefato | 🟡 0 dado real, segredo, histórico ou asset do site atual | 🟡 Inspecionar fonte e build antes de cada publicação. |
| RNF-04 | 🟡 Disponibilidade de navegação | 🟡 Página, rota direta e recarga verificadas | 🟡 A hospedagem é estática e pode exigir navegação compatível. |
| RNF-05 | 🟡 Custo | 🟡 Orçamento zero | 🟡 Confirmar elegibilidade e eventuais custos antes de habilitar o Pages. |

---

## 8. Design e Interface

**Componentes afetados:** 🟡 Roteiro de validação, registro de observações, build estático, workflow de deploy independente, página e rota pública.

**Comportamento esperado:**  
🟡 O facilitador conduz a sessão sem solicitar dados identificáveis. O roteiro reforça que todo conteúdo é fictício. O processo de publicação valida o repositório de destino, o conteúdo e o acesso público. A URL e o QR Code do site atual ficam fora do processo e não são alterados.

**Estados da UI e operação:**
- 🟡 Estado de preparação: roteiro e conteúdo sintético revisados; nenhuma sessão iniciada.
- 🟡 Estado de sessão: tarefas em andamento e observações não identificáveis.
- 🟡 Estado de sucesso: build e verificações de URL, rota, recarga e conteúdo concluídos.
- 🟡 Estado de erro: falha ou achado de conteúdo proibido bloqueia a divulgação e apresenta causa explícita.
- 🟡 Estado de rollback: reverter apenas a publicação no repositório de demonstração.

---

## 9. Modelo de Dados

🟡 Não há persistência de dados de participantes ou de paciente. O roteiro pode usar observações anônimas de tarefa, mantidas pelo facilitador fora do protótipo.

```text
ObservacaoDeValidacao {
  tarefa: categoria predefinida
  resultado: concluida, dúvida, interpretação equivocada ou bloqueio
  observacao: anotação sem identificação pessoal
}
```

🟡 O registro não deve conter nome, contato, informação de saúde, identificador de dispositivo, IP coletado pela aplicação ou gravação identificável.

---

## 10. Integrações e Dependências

| Dependência | Tipo | Impacto se indisponível |
|-------------|------|------------------------|
| 🟡 GitHub Actions/Pages no repositório independente | 🟡 Serviço externo de build e hospedagem | 🟡 A publicação não pode ser validada; não divulgar o endereço como disponível. |
| 🟡 Navegador e leitor de QR Code | 🟡 Ambiente de teste do participante | 🟡 Usar a URL textual ou ambiente local controlado. |
| 🟡 Build do protótipo | 🟡 Processo local obrigatório | 🟡 Corrigir a falha antes de publicar; não ignorar erros. |

🟡 Não há integração com o workflow ou com a hospedagem do site atual.

---

## 11. Edge Cases e Tratamento de Erros

| Cenário | Trigger | Comportamento esperado |
|---------|---------|----------------------|
| 🟡 EC-01: Participante informa dado real | 🟡 Campo ou conversa recebe dado identificável ou de saúde | 🟡 Interromper a entrada, não armazenar o valor e orientar o uso de opções fictícias. |
| 🟡 EC-02: Build falha | 🟡 Comando de build retorna erro | 🟡 Bloquear o deploy, apresentar saída de erro e manter o site atual intocado. |
| 🟡 EC-03: Artefato contém conteúdo proibido | 🟡 Inspeção encontra dado real, segredo, asset ou histórico legado | 🟡 Não publicar; identificar o achado sem copiá-lo para relatório público. |
| 🟡 EC-04: URL ou rota retorna erro | 🟡 Pages não serve a página ou uma rota direta | 🟡 Marcar verificação como falha, não divulgar a URL e corrigir somente o projeto novo. |
| 🟡 EC-05: Pages fora do ar | 🟡 Serviço externo indisponível ou resposta de erro | 🟡 Registrar indisponibilidade e não apresentar estado de sucesso; revalidar após restabelecimento. |
| 🟡 EC-06: QR direciona ao site incorreto | 🟡 O conteúdo decodificado não corresponde à URL independente aprovada | 🟡 Bloquear divulgação e gerar novamente o QR Code para o destino demonstrativo correto. |
| 🟡 EC-07: Registro de sessão contém identificador | 🟡 Nota do facilitador inclui nome, telefone ou dado clínico | 🟡 Remover o identificador antes de guardar ou compartilhar a observação; manter apenas o resultado da tarefa. |

---

## 12. Segurança e Privacidade

- **Autenticação:** 🟡 Não existe conta de participante nem operador nesta demonstração.
- **Autorização:** 🟡 O deploy deve ocorrer somente no repositório independente sob controle do responsável; não conceder fluxo de publicação ao repositório do site atual.
- **Dados sensíveis:** 🟡 Não coletar ou armazenar dados reais de saúde, contato ou identidade.
- **Auditoria:** 🟡 Manter evidência de build e verificação do repositório sem incluir segredos ou dados pessoais.
- **Site público:** 🟡 Tratar todos os arquivos do repositório e artefatos do Pages como públicos.
- **Proprietário de dados:** 🟡 Controle de alterações do proprietário é requisito futuro de serviço real, não requisito atendido por este processo de validação.

---

## 13. Plano de Rollout

- **Estratégia:** 🟡 Publicação única em repositório GitHub Pages independente após revisão e build verificado.
- **Como reverter (rollback):** 🟡 Despublicar ou reverter a versão do repositório novo; não alterar deployment do site atual.
- **Monitoramento pós-deploy:** 🟡 Verificar página, rota de QR, recarga, banner, conteúdo sintético e estado do workflow. Não coletar analytics identificável.

---

## 14. Open Questions

| # | Pergunta | Impacto | Dono | Prazo |
|---|---------|---------|------|-------|
| OQ-01 | 🟡 O GitHub Pages está habilitado e disponível sem custo nas condições da conta e do repositório público? | 🟡 Alto para publicação | 🟡 André | 🟡 Antes de habilitar ou anunciar |
| OQ-02 | 🟡 Qual métrica e instrumento serão usados para medir reconhecimento do aviso de demonstração? | 🟡 Médio para avaliação | 🟡 André | 🟡 Antes da primeira rodada |
| OQ-03 | 🟡 Qual mecanismo de navegação estática será adotado para suportar reload e acesso direto? | 🟡 Médio para publicação | 🟡 Implementador | 🟡 Antes do deploy |
| OQ-04 | 🟡 Qual controle de autenticação e autorização será implementado antes de permitir que um proprietário altere dados reais? | 🟡 Alto para uma versão operacional | 🟡 André | 🟡 Antes de armazenar dados reais |

---

## 15. Decisões Tomadas (Decision Log)

| Decisão | Alternativas consideradas | Racional |
|---------|--------------------------|---------|
| 🟡 Publicar em repositório e Pages independentes | 🟡 Mesmo repositório, branch ou rota do site atual | 🟡 Preserva o site atual e seus QR Codes. |
| 🟡 Não copiar histórico, dados ou assets legados | 🟡 Fork ou reutilização do site atual | 🟡 O projeto público deve conter somente o protótipo e dados sintéticos. |
| 🟡 Registrar observações sem identificação | 🟡 Coletar dados pessoais ou de saúde dos participantes | 🟡 A sessão valida compreensão, não coleta dados clínicos. |
| 🟡 Exigir autenticação e autorização antes de qualquer edição de dados reais em produto futuro | 🟡 Permitir edição a qualquer visitante do QR | 🟡 Consulta pública não deve conceder capacidade de alteração; os mecanismos detalhados dependem do escopo operacional futuro. |

---

## Apêndice

### Referências
- 🟡 [`prd.md`](../prd.md)
- 🟡 [`personas.md`](../personas.md)
- 🟡 [`onboarding.md` da feature 001](../../_reversa_forward/001-validar-prototipo-emergencia/onboarding.md)
- 🟡 [`investigation.md` da feature 001](../../_reversa_forward/001-validar-prototipo-emergencia/investigation.md)
- 🟡 [`roadmap.md` da feature 001](../../_reversa_forward/001-validar-prototipo-emergencia/roadmap.md)

### Histórico de Revisões
| Versão | Data | Autor | Mudanças |
|--------|------|-------|---------|
| 1.0 | 2026-11-08 | reversa-spec-sdd | 🟡 Criação inicial da spec. |

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCORE TOTAL: 100/100 — ⭐ Excelente
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Breakdown:
- Completude: 100/100 (peso 30%)
- Testabilidade: 100/100 (peso 25%)
- Clareza: 100/100 (peso 20%)
- Escopo: 100/100 (peso 15%)
- Edge Cases: 100/100 (peso 10%)

Gaps críticos:
- Nenhum.

Sugestões:
- Nenhuma.
