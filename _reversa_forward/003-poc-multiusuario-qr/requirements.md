# Requirements: POC multiusuário com QR por pessoa

> Identificador: `003-poc-multiusuario-qr`
> Data: `2026-11-18`
> Pasta da extração reversa: `_reversa_sdd/`
> Confidência: 🟢 CONFIRMADO, 🟡 INFERIDO, 🔴 LACUNA / DÚVIDA

## 1. Resumo executivo

Evoluir a demonstração estática para uma prova de conceito (POC) multiusuário: várias pessoas acessam a plataforma, entram com login social, mantêm **uma ficha de emergência por conta** e geram um QR (código de resposta rápida) que aponta para a **página pública da própria ficha**. A página pública continua sem login e mostra apenas os blocos marcados como públicos. Dados reais só entram com consentimento registrado; a POC mantém o aviso de não ser um serviço real.

## 2. Contexto a partir do legado

| Fonte | Trecho relevante | Confidência |
|-------|------------------|-------------|
| `_reversa_sdd/prd.md#Escopo (in)` | Ficha demonstrativa, QR e página pública de emergência; dados sintéticos hoje. | 🟢 |
| `_reversa_sdd/prd.md#Não-objetivos (out)` | Não é serviço real, não faz diagnóstico nem orientação clínica. | 🟢 |
| `_reversa_sdd/sdd/gestao-demonstrativa-da-ficha.md#6. Requisitos Funcionais` | Blocos da ficha, rótulos público/privado e alteração simulada. | 🟢 |
| `_reversa_sdd/sdd/visualizacao-emergencial-e-qr-code.md#6. Requisitos Funcionais` | Visualização pública sem login e QR que aponta para a página. | 🟢 |
| `_reversa_sdd/sdd/validacao-e-publicacao-independente.md#6. Requisitos Funcionais` | Validação e publicação sem coletar dados pessoais. | 🟢 |
| `_reversa_sdd/addenda/001-validar-prototipo-emergencia.md` | Protótipo navegável e publicação estática no Pages. | 🟢 |
| `_reversa_sdd/addenda/002-layout-implementacao-real.md` | Layout, tokens de tema e acessibilidade AA. | 🟢 |
| `DESIGN.md` | Anatomia, componentes e critérios de acessibilidade. | 🟢 |

> Observação de cenário: a extração é greenfield e não cobre contas, backend nem multiusuário. Esses pontos entram como regras novas desta feature.

## 3. Personas e cenários de uso

| Persona | Objetivo | Cenário-chave |
|---------|----------|---------------|
| Dono da ficha (pessoa com diabetes) | Manter sua ficha atualizada e compartilhá-la por QR | Entra com login social, edita a própria ficha, marca o que é público e baixa o QR |
| Contato de emergência / socorrista | Ler rapidamente o essencial sem instalar app | Escaneia o QR e vê a página pública, sem login |
| Cuidador autorizado (futuro) | Ajudar na manutenção da ficha | Fora do escopo da POC; mencionado para não bloquear a evolução |
| Operador da POC | Acompanhar uso e abuso | Consulta contas e QRs gerados, sem ler conteúdo de saúde |

## 4. Regras de negócio novas ou alteradas

1. **RN-01:** Antes de gravar qualquer dado de saúde, a pessoa registra consentimento com data, versão do termo e identificação da conta. 🟢
   - Origem no legado: `_reversa_sdd/prd.md#Restrições` (dados sintéticos) — passa a admitir dados reais consentidos.
   - Tipo: alterada
2. **RN-02:** Cada conta possui exatamente uma ficha de emergência na POC. 🟢
   - Origem no legado: `_reversa_sdd/sdd/gestao-demonstrativa-da-ficha.md#6. Requisitos Funcionais`.
   - Tipo: nova
3. **RN-03:** O endereço público da ficha usa um identificador aleatório e não adivinhável, sem nome, e-mail ou dado de saúde na URL. 🟢
   - Origem no legado: `_reversa_sdd/sdd/visualizacao-emergencial-e-qr-code.md#12. Segurança e Privacidade`.
   - Tipo: alterada
4. **RN-04:** O QR contém apenas a URL pública da ficha; nenhum dado de saúde é codificado no QR. 🟢
   - Origem no legado: `_reversa_sdd/sdd/visualizacao-emergencial-e-qr-code.md#6. Requisitos Funcionais`.
   - Tipo: nova
5. **RN-05:** A página pública exibe somente blocos marcados como públicos e sempre o estado atual; blocos privados nunca aparecem. 🟢
   - Origem no legado: `_reversa_sdd/sdd/visualizacao-emergencial-e-qr-code.md#6. Requisitos Funcionais`.
   - Tipo: nova
6. **RN-06:** Revogar o link público invalida permanentemente o endereço anterior; um novo QR só é gerado com um novo identificador. 🟢
   - Origem no legado: `_reversa_sdd/sdd/gestao-demonstrativa-da-ficha.md#6. Requisitos Funcionais` (retirada de compartilhamento simulada).
   - Tipo: alterada
7. **RN-07:** Apenas o dono autenticado lê e altera a própria ficha; nenhuma conta acessa dados de outra. 🟢
   - Origem no legado: `_reversa_sdd/sdd/gestao-demonstrativa-da-ficha.md#12. Segurança e Privacidade`.
   - Tipo: nova
8. **RN-08:** Dados reais só são admitidos de pessoas que aceitaram o termo; o conteúdo continua restrito à página pública e à conta do dono, sem outros compartilhamentos. 🟢
   - Origem no legado: `_reversa_sdd/prd.md#Não-objetivos (out)`.
   - Tipo: alterada
9. **RN-09:** O aviso de POC/demonstração permanece visível na gestão e na página pública, mesmo com dados reais. 🟢
   - Origem no legado: `_reversa_sdd/prd.md#Restrições`.
   - Tipo: nova
10. **RN-10:** Excluir a conta elimina a ficha, o link público e o consentimento associados; o QR antigo deixa de funcionar. 🟢
    - Origem no legado: `_reversa_sdd/prd.md#Não-objetivos (out)`.
    - Tipo: nova
11. **RN-11:** A POC não apresenta diagnóstico, dose ou instrução clínica como orientação válida; o conteúdo é responsabilidade do dono. 🟢
    - Origem no legado: `_reversa_sdd/prd.md#Não-objetivos (out)`.
    - Tipo: nova
12. **RN-12:** Várias contas usam a plataforma ao mesmo tempo sem que uma alteração interfira na ficha de outra. 🟢
    - Origem no legado: `_reversa_sdd/sdd/validacao-e-publicacao-independente.md#13. Plano de Rollout`.
    - Tipo: nova
13. **RN-13:** O dono define o nome de exibição da página pública, podendo usar nome completo, primeiro nome ou apelido. 🟢
    - Origem no legado: `DESIGN.md#3.2 Cabeçalho de identificação`.
    - Tipo: nova
14. **RN-14:** A POC não restringe idade; qualquer conta registra consentimento antes de gravar dados de saúde. 🟢
    - Origem no legado: `_reversa_sdd/prd.md#Restrições`.
    - Tipo: nova

## 5. Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de aceite | Confidência |
|----|-----------|------------|--------------------|-------------|
| RF-01 | Permitir criar conta e entrar com login social de provedor externo. | Must | Uma pessoa consegue entrar e vê a própria área; sem login, é redirecionada ao início. | 🟢 |
| RF-02 | Criar e editar a ficha de emergência da conta, com uma ficha por conta. | Must | Ao entrar pela primeira vez, a conta cria uma ficha; a segunda tentativa de criar é bloqueada. | 🟢 |
| RF-03 | Marcar cada bloco da ficha como público ou privado. | Must | A escolha persiste e a página pública reflete exatamente os blocos públicos. | 🟢 |
| RF-04 | Gerar um QR que aponta para a URL pública única e não adivinhável da ficha. | Must | O QR é lido por um leitor comum e abre a página pública correta. | 🟢 |
| RF-05 | Exibir a página pública da ficha sem login, somente com blocos públicos e aviso de POC. | Must | A URL abre em navegador anônimo e mostra apenas blocos públicos. | 🟢 |
| RF-06 | Revogar o link público e gerar um novo QR, invalidando o anterior. | Must | Após revogar, o endereço antigo deixa de exibir a ficha; o novo QR funciona. | 🟢 |
| RF-07 | Baixar a imagem do QR para impressão. | Should | A pessoa baixa um arquivo de imagem legível e o QR abre a página correta. | 🟡 |
| RF-08 | Isolar dados entre contas. | Must | Uma conta autenticada não consegue abrir nem alterar a ficha de outra. | 🟢 |
| RF-09 | Registrar consentimento antes de gravar dados de saúde. | Must | Sem consentimento aceito, o salvamento da ficha é bloqueado com mensagem clara. | 🟢 |
| RF-10 | Excluir a conta e todos os dados associados. | Must | Após excluir, a conta não acessa mais e o link público antigo não abre a ficha. | 🟢 |
| RF-11 | Exibir ao dono o estado do compartilhamento (ativo ou revogado). | Should | A tela da ficha mostra o estado atual e a data da última alteração. | 🟡 |
| RF-12 | Suportar vários usuários simultâneos sem interferência entre fichas. | Must | Duas contas editando ao mesmo tempo mantêm cada ficha isolada e correta. | 🟢 |
| RF-13 | Manter o aviso de POC/demonstração na gestão e na página pública. | Must | O aviso aparece nas duas telas em todas as larguras suportadas. | 🟢 |
| RF-14 | Manter o fluxo de geração de QR acessível (teclado, foco, contraste e alvos de toque). | Should | Navegação por teclado conclui o fluxo; critérios do `DESIGN.md` são atendidos. | 🟢 |
| RF-15 | Permitir que o dono defina o nome de exibição usado na página pública. | Should | O dono escolhe nome completo, primeiro nome ou apelido; a página pública mostra essa escolha. | 🟢 |

## 6. Requisitos Não Funcionais

| Tipo | Requisito | Evidência ou justificativa | Confidência |
|------|-----------|----------------------------|-------------|
| Segurança | Todo tráfego usa TLS (camada de transporte segura); identificadores públicos têm entropia de pelo menos 128 bits. | Reduz adivinhação e interceptação. | 🟢 |
| Segurança | Credenciais e chaves ficam somente no servidor; o cliente nunca recebe segredo de escrita. | Isolamento entre contas. | 🟢 |
| Segurança | Autorização é verificada no servidor a cada leitura e escrita, não apenas na interface. | RN-07 e RF-08. | 🟢 |
| Privacidade | Coletar o mínimo necessário; nenhum dado de saúde em logs, URLs ou no QR. | RN-03, RN-04 e Lei Geral de Proteção de Dados (LGPD). | 🟢 |
| Privacidade | Consentimento versionado com data e possibilidade de revogação e exclusão. | RN-01 e RN-10. | 🟢 |
| Privacidade | Retenção: dados ficam enquanto a conta existir; exclusão remove ficha, link e consentimento. | RN-10. | 🟢 |
| Desempenho | A página pública responde em até 2 s em rede 4G típica; o QR é gerado em até 1 s. | Uso em emergência. | 🟡 |
| Escala | Sem limites rígidos na POC; a meta de teste é suportar 20 acessos simultâneos à página pública. | Escopo de prova de conceito; os limites reais vêm do plano gratuito escolhido. | 🟡 |
| Custo | Operar apenas com planos gratuitos; ao atingir um limite, degradar com aviso claro, sem cobrança automática. | Resposta do responsável em 2026-11-18. | 🟢 |
| Privacidade | A POC não restringe idade; o consentimento é obrigatório para todas as contas. | RN-14. | 🟢 |
| Disponibilidade | A página pública tem prioridade sobre a área autenticada em caso de degradação. | Leitura em emergência. | 🟡 |
| Observabilidade | Registrar eventos de acesso e erro sem conteúdo de saúde nem identificadores pessoais em claro. | Privacidade e suporte. | 🟡 |
| Acessibilidade | Atender aos critérios nível AA das Diretrizes de Acessibilidade para Conteúdo Web (WCAG) no fluxo de conta e de QR. | RF-14. | 🟢 |
| Compatibilidade | Funcionar nos navegadores móveis atuais e em leitores de QR comuns. | Público-alvo. | 🟢 |

## 7. Critérios de Aceitação

```gherkin
Cenário: Primeira entrada e criação da ficha
  Dado que uma pessoa ainda não tem conta
  Quando ela entra com login social
  Então o sistema cria a conta e oferece criar a ficha de emergência
  E registra o consentimento antes de permitir salvar dados de saúde

Cenário: Geração do QR e leitura pública
  Dado que o dono tem uma ficha com blocos públicos e privados
  Quando ele gera o QR
  Então o QR aponta para a URL pública única da ficha
  E um leitor comum abre a página pública sem login
  E a página mostra somente os blocos públicos
  E mostra o nome de exibição escolhido pelo dono
  E exibe o aviso de que se trata de uma POC

Cenário: Revogação do link
  Dado que o dono já compartilhou um QR
  Quando ele revoga o link e gera um novo QR
  Então o endereço anterior deixa de exibir a ficha
  E o novo QR abre a página pública atualizada

Cenário: Acesso indevido entre contas
  Dado que a conta A está autenticada
  Quando ela tenta abrir ou alterar a ficha da conta B
  Então o sistema nega o acesso
  E não revela nenhum dado da conta B

Cenário: Salvamento sem consentimento
  Dado que a pessoa ainda não aceitou o termo
  Quando ela tenta salvar dados de saúde
  Então o sistema bloqueia o salvamento
  E explica que o consentimento é necessário

Cenário: Exclusão da conta
  Dado que o dono tem ficha, link público e consentimento registrados
  Quando ele exclui a conta
  Então a ficha, o link e o consentimento são removidos
  E o QR antigo deixa de abrir a página

Cenário: Uso simultâneo por várias pessoas
  Dado que duas contas editam suas fichas ao mesmo tempo
  Quando ambas salvam
  Então cada ficha mantém apenas os próprios dados
  E nenhuma alteração aparece na ficha da outra

Cenário: Download do QR e estado do compartilhamento
  Dado que o dono gerou o QR
  Quando ele baixa a imagem e consulta o estado
  Então recebe um arquivo de imagem legível
  E vê o estado ativo com a data da última alteração

Cenário: Fluxo acessível por teclado
  Dado que o dono usa apenas o teclado
  Quando percorre login, edição e geração do QR
  Então o foco é sempre visível
  E consegue concluir o fluxo sem mouse
```

## 8. Prioridade MoSCoW

| Item | MoSCoW | Justificativa |
|------|--------|---------------|
| RF-01 | Must | Sem login não há multiusuário. |
| RF-02 | Must | Base da POC: uma ficha por conta. |
| RF-03 | Must | Controla o que fica público. |
| RF-04 | Must | Núcleo do pedido: QR por pessoa. |
| RF-05 | Must | É o que o socorrista vê. |
| RF-06 | Must | Segurança e controle do dono. |
| RF-08 | Must | Isolamento é condição para dados reais. |
| RF-09 | Must | Consentimento é pré-requisito legal e ético. |
| RF-10 | Must | Direito de exclusão. |
| RF-12 | Must | Requisito central de multiusuário. |
| RF-13 | Must | Evita confundir a POC com serviço real. |
| RF-07 | Should | Impressão melhora o uso, mas não bloqueia a POC. |
| RF-11 | Should | Transparência do compartilhamento, sem bloquear. |
| RF-14 | Should | Acessibilidade já é diretriz; reforçada no fluxo novo. |
| RF-15 | Should | Personaliza a identificação sem perder privacidade. |
| RNF de privacidade | Must | Dados reais consentidos exigem cuidado mínimo. |
| RNF de escala (20 simultâneos) | Should | Meta de POC, ajustável conforme uso. |
| RNF de custo | Must | Restrição explícita: operar em planos gratuitos. |

## 9. Esclarecimentos

### Sessão 2026-11-18

- **Q:** Onde ficam contas e dados na POC?
  **R:** Ainda não há estudo; o requisito é usar serviços de **custo zero** (planos gratuitos). O levantamento das opções e dos limites de cada plano gratuito e a recomendação do modelo ficam para a investigação e o plano.
- **Q:** Quem pode criar conta e com qual consentimento?
  **R:** **Sem restrição etária** na POC. Toda conta registra consentimento antes de gravar dados de saúde.
- **Q:** Quais limites de uso e proteção contra abuso valem na POC?
  **R:** **Sem limites rígidos** na POC. O consumo fica limitado apenas pelo plano gratuito escolhido, que será levantado no plano.
- **Q:** Como o nome do dono aparece na página pública?
  **R:** O **dono escolhe** o nome de exibição (completo, primeiro nome ou apelido).
- **Login:** login social com provedor externo; provedor escolhido pelo responsável: conta Google.
- **Fichas por pessoa:** uma ficha por conta.
- **Dados:** dados reais de pessoas que aceitarem usar o serviço, mediante consentimento.

## 10. Lacunas

Nenhuma lacuna em aberto.

## 11. Histórico de alterações

| Data | Alteração | Autor |
|------|-----------|-------|
| 2026-11-18 | Versão inicial gerada por `/reversa-requirements` | reversa |
