# Regression Watch: Protótipo navegável para validação de ficha de emergência

> Identificador da feature: `001-validar-prototipo-emergencia`
> Cenário: **greenfield** (nada extraído de código existente ainda; sem watch items com peso de regressão nesta rodada)

## Watch principal

| ID | Origem (arquivo, seção) | Regra esperada após mudança | Tipo de verificação | Sinal de violação |
|----|-------------------------|-----------------------------|---------------------|-------------------|
| — | — | Nenhum watch item de regressão nesta rodada | — | — |

## Histórico de re-extrações

(vazio — preenchido pelo agente reverso quando `/reversa` rodar de novo)

## Arquivadas

(vazio)

## Observações

Cenário greenfield: não há regras 🟢 extraídas de código existente para vigiar. Os requisitos funcionais abaixo foram implementados a partir das specs SDD e ganham peso de regressão quando uma futura extração `/reversa` sobre o código novo os confirmar como 🟢.

| Ref. | Origem (spec) | Comportamento entregue |
|------|---------------|------------------------|
| RF-01..RF-07 (gestão) | `_reversa_sdd/sdd/gestao-demonstrativa-da-ficha.md#6. Requisitos Funcionais` | Ficha somente com conteúdo sintético predefinido; rótulo de visibilidade por bloco; alteração e retirada de compartilhamento simuladas; aviso de demonstração persistente; navegação gestão↔visualização; reinício do estado ao recarregar. |
| RF-01..RF-08 (visualização) | `_reversa_sdd/sdd/visualizacao-emergencial-e-qr-code.md#6. Requisitos Funcionais` | Visualização sem login, apenas blocos públicos, identificação persistente de demonstração, QR/URL textual demonstrativo sem dados pessoais, estado ativo/retirado na sessão, sem orientação clínica, aviso de indisponibilidade. |
| RF-01..RF-08 (validação/publicação) | `_reversa_sdd/sdd/validacao-e-publicacao-independente.md#6. Requisitos Funcionais` | Roteiro do facilitador sem identificação de participantes; build estático e workflow de Pages próprios; verificação de rota direta/recarga; inspeção de conteúdo sintético; publicação isolada sem alterar o site atual; falha explícita quando o Pages está indisponível. |

## Fontes

- `_reversa_forward/001-validar-prototipo-emergencia/legacy-impact.md`
- `_reversa_sdd/sdd/gestao-demonstrativa-da-ficha.md`
- `_reversa_sdd/sdd/visualizacao-emergencial-e-qr-code.md`
- `_reversa_sdd/sdd/validacao-e-publicacao-independente.md`
