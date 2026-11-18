# Adendo: Protótipo navegável para validação de ficha de emergência

> Identificador da feature: `001-validar-prototipo-emergencia`
> Data: `2026-11-18`
> Cenário: **greenfield**
> Feature greenfield, sem legado pré-existente. Âncora: `prd.md` + specs SDD em `sdd/`.

## Vigência

Vigente desde 2026-11-18.

## Resumo da entrega

A feature entregou um protótipo navegável, estático e independente para validar a compreensão da ficha de emergência com pacientes/cuidadores e socorristas, usando apenas dados sintéticos. A jornada cobre gestão demonstrativa (blocos com rótulo público/privado, alteração e retirada de compartilhamento simuladas), visualização emergencial pública sem login com QR/link demonstrativo e aviso persistente de conteúdo fictício, além de roteiro de validação para o facilitador. Nada é persistido, enviado ou publicado com dados reais.

Ações concluídas: **11 de 11** (`actions.md`), incluindo a publicação no GitHub Pages independente (`https://diasbandeira.github.io/ficha-emergencia-diabetes-demo/`, workflow `pages.yml`, build e deploy verdes, URL respondendo HTTP 200).

## Impacto por artefato da extração

| Artefato | Seção | Tipo de impacto | Delta |
|----------|-------|-----------------|-------|
| `_reversa_sdd/prd.md` | Escopo (in) / Critérios de aceite | componente-novo | A entrega materializa o escopo descrito (jornada de gestão, visualização emergencial, QR demonstrativo, validação e publicação independente) e as specs em `sdd/` passam a ter implementação correspondente. |
| `_reversa_sdd/sdd/gestao-demonstrativa-da-ficha.md` | 6. Requisitos Funcionais | componente-novo | RF-01..RF-07 implementados em `src/pages/EmergencyDemo.tsx`, `src/data/emergencyDemoData.ts` e `src/App.tsx` (dados sintéticos, visibilidade por bloco, alteração/retirada simuladas, aviso persistente). |
| `_reversa_sdd/sdd/visualizacao-emergencial-e-qr-code.md` | 6. Requisitos Funcionais | componente-novo | RF-01..RF-08 implementados em `src/components/emergency-demo/EmergencyView.tsx` e `src/navigation/hashRoute.ts` (sem login, só blocos públicos, QR/URL demonstrativo sem dados pessoais, estado ativo/retirado, aviso de indisponibilidade). |
| `_reversa_sdd/sdd/validacao-e-publicacao-independente.md` | 6. Requisitos Funcionais | componente-novo | RF-01..RF-08 implementados em `src/components/emergency-demo/FacilitatorChecklist.tsx`, `vite.config.ts` e `.github/workflows/pages.yml` (roteiro sem identificação de participantes, build/workflow próprios, publicação isolada do site atual). |

## Regras sob vigilância

Nenhum watch item de regressão nesta rodada (cenário greenfield). Ver `_reversa_forward/001-validar-prototipo-emergencia/regression-watch.md#Observações` para os RFs implementados, que ganham peso de regressão após uma futura extração confirmá-los como 🟢.

## Fontes

- `_reversa_forward/001-validar-prototipo-emergencia/legacy-impact.md`
- `_reversa_forward/001-validar-prototipo-emergencia/regression-watch.md`
- `_reversa_forward/001-validar-prototipo-emergencia/requirements.md`
- `_reversa_forward/001-validar-prototipo-emergencia/actions.md`
- `_reversa_forward/001-validar-prototipo-emergencia/progress.jsonl`
- `_reversa_sdd/prd.md`
- `_reversa_sdd/sdd/gestao-demonstrativa-da-ficha.md`
- `_reversa_sdd/sdd/visualizacao-emergencial-e-qr-code.md`
- `_reversa_sdd/sdd/validacao-e-publicacao-independente.md`
