# PRD: Protótipo de ficha de emergência para diabetes

> Selo 🟡 PLANEJADO. Documento gerado a partir de ideation + personas.

**Versão:** 1.0
**Data:** 2026-11-08
**Autor:** reversa-drafter
**Status:** rascunho

---

## 1. Problema

🟡 Pessoas com diabetes podem temer que, durante uma crise de hipoglicemia ou hiperglicemia, fiquem inconscientes e as pessoas ao redor não saibam o que pode estar acontecendo ou quem contatar. Quem encontra alguém nessa situação pode não saber localizar ou interpretar informações de emergência. Antes de construir uma plataforma operacional, é necessário validar se a separação entre informações privadas e compartilhadas é compreensível e se a demonstração é reconhecida como fictícia.

### Quem sente

🟡 A pessoa com diabetes que prepara uma ficha e quer deixá-la acessível; qualquer pessoa que encontre o QR Code em uma situação inesperada e sob estresse; e a pessoa responsável pelo site, que presta suporte ocasional e mantém a experiência.

---

## 2. Personas-alvo

🟡 Referência completa em [`personas.md`](./personas.md). Resumo:

- **Pessoa que prepara a ficha**: 🟡 pessoa com diabetes, iniciante no uso do celular, que quer um QR Code acessível para que outras pessoas encontrem informações durante uma crise.
- **Pessoa que encontra o QR Code**: 🟡 pessoa com baixo nível técnico que, sob estresse, precisa consultar rapidamente a demonstração e identificar um contato fictício.
- **Responsável pelo site**: 🟡 pessoa tecnicamente avançada que mantém o site como voluntária, presta suporte ocasional e deseja ajudar pessoas; geração de renda é uma possibilidade futura, não parte desta entrega.

---

## 3. Métricas de sucesso

🟡 A primeira rodada de validação propõe uma amostra de 3 a 5 pacientes/cuidadores e 3 a 5 pessoas que prestam primeiros socorros. O sinal de sucesso é que todas as pessoas participantes consigam explicar, sem orientação extra, quais informações seriam públicas ou privadas e compreendam a simulação de atualização/retirada de compartilhamento.

| Métrica | Unidade | Alvo | Prazo |
|---|---|---|---|
| 🟡 Participantes que distinguem informações públicas e privadas sem ajuda | 🟡 Percentual dos participantes em cada perfil | 🟡 100% da amostra; 3–5 pacientes/cuidadores e 3–5 socorristas | 🟡 Não definido |
| 🟡 Participantes que compreendem a simulação de atualização e retirada do compartilhamento | 🟡 Percentual dos participantes em cada perfil | 🟡 100% da amostra | 🟡 Não definido |
| 🟡 Participantes que reconhecem a página como demonstração, não como serviço real | 🟡 Percentual dos participantes | 🟡 A observar e registrar; alvo numérico não definido | 🟡 Não definido |

---

## 4. Escopo (in)

🟡 Esta entrega valida compreensão e usabilidade com conteúdo fictício; não implementa uma ficha operacional.

- 🟡 Permitir percorrer, em dispositivo móvel, uma jornada demonstrativa de gestão de ficha usando somente dados e escolhas predefinidos.
- 🟡 Tornar visível quais blocos da ficha fictícia seriam compartilhados e quais permaneceriam privados.
- 🟡 Apresentar uma visualização emergencial sem login, identificada persistentemente como demonstração.
- 🟡 Gerar ou disponibilizar um QR Code demonstrativo que abra somente conteúdo fictício e não carregue dados pessoais.
- 🟡 Simular atualização e retirada do compartilhamento e refletir a mudança na visualização da demonstração, sem persistência nem efeito operacional.
- 🟡 Permitir que um facilitador observe tarefas e registre dúvidas, interpretações e bloqueios sem identificar participantes nem coletar dados de saúde.
- 🟡 Publicar o protótipo em um repositório público e GitHub Pages próprios, com URL independente do site atual.
- 🟡 Usar exclusivamente conteúdo sintético e avisos persistentes de demonstração em todas as telas.
- 🟡 Preparar a experiência para uso por pessoas com baixa familiaridade digital e em contexto de estresse, sem pressupor uma recomendação clínica.

---

## 5. Não-objetivos (out)

- 🟡 Não oferecer um serviço de emergência real nem substituir atendimento ou orientação profissional.
- 🟡 Não coletar, armazenar, enviar ou publicar dados reais de saúde, dados pessoais ou contatos reais; não oferecer entrada livre para preencher uma ficha real.
- 🟡 Não fornecer diagnóstico, dose, tratamento ou instrução clínica acionável.
- 🟡 Não implementar autenticação, backend, banco de dados, persistência de perfil ou controle efetivo de acesso/revogação.
- 🟡 Não fazer o QR Code demonstrativo apontar para uma ficha real ou codificar dados pessoais.
- 🟡 Não alterar o site atual, seu repositório, workflow, URL ou QR Codes existentes; a publicação do protótipo será isolada.
- 🟡 Não prestar operação contínua ou suporte real a pacientes nesta entrega.
- 🟡 Não implementar monetização nem validar um modelo de geração de renda; isso poderá ser considerado em uma fase futura.

---

## 6. Restrições

🟡 As restrições abaixo mantêm a separação entre uma demonstração pública e qualquer uso operacional futuro.

| Tipo | Descrição |
|---|---|
| 🟡 Técnica | 🟡 Aplicação estática independente, publicada em repositório público e GitHub Pages próprios; sem backend, banco, APIs de runtime ou persistência. A navegação deve funcionar na hospedagem estática. |
| 🟡 Prazo | 🟡 Não há prazo definido. |
| 🟡 Compliance | 🟡 Nenhuma exigência regulatória adicional foi identificada para o protótipo, além de não usar nem coletar dados reais. Esta definição não constitui avaliação de compliance para uma operação futura. |
| 🟡 Orçamento | 🟡 Orçamento disponível: zero; usar infraestrutura compatível com esse limite e confirmar a elegibilidade/custos do GitHub Pages antes da publicação. |
| 🟡 Publicação e privacidade | 🟡 O repositório e o site serão públicos. Todo conteúdo e artefato publicado deve ser sintético, sem dados, arquivos, histórico, assets ou segredos do site atual. |
| 🟡 Preservação do site atual | 🟡 Não alterar nem acionar para esta entrega o repositório, a configuração, o workflow, a URL ou os QR Codes do site atual. |

---

## 7. Dependências externas

🟡 Não há APIs de runtime ou dependências de dados externos identificadas. A publicação depende do GitHub Pages no repositório novo e de confirmar que o recurso está disponível nas condições de custo e visibilidade escolhidas.

- 🟡 GitHub Pages para hospedagem pública independente; disponibilidade e configuração ainda precisam ser validadas.
- 🟡 Não há integração com serviço de saúde, cadastro, autenticação ou armazenamento externo nesta entrega.

---

## 8. Riscos

🟡 Os riscos abaixo derivam das premissas da ideação e das jornadas.

| Risco | Impacto | Probabilidade | Mitigação proposta |
|---|---|---|---|
| 🟡 Participantes confundirem a demonstração com uma ficha ou serviço real | 🟡 Alto | 🟡 Média | 🟡 Manter identificação de demonstração persistente e explícita em todas as telas e no conteúdo acessado pelo QR Code. |
| 🟡 Dados reais, assets, histórico ou segredos do site atual serem incluídos no repositório ou artefato público | 🟡 Alto | 🟡 Baixa | 🟡 Manter o repositório independente, usar somente dados sintéticos e inspecionar fontes e build antes de publicar. |
| 🟡 A demonstração ou uma ação simulada ser interpretada como aconselhamento clínico ou revogação efetiva | 🟡 Alto | 🟡 Média | 🟡 Evitar instruções clínicas e declarar que atualização e revogação são simulações sem efeito operacional. |
| 🟡 A URL direta ou recarga de uma tela falhar no GitHub Pages | 🟡 Médio | 🟡 Média | 🟡 Escolher navegação compatível com hospedagem estática e testar acesso direto e recarga antes de divulgar. |
| 🟡 GitHub Pages não estar disponível nas condições de visibilidade ou orçamento definidas | 🟡 Médio | 🟡 Baixa | 🟡 Confirmar elegibilidade e custos antes de publicar; não migrar o deploy para o site atual. |
| 🟡 O protótipo não representar soluções atualmente usadas pelo público | 🟡 Médio | 🟡 Alta | 🟡 Tratar alternativas existentes como lacuna de pesquisa e validar esse contexto antes de decisões de produto além do protótipo. |
| 🟡 A manutenção e o suporte de uma eventual operação real não terem responsável ou modelo sustentável | 🟡 Alto | 🟡 Média | 🟡 Manter suporte e monetização fora do escopo atual e exigir definição operacional antes de qualquer piloto com dados reais. |

---

## 9. Critérios de aceite (alto nível)

- 🟡 **Dado** que a pessoa com diabetes acessa o protótipo pelo celular, **Quando** percorre a gestão demonstrativa e escolhe opções predefinidas, **Então** consegue revisar quais informações seriam compartilhadas sem inserir dados reais.
- 🟡 **Dado** que a pessoa prepara um QR Code demonstrativo, **Quando** o código é lido, **Então** ele abre somente a visualização fictícia e informa persistentemente que não é um serviço real.
- 🟡 **Dado** que uma pessoa encontra o QR Code em uma situação de estresse, **Quando** abre a visualização, **Então** consegue identificar a demonstração, localizar as informações fictícias visíveis e compreender que eventual contato também é fictício.
- 🟡 **Dado** que o participante simula uma atualização ou retirada do compartilhamento, **Quando** consulta novamente a visualização, **Então** vê o estado demonstrativo correspondente sem que a ação seja apresentada como persistente ou efetiva em produção.
- 🟡 **Dado** que o facilitador conduz a validação, **Quando** registra conclusão, dúvidas ou bloqueios das tarefas, **Então** não precisa coletar identidade, contato ou informação de saúde do participante.
- 🟡 **Dado** que o protótipo está pronto para publicação, **Quando** o repositório e o artefato são inspecionados, **Então** contêm apenas o protótipo e dados sintéticos e não alteram a publicação, a URL ou os QR Codes do site atual.

---

## Pendências de cobertura

- 🟡 Quais soluções pacientes/cuidadores e socorristas usam atualmente não foi pesquisado; a ideação registra `[INDEFINIDO]`.
- 🟡 Não há prazo definido. A métrica de sucesso está associada a uma amostra, mas não a uma data de execução.
- 🟡 O alvo numérico para reconhecimento da demonstração como fictícia ainda não foi definido.
- 🟡 A elegibilidade e o custo efetivo do GitHub Pages devem ser confirmados no repositório/conta antes da publicação.
- 🟡 A definição de compliance se limita a não usar nem coletar dados reais; requisitos de uma eventual operação futura não foram avaliados.
- 🟡 Suporte contínuo, manutenção operacional e possibilidade de renda permanecem fora desta entrega e precisam ser definidos antes de qualquer serviço real.

---

Gerado por reversa-drafter em 2026-11-08T23:43:40Z
Fontes: ideation.md, personas.md, `_reversa_forward/001-validar-prototipo-emergencia/requirements.md`, `roadmap.md`, `investigation.md` e `onboarding.md`.
