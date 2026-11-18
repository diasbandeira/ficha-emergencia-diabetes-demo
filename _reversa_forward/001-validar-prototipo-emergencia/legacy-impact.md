# Legacy Impact: Protótipo navegável para validação de ficha de emergência

> Identificador da feature: `001-validar-prototipo-emergencia`
> Data: `2026-11-18`
> Cenário: **greenfield**
> Feature greenfield, sem legado pré-existente. Âncora: `prd.md` + specs SDD em `_reversa_sdd/sdd/`.
> Política de edição no momento da execução: `allowLegacyEdits: true`, `allowedPaths: []` (liberação irrestrita).

Nenhum arquivo de um sistema legado foi criado, alterado ou removido por esta feature. A tabela abaixo mapeia cada arquivo entregue ao componente correspondente das specs SDD, usando o tipo `componente-novo` para todos.

## Arquivos afetados

| Arquivo afetado | Componente | Tipo | Severidade | Justificativa |
|-----------------|------------|------|------------|---------------|
| `src/data/emergencyDemoData.ts` | Gestão demonstrativa da ficha | componente-novo | MEDIUM | Modelo e dados sintéticos de demonstração, com rótulos de visibilidade por bloco (RF-01/RF-02 da spec de gestão). |
| `src/pages/EmergencyDemo.tsx` | Gestão demonstrativa da ficha | componente-novo | MEDIUM | Jornada de gestão demonstrativa: blocos da ficha, visibilidade pública/privada, alteração simulada e retirada de compartilhamento. |
| `src/components/emergency-demo/EmergencyView.tsx` | Visualização emergencial e QR Code | componente-novo | MEDIUM | Visualização pública de demonstração, sem login, com aviso persistente de conteúdo fictício e QR/link demonstrativo. |
| `src/navigation/hashRoute.ts` | Visualização emergencial e QR Code | componente-novo | LOW | Roteamento por hash (`#/` gestão, `#/emergency` visualização) compatível com hospedagem estática. |
| `src/components/emergency-demo/FacilitatorChecklist.tsx` | Validação e publicação independente | componente-novo | LOW | Roteiro de validação e registro de observações sem coletar dados pessoais. |
| `src/App.tsx` | Gestão demonstrativa da ficha / Visualização emergencial | componente-novo | MEDIUM | Orquestra rotas, estado de sessão simulado (contato, compartilhamento, feedback) e aviso de demonstração persistente. |
| `src/main.tsx` | Aplicação (bootstrap) | componente-novo | LOW | Ponto de entrada React que monta a SPA. |
| `src/styles.css` | Aplicação (design/UI) | componente-novo | LOW | Estilos da demonstração, incluindo avisos persistentes de conteúdo fictício. |
| `index.html` | Aplicação (shell estático) | componente-novo | LOW | Documento HTML base com meta de descrição que declara a demonstração sintética. |
| `vite.config.ts` | Validação e publicação independente | componente-novo | MEDIUM | Configura `base` e build estático para publicação no GitHub Pages próprio. |
| `.github/workflows/pages.yml` | Validação e publicação independente | componente-novo | MEDIUM | Workflow de build e deploy exclusivo do repositório novo (Pages com fonte GitHub Actions). |
| `public/favicon.svg`, `package.json`, `package-lock.json`, `tsconfig.json` | Aplicação (infraestrutura) | componente-novo | LOW | Scaffold estático, dependências e configuração de TypeScript/Vite. |

## Diff conceitual por componente

- **Gestão demonstrativa da ficha:** nova jornada de gestão baseada apenas em opções predefinidas (RF-01..RF-04). Cada bloco recebe rótulo de visibilidade (público/privado), a alteração é simulada a partir de escolhas fixas e a retirada de compartilhamento produz um estado de sessão que explica não haver revogação real. Nada é persistido nem enviado.
- **Visualização emergencial e QR Code:** nova página pública aberta sem login (RF-01..RF-08), marcada persistentemente como demonstração, exibindo somente blocos classificados como públicos. O QR/link aponta para a URL genérica da visualização e não carrega dados pessoais; quando a sessão simulada retira o compartilhamento, a visualização reflete o estado retirado na navegação interna.
- **Validação e publicação independente:** novo roteiro de validação (RF-01..RF-02) para o facilitador registrar conclusão, dúvidas e bloqueios sem identificar participantes. A publicação usa build estático e workflow próprios (RF-03..RF-08), isolados do site atual, com validação de disponibilidade e publicação em repositório/Pages separados.

## Preservadas

Nenhuma. Cenário greenfield: não existe `domain.md` de legado com regras 🟢 a preservar.

## Modificadas

Nenhuma. Cenário greenfield: não existem regras 🟢 de legado alteradas ou removidas.

## Fontes

- `_reversa_forward/001-validar-prototipo-emergencia/requirements.md`
- `_reversa_forward/001-validar-prototipo-emergencia/actions.md`
- `_reversa_sdd/prd.md`
- `_reversa_sdd/sdd/gestao-demonstrativa-da-ficha.md`
- `_reversa_sdd/sdd/visualizacao-emergencial-e-qr-code.md`
- `_reversa_sdd/sdd/validacao-e-publicacao-independente.md`
