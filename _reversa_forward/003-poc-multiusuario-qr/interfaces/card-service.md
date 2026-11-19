# Interface: serviço de ficha

> Identificador: `003-poc-multiusuario-qr`
> Data: `2026-11-18`
> Tipo: contrato lógico HTTP (mapeado para o backend gerenciado escolhido em D-01)

Contrato independente de provedor. Os nomes de operação valem como referência; a implementação pode usar funções, RPC ou endpoints equivalentes.

## Convenções

- Transporte: HTTPS.
- Autenticação: sessão do login social; operações marcadas "anônima" não exigem sessão.
- Formato: JSON.
- Erros: código estável + mensagem legível; nunca devolver conteúdo de saúde em erro.
- Timeout sugerido no cliente: 10 s; falha exibe retry.
- Nenhuma resposta inclui `email`, `account_id` ou blocos privados na operação pública.

## Login social

- **Operação:** `signInWithGoogle`
- **Fluxo:** redirecionamento OAuth com escopos `openid`, `email`, `profile`.
- **Sucesso:** sessão criada; retorno à área autenticada.
- **Erros:** `auth_cancelled`, `auth_failed`.
- **Observação:** em status de teste, o provedor pode exibir aviso de app não verificado.

## Obter minha ficha

- **Operação:** `getMyCard` (autenticada)
- **Request:** vazio.
- **Response 200:**
  ```json
  {
    "card": {
      "displayName": "Ana",
      "updatedAt": "2026-11-18T22:00:00Z",
      "publicStatus": "active",
      "blocks": [
        { "key": "conditions", "visibility": "public", "payload": {} }
      ]
    },
    "consent": { "termsVersion": "2026-11", "acceptedAt": "2026-11-18T21:00:00Z" }
  }
  ```
- **Response 404:** conta ainda sem ficha.
- **Erros:** `unauthorized`.

## Registrar consentimento

- **Operação:** `recordConsent` (autenticada)
- **Request:** `{ "termsVersion": "2026-11" }`
- **Response 201:** `{ "acceptedAt": "..." }`
- **Idempotência:** repetir a mesma versão devolve o aceite existente.
- **Erros:** `invalid_terms_version`.

## Salvar minha ficha

- **Operação:** `saveCard` (autenticada)
- **Request:**
  ```json
  {
    "displayName": "Ana",
    "blocks": [
      { "key": "conditions", "visibility": "public", "payload": {} },
      { "key": "insulins", "visibility": "private", "payload": {} }
    ]
  }
  ```
- **Response 200:** ficha atualizada com `updatedAt`.
- **Regras:** exige consentimento vigente; `displayName` obrigatório; `blocks[].visibility` em `public|private`.
- **Erros:** `consent_required`, `invalid_block`, `unauthorized`.
- **Idempotência:** a última gravação vence; conflito de aba é resolvido por `updatedAt`.

## Gerar ou rotacionar link público

- **Operação:** `rotatePublicLink` (autenticada)
- **Request:** vazio.
- **Response 200:** `{ "token": "<opaco>", "url": "https://<origem>/#/p/<token>", "rotatedAt": "..." }`
- **Efeito:** invalida o token anterior.
- **Idempotência:** cada chamada gera um token novo (não idempotente por design).
- **Erros:** `consent_required`, `unauthorized`.

## Revogar link público

- **Operação:** `revokePublicLink` (autenticada)
- **Request:** vazio.
- **Response 200:** `{ "publicStatus": "revoked" }`
- **Efeito:** remove o token; o endereço anterior deixa de resolver.
- **Idempotência:** repetir devolve `revoked`.

## Ler ficha pública

- **Operação:** `getPublicCard` (**anônima**)
- **Request:** `{ "token": "<opaco>" }`
- **Response 200:**
  ```json
  {
    "displayName": "Ana",
    "updatedAt": "2026-11-18T22:00:00Z",
    "blocks": [
      { "key": "conditions", "payload": {} }
    ]
  }
  ```
- **Regras:** apenas blocos `public`; nunca devolve `email`, `account_id`, token ou blocos privados.
- **Response 404:** token inexistente ou revogado.
- **Erros:** `invalid_token`.
- **Observação:** sem autenticação, é o alvo de abuso; monitorar consumo (limites ficam para a fase seguinte).

## Excluir minha conta

- **Operação:** `deleteMyAccount` (autenticada)
- **Request:** `{ "confirm": true }`
- **Response 202:** `{ "status": "deletion_scheduled" }` ou `200` com conclusão imediata.
- **Efeito:** remove ficha, blocos, consentimento e token; a identidade de login é removida pela rotina de servidor/operador (D-08).
- **Erros:** `unauthorized`.
- **Idempotência:** repetir após exclusão devolve `unauthorized`.

## Tabela de erros

| Código | HTTP | Quando |
|--------|------|--------|
| `unauthorized` | 401 | Sem sessão válida em operação autenticada |
| `consent_required` | 409 | Tentativa de gravar ficha sem consentimento vigente |
| `invalid_block` | 422 | Bloco com chave ou visibilidade inválida |
| `invalid_token` | 400 | Token malformado |
| `not_found` | 404 | Ficha pública inexistente ou revogada |
| `rate_limited` | 429 | Reservado para a fase seguinte (não usado na POC) |
