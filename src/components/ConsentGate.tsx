import { useState } from "react";
import { recordConsent } from "../services/cardService";
import { TERMS_VERSION, type Consent } from "../types/card";

type ConsentGateProps = {
  onAccepted: (consent: Consent) => void;
};

export default function ConsentGate({ onAccepted }: ConsentGateProps) {
  const [checked, setChecked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function accept() {
    if (!checked || busy) {
      return;
    }
    setBusy(true);
    setError("");
    try {
      const consent = await recordConsent(TERMS_VERSION);
      onAccepted(consent);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Não foi possível registrar o consentimento.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="content-panel consent-panel" aria-labelledby="consent-title">
      <h2 id="consent-title">Consentimento para a POC</h2>
      <p>
        Esta é uma prova de conceito. Os dados que você informar ficam visíveis
        apenas na sua conta e nos blocos que você marcar como públicos. O QR leva
        à página pública da sua ficha.
      </p>
      <ul className="consent-list">
        <li>Você pode revogar o link e excluir a conta quando quiser.</li>
        <li>Nenhum dado de saúde vai no QR, na URL ou nos registros de acesso.</li>
        <li>O conteúdo não substitui atendimento médico nem serviço de emergência.</li>
      </ul>
      <label className="consent-check">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
        />
        <span>
          Li e aceito o termo da versão <strong>{TERMS_VERSION}</strong> para usar
          meus dados nesta POC.
        </span>
      </label>
      {error && (
        <p className="feedback-message feedback-message--error" role="alert">
          {error}
        </p>
      )}
      <button
        className="button button--primary"
        onClick={accept}
        disabled={!checked || busy}
      >
        {busy ? "Registrando..." : "Aceitar e continuar"}
      </button>
    </section>
  );
}
