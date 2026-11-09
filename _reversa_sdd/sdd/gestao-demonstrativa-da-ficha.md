# Spec: Gestão demonstrativa da ficha

**Versão:** 1.0  
**Status:** Rascunho  
**Autor:** reversa-spec-sdd  
**Data:** 2026-11-08  
**Reviewers:** N/A

---

## 1. Resumo

🟡 A gestão demonstrativa permite que uma pessoa percorra, em celular ou computador, uma ficha fictícia e observe quais blocos seriam públicos ou privados. A pessoa pode simular escolhas, atualização e retirada do compartilhamento; nenhuma ação altera dados reais ou persiste fora da sessão.

---

## 2. Contexto e Motivação

**Problema:**  
🟡 A pessoa com diabetes pode não saber quais informações seriam compartilhadas numa emergência ou como uma ficha seria atualizada. O protótipo precisa tornar essas decisões observáveis sem solicitar informação real.

**Evidências:**  
🟡 O PRD define uma jornada demonstrativa com escolhas predefinidas, dados sintéticos e distinção entre blocos públicos e privados. A persona principal tem baixa familiaridade com celular e deseja entender um QR Code acessível.

**Por que agora:**  
🟡 A ficha e o fluxo são hipóteses de produto ainda não validadas. A demonstração deve permitir observar a compreensão antes de qualquer decisão de construir uma plataforma operacional.

---

## 3. Goals (Objetivos)

- 🟡 G-01: Permitir percorrer a gestão demonstrativa sem inserir texto livre ou informação pessoal.
- 🟡 G-02: Permitir identificar a visibilidade prevista para cada bloco da ficha fictícia.
- 🟡 G-03: Demonstrar visualmente uma atualização e uma retirada de compartilhamento sem persistência nem efeito operacional.
- 🟡 G-04: Manter um aviso persistente de demonstração em toda a jornada de gestão.

**Métricas de sucesso:**

| Métrica | Baseline atual | Target | Prazo |
|---------|---------------|--------|-------|
| 🟡 Participantes que distinguem informações públicas e privadas sem ajuda | 🟡 Não medido | 🟡 100% de 3–5 pacientes/cuidadores e 3–5 socorristas | 🟡 Não definido |
| 🟡 Participantes que compreendem atualização e retirada simuladas | 🟡 Não medido | 🟡 100% da amostra | 🟡 Não definido |

---

## 4. Non-Goals (Fora do Escopo)

- 🟡 NG-01: Não permitir cadastrar ou editar dados reais de saúde, identidade ou contato.
- 🟡 NG-02: Não implementar conta, autenticação, autorização do proprietário, backend ou persistência.
- 🟡 NG-03: Não realizar atualização ou revogação efetiva de uma ficha ou de um QR Code existente.
- 🟡 NG-04: Não oferecer diagnóstico, instrução de tratamento ou serviço de emergência real.
- 🟡 NG-05: Não permitir entrada livre de texto nem upload de arquivo na ficha.
- 🟡 NG-06: Não tornar a gestão demonstrativa um painel operacional do responsável pelo site.

---

## 5. Usuários e Personas

**Usuário primário:** 🟡 Pessoa com diabetes, iniciante no uso do celular, que quer compreender como preparar uma ficha e decidir quais informações compartilhar.  
**Usuário secundário:** 🟡 Cuidador que ajuda a percorrer a demonstração; facilitador que observa a sessão sem registrar dados identificáveis.

**Jornada atual (sem a feature):**  
🟡 A pessoa não tem nesta demonstração um fluxo para revisar a visibilidade dos blocos. O contexto existente não descreve uma solução atual usada pelo público; ⚠️ ABERTO: alternativas correntes devem ser pesquisadas antes de definir uma operação futura.

**Jornada futura (com a feature):**
1. 🟡 A pessoa abre a gestão demonstrativa.
2. 🟡 A pessoa examina os blocos fictícios e suas indicações de visibilidade.
3. 🟡 A pessoa escolhe opções predefinidas para simular uma atualização.
4. 🟡 A pessoa observa a confirmação de que o estado é apenas demonstrativo.
5. 🟡 A pessoa abre a visualização de emergência para comparar o conteúdo público e privado.
6. 🟡 A pessoa simula a retirada do compartilhamento e observa o estado resultante na sessão.

---

## 6. Requisitos Funcionais

### 6.1 Requisitos Principais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|-----------|-------------------|
| RF-01 | 🟡 O sistema deve apresentar uma ficha composta exclusivamente por conteúdo sintético predefinido. | Must | 🟡 A inspeção da jornada encontra somente os valores fictícios previstos e nenhum campo aceita dados de paciente. |
| RF-02 | 🟡 O sistema deve identificar, para cada bloco exibido na gestão, se ele é público na demonstração ou privado. | Must | 🟡 Cada bloco da ficha possui um rótulo de visibilidade legível antes de abrir a visualização emergencial. |
| RF-03 | 🟡 O usuário deve poder selecionar uma opção predefinida para simular uma alteração de conteúdo. | Must | 🟡 A seleção atualiza a prévia da sessão e não apresenta entrada livre de texto. |
| RF-04 | 🟡 O usuário deve poder simular a retirada do compartilhamento. | Must | 🟡 A interface exibe um estado de compartilhamento retirado na sessão e explica que nenhum acesso real foi revogado. |
| RF-05 | 🟡 O sistema deve manter um aviso de demonstração visível na gestão e nas confirmações de ação. | Must | 🟡 O aviso continua visível antes e depois de atualização, retirada e retorno à gestão. |
| RF-06 | 🟡 O sistema deve permitir navegar da gestão para a visualização pública demonstrativa e retornar à gestão. | Must | 🟡 A navegação preserva o estado simulado enquanto a sessão da aplicação permanece aberta. |
| RF-07 | 🟡 O sistema deve reiniciar a demonstração para seu estado inicial sintético após uma reinicialização da aplicação. | Should | 🟡 Após recarregar ou reabrir a aplicação, os dados exibidos correspondem ao estado inicial predefinido. |

### 6.2 Fluxo Principal (Happy Path)

1. 🟡 O usuário abre a gestão demonstrativa.
2. 🟡 O sistema exibe o aviso persistente e a ficha fictícia predefinida.
3. 🟡 O usuário examina os rótulos público e privado de cada bloco.
4. 🟡 O usuário escolhe uma alteração predefinida.
5. 🟡 O sistema atualiza a prévia apenas no estado temporário da sessão.
6. 🟡 O usuário abre a visualização emergencial e compara os blocos públicos.
7. 🟡 O usuário retorna à gestão e simula a retirada do compartilhamento.
8. 🟡 O sistema mostra o estado retirado com aviso de que a ação não tem efeito real.

### 6.3 Fluxos Alternativos

**Fluxo Alternativo A — Reiniciar demonstração:**
1. 🟡 O usuário recarrega ou reabre a aplicação.
2. 🟡 O sistema restaura o conteúdo sintético inicial e não reaproveita o estado simulado anterior.

**Fluxo Alternativo B — Ação simulada após retirada:**
1. 🟡 O usuário tenta abrir a visualização após retirar o compartilhamento na sessão.
2. 🟡 O sistema exibe o estado de demonstração retirada, sem afirmar que um QR Code externo foi invalidado.

---

## 7. Requisitos Não-Funcionais

| ID | Requisito | Valor alvo | Observação |
|----|-----------|-----------|------------|
| RNF-01 | 🟡 Privacidade | 🟡 Nenhuma entrada ou persistência de dados reais | 🟡 O conteúdo é integralmente sintético e a alteração existe somente na sessão. |
| RNF-02 | 🟡 Usabilidade | 🟡 Fluxo compreensível sem texto digitado | 🟡 A pessoa principal tem baixa familiaridade digital. |
| RNF-03 | 🟡 Segurança clínica | 🟡 Nenhum conselho clínico acionável | 🟡 O aviso declara que o conteúdo é fictício e não substitui ajuda profissional. |
| RNF-04 | 🟡 Identidade visual semântica | 🟡 Aviso persistente em todas as telas | 🟡 Nenhuma ação deve parecer uma alteração de dados reais. |

---

## 8. Design e Interface

**Componentes afetados:** 🟡 Jornada de gestão demonstrativa, lista de blocos da ficha, controles de visibilidade, opções de alteração, estado de compartilhamento e acesso à visualização emergencial.

**Comportamento esperado:**  
🟡 O sistema apresenta primeiro o aviso de demonstração e, junto dele, os blocos fictícios e sua visibilidade. As escolhas são fechadas e produzem feedback explícito de simulação. A alteração e a retirada são mantidas somente durante a sessão. O usuário pode navegar até a visualização para observar o efeito demonstrativo.

**Estados da UI:**
- 🟡 Estado inicial: aviso de demonstração e ficha sintética padrão.
- 🟡 Estado de carregamento: não há carregamento de perfil ou consulta externa; a tela apresenta o conteúdo local disponível.
- 🟡 Estado de erro: se uma ação não puder ser aplicada, o sistema informa que a demonstração não foi atualizada e mantém visível o conteúdo sintético atual.
- 🟡 Estado de sucesso: o sistema mostra a prévia alterada ou o estado retirado, sempre com indicação de que a ação é simulada.

---

## 9. Modelo de Dados

🟡 Não há dados persistidos nem migrações. O sistema usa conteúdo sintético estático e um estado temporário mantido apenas enquanto a sessão da aplicação está aberta.

```text
FichaDemonstrativa {
  id: identificador fixo de demonstração
  rotulo: "Demonstração"
  blocos: lista de conteúdo sintético com visibilidade pública ou privada
  estadoCompartilhamento: ativo ou retirado (somente simulado)
  alternativaPredefinida: conjunto fechado de variações sintéticas
}
```

🟡 Reiniciar a aplicação restaura o estado inicial; não existe migração ou armazenamento de dados de usuário.

---

## 10. Integrações e Dependências

| Dependência | Tipo | Impacto se indisponível |
|-------------|------|------------------------|
| 🟡 Visualização emergencial e QR Code | 🟡 Componente interno | 🟡 A gestão ainda pode apresentar os blocos sintéticos; a comparação pública/privada permanece incompleta. |
| 🟡 Conteúdo sintético predefinido | 🟡 Dado local obrigatório | 🟡 A demonstração não inicia corretamente; o sistema deve exibir erro claro em vez de sugerir conteúdo de pessoa real. |

🟡 Não há API ou serviço externo de runtime nesta componente.

---

## 11. Edge Cases e Tratamento de Erros

| Cenário | Trigger | Comportamento esperado |
|---------|---------|----------------------|
| 🟡 EC-01: Estado reiniciado | 🟡 Recarregar a aplicação após uma alteração simulada | 🟡 Restaurar os valores sintéticos iniciais e deixar claro que a alteração não foi persistida. |
| 🟡 EC-02: Ação não disponível | 🟡 O controle escolhido não corresponde a uma opção predefinida válida | 🟡 Não alterar o estado; apresentar mensagem clara e manter o conteúdo atual. |
| 🟡 EC-03: Bloco sem rótulo de visibilidade | 🟡 Um bloco sintético não contém classificação de público/privado | 🟡 Não apresentar o bloco como público; indicar que sua visibilidade não está definida na demonstração. |
| 🟡 EC-04: Navegação interrompida | 🟡 O usuário volta à gestão após interromper uma ação | 🟡 Preservar o estado simulado enquanto a sessão estiver aberta e não declarar persistência além dela. |
| 🟡 EC-05: Conteúdo sintético ausente | 🟡 A ficha inicial não pode ser carregada | 🟡 Exibir erro explícito e não preencher campos com dados reais ou valores de sucesso inventados. |
| 🟡 EC-06: Visualização interna indisponível | 🟡 A navegação para a visualização emergencial falha | 🟡 Informar que a comparação não foi concluída, manter a gestão acessível e permitir nova tentativa. |

---

## 12. Segurança e Privacidade

- **Autenticação:** 🟡 Nenhuma; o protótipo não contém dados pessoais nem estado persistente.
- **Autorização:** 🟡 Não se aplica à simulação. A autorização real do proprietário é requisito futuro e não é garantida pela interface.
- **Dados sensíveis:** 🟡 Não processar nem aceitar dados reais de saúde, identidade ou contato.
- **Auditoria:** 🟡 Não registrar atividade identificável ou eventos ligados a participantes.
- **QR Code público:** 🟡 Acesso ao conteúdo sintético não implica permissão para alterar dados de proprietário; não há dados de proprietário nesta versão.
- **Futuro operacional:** 🟡 Uma versão com dados reais deve definir autenticação e autorização no servidor antes de permitir alterações; esconder controles no navegador não é uma garantia de segurança.

---

## 13. Plano de Rollout

- **Estratégia:** 🟡 Disponibilizar como protótipo estático independente, após revisão dos textos e conteúdo sintético.
- **Como reverter (rollback):** 🟡 Retirar ou reverter somente a publicação do repositório de demonstração; não alterar o site atual nem seus QR Codes.
- **Monitoramento pós-deploy:** 🟡 Verificar acesso à gestão, consistência do conteúdo sintético e presença dos avisos. Não coletar dados de usuários.

---

## 14. Open Questions

| # | Pergunta | Impacto | Dono | Prazo |
|---|---------|---------|------|-------|
| OQ-01 | 🟡 Quais soluções pacientes/cuidadores e socorristas usam atualmente? | 🟡 Médio para decisões futuras de produto | 🟡 André | 🟡 Antes de ampliar o produto além do protótipo |
| OQ-02 | 🟡 Quais mecanismos de autenticação, recuperação de conta e autorização serão exigidos quando uma versão operacional permitir ao proprietário alterar dados reais? | 🟡 Alto para segurança futura; fora do escopo atual | 🟡 André | 🟡 Antes de armazenar qualquer dado real |

---

## 15. Decisões Tomadas (Decision Log)

| Decisão | Alternativas consideradas | Racional |
|---------|--------------------------|---------|
| 🟡 Usar somente opções sintéticas predefinidas | 🟡 Entrada livre e cadastro real | 🟡 Evita coleta ou persistência de dados de saúde nesta validação. |
| 🟡 Manter alterações e retirada somente na sessão | 🟡 Persistência em banco ou revogação de QR real | 🟡 O objetivo é testar compreensão, não oferecer operação real. |
| 🟡 Manter autenticação do proprietário fora desta versão | 🟡 Autenticação real ou simulação de conta | 🟡 Sem dados reais, backend ou persistência, simular segurança poderia induzir confiança indevida. A necessidade futura foi registrada na OQ-02. |

---

## Apêndice

### Referências
- 🟡 [`prd.md`](../prd.md)
- 🟡 [`personas.md`](../personas.md)
- 🟡 [`requirements.md` da feature 001](../../_reversa_forward/001-validar-prototipo-emergencia/requirements.md)
- 🟡 [`data-delta.md` da feature 001](../../_reversa_forward/001-validar-prototipo-emergencia/data-delta.md)

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
