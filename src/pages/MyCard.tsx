import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import ConsentGate from "../components/ConsentGate";
import {
  deleteMyAccount,
  fetchConsent,
  fetchMyCard,
  saveCard,
} from "../services/cardService";
import {
  blockLabels,
  blockOrder,
  defaultBlocks,
  DISPLAY_NAME_MAX,
  type BlockKey,
  type CardBlock,
  type Consent,
  type Visibility,
} from "../types/card";

export default function MyCard() {
  const { session, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [consent, setConsent] = useState<Consent>(null);
  const [displayName, setDisplayName] = useState("");
  const [blocks, setBlocks] = useState<CardBlock[]>(defaultBlocks());
  const [hasCard, setHasCard] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session) {
      return;
    }
    let active = true;
    (async () => {
      try {
        const [card, currentConsent] = await Promise.all([
          fetchMyCard(),
          fetchConsent(),
        ]);
        if (!active) {
          return;
        }
        setConsent(currentConsent);
        if (card) {
          setHasCard(true);
          setDisplayName(card.displayName);
          setBlocks(card.blocks);
        }
      } catch (cause) {
        if (active) {
          setError(
            cause instanceof Error ? cause.message : "Falha ao carregar a ficha.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [session]);

  function updateBlock(key: BlockKey, patch: Partial<CardBlock>) {
    setBlocks((current) =>
      current.map((block) => (block.key === key ? { ...block, ...patch } : block)),
    );
  }

  async function handleSave() {
    if (!displayName.trim()) {
      setError("Informe o nome de exibição.");
      return;
    }
    setSaving(true);
    setError("");
    setFeedback("");
    try {
      await saveCard({ displayName, blocks });
      setHasCard(true);
      setFeedback("Ficha salva.");
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Não foi possível salvar a ficha.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Excluir a conta remove a ficha, o link público e o consentimento. Continuar?",
    );
    if (!confirmed) {
      return;
    }
    try {
      await deleteMyAccount();
      setFeedback("Conta excluída nesta POC.");
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Não foi possível excluir a conta.",
      );
    }
  }

  if (authLoading || loading) {
    return (
      <section className="content-panel setup-panel" aria-live="polite">
        <p>Carregando sua ficha...</p>
      </section>
    );
  }

  if (!session) {
    return (
      <section className="content-panel setup-panel">
        <h1>Entre para editar sua ficha</h1>
        <p className="button-row">
          <a className="button button--primary" href="#/login">
            Entrar
          </a>
        </p>
      </section>
    );
  }

  if (!consent) {
    return (
      <ConsentGate
        onAccepted={(accepted) => {
          setConsent(accepted);
          setError("");
          setFeedback("Consentimento registrado.");
        }}
      />
    );
  }

  return (
    <div className="management-page">
      <div className="page-heading">
        <div>
          <h1>Minha ficha de emergência</h1>
          <p className="page-heading__summary">
            Uma ficha por conta. Marque cada bloco como público ou privado e gere
            o QR da sua página pública.
          </p>
        </div>
        <a className="button button--primary" href="#/app/qr">
          Ver QR
        </a>
      </div>

      <section className="content-panel" aria-labelledby="editor-title">
        <div className="section-heading">
          <div>
            <h2 id="editor-title">Conteúdo</h2>
            <p>Texto livre por bloco. Deixe vazio o que não quiser exibir.</p>
          </div>
          {hasCard && <span className="route-label">Ficha existente</span>}
        </div>

        <label className="field-label" htmlFor="display-name">
          Nome de exibição na página pública
        </label>
        <input
          id="display-name"
          className="text-input"
          type="text"
          maxLength={DISPLAY_NAME_MAX}
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          placeholder="Nome completo, primeiro nome ou apelido"
        />

        <div className="block-editor">
          {blockOrder.map((key) => {
            const block = blocks.find((item) => item.key === key);
            if (!block) {
              return null;
            }
            return (
              <div className="block-editor__row" key={key}>
                <div className="block-editor__head">
                  <label className="field-label" htmlFor={`block-${key}`}>
                    {blockLabels[key]}
                  </label>
                  <select
                    aria-label={`Visibilidade de ${blockLabels[key]}`}
                    value={block.visibility}
                    onChange={(event) =>
                      updateBlock(key, {
                        visibility: event.target.value as Visibility,
                      })
                    }
                  >
                    <option value="public">Público</option>
                    <option value="private">Privado</option>
                  </select>
                </div>
                <textarea
                  id={`block-${key}`}
                  className="text-input"
                  rows={2}
                  value={block.payload.text}
                  onChange={(event) =>
                    updateBlock(key, { payload: { text: event.target.value } })
                  }
                  placeholder="Exemplo de demonstração; não use instrução clínica."
                />
              </div>
            );
          })}
        </div>

        {error && (
          <p className="feedback-message feedback-message--error" role="alert">
            {error}
          </p>
        )}
        {feedback && (
          <p className="feedback-message" role="status" aria-live="polite">
            {feedback}
          </p>
        )}

        <div className="button-row">
          <button
            className="button button--primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Salvando..." : "Salvar ficha"}
          </button>
          <a className="button button--secondary" href="#/app/qr">
            Gerar ou revogar QR
          </a>
        </div>
      </section>

      <section className="content-panel danger-panel" aria-labelledby="danger-title">
        <h2 id="danger-title">Excluir conta</h2>
        <p>
          Remove ficha, blocos, consentimento e link público. O QR antigo deixa de
          abrir. A identidade de login é removida pela rotina do operador.
        </p>
        <button className="button button--danger" onClick={handleDelete}>
          Excluir minha conta
        </button>
      </section>
    </div>
  );
}
