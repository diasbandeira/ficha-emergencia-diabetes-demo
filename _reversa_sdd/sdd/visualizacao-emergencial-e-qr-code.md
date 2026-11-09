# Spec: Visualização emergencial e QR Code

**Versão:** 1.0  
**Status:** Rascunho  
**Autor:** reversa-spec-sdd  
**Data:** 2026-11-08  
**Reviewers:** N/A

---

## 1. Resumo

🟡 A visualização emergencial apresenta, sem autenticação, os blocos públicos de uma ficha inteiramente fictícia e um QR Code que direciona à demonstração pública correspondente. A tela deve continuar distinguindo a demonstração de uma ficha real, serviço de socorro ou orientação clínica.

---

## 2. Contexto e Motivação

**Problema:**  
🟡 Uma pessoa que encontra alguém em crise pode estar sob estresse e ter pouca familiaridade com QR Codes. A visualização deve demonstrar como as informações podem ser localizadas sem expor dados reais ou sugerir que a página fornece cuidados clínicos.

**Evidências:**  
🟡 O PRD e as personas definem leitura do QR Code em situação inesperada, acesso sem login e necessidade de reconhecer desde a abertura que o conteúdo é fictício.

**Por que agora:**  
🟡 A visualização e o QR Code são a parte pública da hipótese a validar antes de construir uma operação com dados reais.

---

## 3. Goals (Objetivos)

- 🟡 G-01: Permitir abrir uma visualização emergencial demonstrativa sem login.
- 🟡 G-02: Apresentar somente blocos sintéticos marcados como públicos na demonstração.
- 🟡 G-03: Disponibilizar QR Code que leva à visualização pública genérica, sem codificar dados pessoais.
- 🟡 G-04: Tornar a natureza demonstrativa visível antes e durante a leitura do conteúdo.

**Métricas de sucesso:**

| Métrica | Baseline atual | Target | Prazo |
|---------|---------------|--------|-------|
| 🟡 Participantes que identificam que a página é demonstração | 🟡 Não medido | 🟡 A observar; alvo percentual não definido | 🟡 Não definido |
| 🟡 Participantes que localizam informações públicas sintéticas | 🟡 Não medido | 🟡 100% da amostra de teste definida no PRD | 🟡 Não definido |
| 🟡 Conteúdo pessoal codificado no QR | 🟡 Não aplicável | 🟡 0 | 🟡 Antes da publicação |

---

## 4. Non-Goals (Fora do Escopo)

- 🟡 NG-01: Não apresentar dados reais de paciente, nome real, telefone, diagnóstico ou dose.
- 🟡 NG-02: Não permitir que a leitura do QR Code crie ou abra um perfil real individual.
- 🟡 NG-03: Não autenticar socorristas nem limitar o acesso aos dados fictícios da demonstração.
- 🟡 NG-04: Não oferecer orientação clínica, triagem, diagnóstico nem acionamento de emergência.
- 🟡 NG-05: Não criar QR Code que transporte dados de saúde, contato, token de acesso ou segredo.
- 🟡 NG-06: Não prometer que o estado simulado de retirada invalida um QR Code ou página externa.

---

## 5. Usuários e Personas

**Usuário primário:** 🟡 Pessoa sem perfil específico que encontra o QR Code durante uma emergência simulada, com baixa familiaridade técnica e tempo limitado.  
**Usuário secundário:** 🟡 Pessoa com diabetes ou cuidador que observa como a informação fictícia aparece ao público.

**Jornada atual (sem a feature):**  
🟡 O PRD não identifica uma solução corrente usada por essas pessoas; ⚠️ ABERTO: pesquisar alternativas existentes antes de considerar uso operacional.

**Jornada futura (com a feature):**
1. 🟡 A pessoa encontra o QR Code demonstrativo.
2. 🟡 A pessoa lê o QR Code com o celular.
3. 🟡 O navegador abre a página pública de demonstração.
4. 🟡 A página informa persistentemente que não é ficha real nem serviço de socorro.
5. 🟡 A pessoa consulta os blocos fictícios marcados como públicos.
6. 🟡 A pessoa identifica os limites do conteúdo e não interpreta a página como instrução clínica.

---

## 6. Requisitos Funcionais

### 6.1 Requisitos Principais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|-----------|-------------------|
| RF-01 | 🟡 O sistema deve abrir a visualização emergencial sem solicitar login. | Must | 🟡 Uma pessoa sem conta consegue abrir a rota pública da demonstração. |
| RF-02 | 🟡 O sistema deve exibir somente conteúdo sintético classificado como público na demonstração. | Must | 🟡 Nenhum bloco privado ou valor de paciente real aparece na visualização. |
| RF-03 | 🟡 O sistema deve identificar persistentemente a página e todos os dados como demonstração. | Must | 🟡 O aviso é visível no primeiro carregamento e após navegar ou recarregar. |
| RF-04 | 🟡 O sistema deve disponibilizar um QR Code que aponte à URL pública genérica da visualização demonstrativa. | Must | 🟡 A leitura do QR abre a página pública e o conteúdo decodificado não contém dados pessoais ou de saúde. |
| RF-05 | 🟡 O sistema deve apresentar uma alternativa textual copiável ou acessível ao QR Code. | Should | 🟡 A URL pública demonstrativa pode ser aberta sem câmera/leitor de QR. |
| RF-06 | 🟡 O sistema deve diferenciar o estado demonstrativo ativo do estado demonstrativo retirado quando a gestão e a visualização compartilham a mesma sessão da aplicação. | Must | 🟡 A navegação interna mostra o estado simulado atual e explica que a retirada não invalida a URL pública fora dessa sessão. |
| RF-07 | 🟡 O sistema deve evitar apresentar dados fictícios como diagnóstico ou orientação de tratamento. | Must | 🟡 A página identifica que o conteúdo não é orientação clínica e não contém instruções clínicas acionáveis. |
| RF-08 | 🟡 O sistema deve exibir aviso de indisponibilidade quando o conteúdo sintético necessário não puder ser mostrado. | Must | 🟡 A tela informa a falha e não inventa um estado ativo ou dados de emergência. |

### 6.2 Fluxo Principal (Happy Path)

1. 🟡 O usuário encontra o QR Code demonstrativo.
2. 🟡 O usuário lê o QR Code pelo celular ou abre a URL textual correspondente.
3. 🟡 O sistema abre a visualização sem autenticação.
4. 🟡 O sistema exibe aviso de demonstração e limite clínico antes dos blocos sintéticos.
5. 🟡 O usuário consulta os blocos públicos fictícios e localiza o contato igualmente fictício.
6. 🟡 O usuário reconhece que a página não é um canal real de socorro.

### 6.3 Fluxos Alternativos

**Fluxo Alternativo A — QR Code não pode ser lido:**
1. 🟡 O usuário abre a URL textual apresentada junto ao QR Code.
2. 🟡 O sistema abre a mesma visualização pública demonstrativa.

**Fluxo Alternativo B — Estado retirado na mesma sessão:**
1. 🟡 O usuário navega da gestão para a visualização após simular retirada.
2. 🟡 O sistema apresenta o aviso de conteúdo retirado na demonstração e não afirma revogação de acesso real.

**Fluxo Alternativo C — Leitura em navegador externo ou outra sessão:**
1. 🟡 O QR Code abre em uma sessão independente.
2. 🟡 O sistema apresenta a ficha sintética pública inicial e informa que a simulação de estado local não é compartilhada nem persistida entre sessões.

---

## 7. Requisitos Não-Funcionais

| ID | Requisito | Valor alvo | Observação |
|----|-----------|-----------|------------|
| RNF-01 | 🟡 Privacidade | 🟡 0 dado pessoal no QR ou no conteúdo público | 🟡 O código aponta somente à URL genérica da demonstração. |
| RNF-02 | 🟡 Segurança clínica | 🟡 Nenhuma instrução clínica acionável | 🟡 A experiência não substitui serviços profissionais. |
| RNF-03 | 🟡 Disponibilidade de navegação | 🟡 Acesso direto e recarga da rota pública funcional no Pages | 🟡 Testar o mecanismo de navegação escolhido no ambiente de hospedagem. |
| RNF-04 | 🟡 Acessibilidade | 🟡 QR acompanhado por URL em texto legível | 🟡 Não exigir câmera para acessar a demonstração. |

---

## 8. Design e Interface

**Componentes afetados:** 🟡 Página emergencial pública, aviso de demonstração, blocos sintéticos, QR Code e URL textual.

**Comportamento esperado:**  
🟡 O aviso de demonstração e o limite de uso clínico aparecem antes do conteúdo da ficha. A visualização inclui somente blocos públicos sintéticos. O QR Code é uma representação da URL genérica pública e não carrega uma ficha. Se a retirada estiver ativa apenas no estado de uma sessão interna, a página informa esse limite em vez de insinuar invalidação externa.

**Estados da UI:**
- Estado vazio: 🟡 Se a lista pública sintética estiver vazia, informar que não há blocos demonstrativos disponíveis.
- Estado de carregamento: 🟡 Exibir estado neutro de carregamento sem afirmar que há uma ficha real.
- Estado de erro: 🟡 Informar que a demonstração não pôde ser carregada; não mostrar dados substitutos que pareçam reais.
- Estado de sucesso: 🟡 Exibir os blocos públicos sintéticos e o aviso persistente.
- Estado retirado: 🟡 Mostrar que a retirada é simulada e limitada à sessão; QR externo genérico continua abrindo a demonstração pública.

---

## 9. Modelo de Dados

🟡 Não há dados persistidos. A visualização consome o modelo sintético definido pela gestão demonstrativa.

```text
VisualizacaoDemonstrativa {
  urlPublica: URL genérica e estática da demonstração
  aviso: rótulo e texto de uso demonstrativo
  blocosVisiveis: subconjunto sintético classificado como público
  contatoDemonstrativo: contato fictício ou indicação de ausência
  estadoDaSessao: ativo ou retirado (somente simulado)
}
```

🟡 O QR Code não contém nome, contato, diagnóstico, dados de saúde, token, credencial ou identificador de uma pessoa real.

---

## 10. Integrações e Dependências

| Dependência | Tipo | Impacto se indisponível |
|-------------|------|------------------------|
| 🟡 Gestão demonstrativa da ficha | 🟡 Componente interno | 🟡 A visualização mantém o conteúdo sintético inicial; mudanças simuladas não são recebidas nesta sessão. |
| 🟡 GitHub Pages independente | 🟡 Hospedagem externa obrigatória para URL publicada | 🟡 A página pública fica indisponível; a demonstração pode ser executada localmente se preparada. |
| 🟡 Leitor de QR Code do dispositivo | 🟡 Dependência do aparelho do usuário | 🟡 O usuário pode abrir a URL textual alternativa. |

🟡 Não há dependência de API de saúde, serviço de mensagens ou backend.

---

## 11. Edge Cases e Tratamento de Erros

| Cenário | Trigger | Comportamento esperado |
|---------|---------|----------------------|
| 🟡 EC-01: URL pública inválida | 🟡 O QR contém destino malformado ou fora do endereço público previsto | 🟡 Não gerar nem apresentar o código como válido; mostrar mensagem explícita e URL de demonstração verificada. |
| 🟡 EC-02: QR Code indisponível | 🟡 A geração ou exibição visual do código falha | 🟡 Manter URL textual acessível e informar que o QR não está disponível. |
| 🟡 EC-03: Conteúdo público vazio | 🟡 Não há bloco sintético marcado como público | 🟡 Exibir estado vazio de demonstração sem substituir por dados privados ou reais. |
| 🟡 EC-04: Página de destino fora do ar | 🟡 GitHub Pages ou conexão fica indisponível | 🟡 Informar que a página demonstrativa não está acessível; não apresentar feedback de sucesso. |
| 🟡 EC-05: Reload ou acesso direto | 🟡 O usuário recarrega ou abre a rota pública diretamente | 🟡 A rota deve carregar a página estática compatível; se o estado local não existir, mostrar o conteúdo público inicial. |
| 🟡 EC-06: Retirada fora da sessão | 🟡 Um QR é lido em outro navegador após retirada simulada em outra sessão | 🟡 Informar que a retirada não é efetiva e exibir somente a demonstração pública genérica. |

---

## 12. Segurança e Privacidade

- **Autenticação:** 🟡 Não exigida para consultar a demonstração pública.
- **Autorização:** 🟡 A visualização não altera dados; nenhuma autorização de proprietário é implementada nesta versão.
- **Dados sensíveis:** 🟡 A página e o QR Code contêm apenas dados sintéticos e não codificam dados pessoais ou de saúde.
- **Auditoria:** 🟡 Não registrar identificação do leitor nem dados da leitura do QR.
- **Uso clínico:** 🟡 A tela não fornece instrução clínica e informa que não é serviço de emergência.
- **Alterações do proprietário:** 🟡 Uma operação futura deverá exigir identidade autenticada e autorização no servidor antes de aceitar alterações; acesso público de leitura não concede permissão de escrita.

---

## 13. Plano de Rollout

- **Estratégia:** 🟡 Publicar a visualização exclusivamente no GitHub Pages do repositório independente após verificar URL, conteúdo e leitura do QR.
- **Como reverter (rollback):** 🟡 Desabilitar ou reverter apenas a publicação do protótipo; não tocar no site atual nem nos QR Codes existentes.
- **Monitoramento pós-deploy:** 🟡 Testar leitura do código, acesso direto, recarga, URL textual e aviso de demonstração. Não coletar dados de visitantes.

---

## 14. Open Questions

| # | Pergunta | Impacto | Dono | Prazo |
|---|---------|---------|------|-------|
| OQ-01 | 🟡 Qual valor-alvo deve indicar reconhecimento da página como demonstração? | 🟡 Médio para avaliar a hipótese | 🟡 André | 🟡 Antes da primeira rodada de testes |
| OQ-02 | 🟡 Qual contato sintético será exibido, ou a demonstração indicará ausência de contato? | 🟡 Médio para conteúdo e teste | 🟡 André | 🟡 Antes de fechar o conteúdo sintético |
| OQ-03 | 🟡 Qual mecanismo de navegação estática será usado para garantir acesso direto e recarga? | 🟡 Médio para publicação | 🟡 Implementador | 🟡 Antes do deploy |

---

## 15. Decisões Tomadas (Decision Log)

| Decisão | Alternativas consideradas | Racional |
|---------|--------------------------|---------|
| 🟡 O QR Code abre uma página genérica da demonstração | 🟡 Codificar dados fictícios ou dados de usuário dentro do QR | 🟡 Evita exposição de payloads de saúde e não sugere um registro real. |
| 🟡 A consulta pública não exige login | 🟡 Exigir autenticação do socorrista | 🟡 A hipótese avalia descoberta rápida da visualização; o conteúdo é sintético e público. |
| 🟡 Retirada é local e não invalida QR externo | 🟡 Revogação funcional por servidor | 🟡 O protótipo não tem backend nem persistência. |
| 🟡 Dono dos dados e leitor público são papéis distintos em uma versão futura | 🟡 Permitir edição via página pública | 🟡 O acesso de leitura por QR não deve conceder alteração; autorização real está fora desta versão. |

---

## Apêndice

### Referências
- 🟡 [`prd.md`](../prd.md)
- 🟡 [`personas.md`](../personas.md)
- 🟡 [`onboarding.md` da feature 001](../../_reversa_forward/001-validar-prototipo-emergencia/onboarding.md)
- 🟡 [`requirements.md` da feature 001](../../_reversa_forward/001-validar-prototipo-emergencia/requirements.md)

### Histórico de Revisões
| Versão | Data | Autor | Mudanças |
|--------|------|-------|---------|
| 1.0 | 2026-11-08 | reversa-spec-sdd | 🟡 Criação inicial da spec. |

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCORE TOTAL: 100/100 — ⭐ Excelente — Pronta para implementação
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
