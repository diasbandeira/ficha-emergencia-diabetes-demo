import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useAuth } from "../auth/AuthProvider";
import {
  fetchMyCard,
  publicCardUrl,
  revokePublicLink,
  rotatePublicLink,
} from "../services/cardService";
import type { Card } from "../types/card";

export default function CardQr() {
  const { session, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [card, setCard] = useState<Card | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!session) {
      return;
    }
    let active = true;
    fetchMyCard()
      .then((data) => {
        if (active) {
          setCard(data);
        }
      })
      .catch((cause) => {
        if (active) {
          setError(cause instanceof Error ? cause.message : "Falha ao carregar o QR.");
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [session]);

  const url = card?.publicToken ? publicCardUrl(card.publicToken) : "";

  async function handleGenerate() {
    setBusy(true);
    setError("");
    setFeedback("");
    try {
      const token = await rotatePublicLink();
      setCard((current) =>
        current
          ? { ...current, publicToken: token, publicStatus: "active" }
          : current,
      );
      setFeedback(
        "Novo link gerado. Qualquer QR anterior deixou de funcionar.",
      );
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível gerar o link.");
    } finally {
      setBusy(false);
    }
  }

  async function handleRevoke() {
    setBusy(true);
    setError("");
    setFeedback("");
    try {
      await revokePublicLink();
      setCard((current) =>
        current ? { ...current, publicToken: null, publicStatus: "revoked" } : current,
      );
      setFeedback("Link revogado. O QR antigo não abre mais a ficha.");
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Não foi possível revogar o link.",
      );
    } finally {
      setBusy(false);
    }
  }

  function handleDownload() {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) {
      setError("O QR ainda não foi renderizado.");
      return;
    }
    const link = document.createElement("a");
    link.download = "ficha-emergencia-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  async function handleCopy() {
    if (!url) {
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setFeedback("Link copiado.");
    } catch {
      setError("Não foi possível copiar. Selecione o endereço manualmente.");
    }
  }

  if (authLoading || loading) {
    return (
      <section className="content-panel setup-panel" aria-live="polite">
        <p>Carregando o QR...</p>
      </section>
    );
  }

  if (!session) {
    return (
      <section className="content-panel setup-panel">
        <h1>Entre para ver o QR</h1>
        <p className="button-row">
          <a className="button button--primary" href="#/login">
            Entrar
          </a>
        </p>
      </section>
    );
  }

  if (!card) {
    return (
      <section className="content-panel setup-panel">
        <h1>Salve a ficha primeiro</h1>
        <p>O QR só pode ser gerado depois que a ficha existe.</p>
        <p className="button-row">
          <a className="button button--primary" href="#/app">
            Ir para minha ficha
          </a>
        </p>
      </section>
    );
  }

  return (
    <div className="management-page">
      <div className="page-heading">
        <div>
          <h1>QR da ficha pública</h1>
          <p className="page-heading__summary">
            O QR leva só ao endereço público. Nenhum dado de saúde vai no código.
          </p>
        </div>
        <span
          className={
            url
              ? "state-pill state-pill--active"
              : "state-pill state-pill--withdrawn"
          }
        >
          {url ? "Compartilhamento ativo" : "Sem link público"}
        </span>
      </div>

      <div className="management-layout">
        <section className="content-panel qr-panel" aria-labelledby="qr-title">
          <h2 id="qr-title">Código</h2>
          {url ? (
            <>
              <div className="qr-frame" ref={qrRef}>
                <QRCodeCanvas
                  value={url}
                  size={196}
                  level="M"
                  includeMargin
                  aria-label="QR da página pública da ficha"
                />
              </div>
              <p className="qr-url">{url}</p>
              <div className="button-row">
                <button className="button button--secondary" onClick={handleDownload}>
                  Baixar imagem
                </button>
                <button className="button button--text" onClick={handleCopy}>
                  Copiar link
                </button>
              </div>
            </>
          ) : (
            <p>
              Gere o link público para produzir o QR. O endereço anterior, se
              existir, já não serve.
            </p>
          )}
        </section>

        <aside className="content-panel action-panel" aria-labelledby="qr-actions-title">
          <h2 id="qr-actions-title">Controle do link</h2>
          <p className="action-panel__copy">
            Revogar invalida o QR atual. Gerar de novo cria outro endereço.
          </p>
          <button
            className="button button--primary"
            onClick={handleGenerate}
            disabled={busy}
          >
            {card.publicToken ? "Gerar novo link e QR" : "Gerar link e QR"}
          </button>
          <button
            className="button button--secondary"
            onClick={handleRevoke}
            disabled={busy || !card.publicToken}
          >
            Revogar link
          </button>
          <a className="text-link" href="#/app">
            Voltar para a ficha
          </a>
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
        </aside>
      </div>
    </div>
  );
}
