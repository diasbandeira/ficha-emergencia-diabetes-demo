import { useEffect, useState } from "react";
import {
  demoBlocks,
  demoContactOptions,
  type DemoContactOption,
  type ObservationCategory,
} from "../data/emergencyDemoData";
import FacilitatorChecklist from "../components/emergency-demo/FacilitatorChecklist";

type EmergencyDemoProps = {
  contact: DemoContactOption;
  onContactChange: (contact: DemoContactOption) => void;
  isShareActive: boolean;
  onShareChange: (enabled: boolean) => void;
  onReset: () => void;
  feedback: string;
  onFeedbackChange: (message: string) => void;
  observations: Record<string, ObservationCategory>;
  onObservationChange: (task: string, category: ObservationCategory) => void;
  onClearObservations: () => void;
};

export default function EmergencyDemo({
  contact,
  onContactChange,
  isShareActive,
  onShareChange,
  onReset,
  feedback,
  onFeedbackChange,
  observations,
  onObservationChange,
  onClearObservations,
}: EmergencyDemoProps) {
  const [selectedContactId, setSelectedContactId] = useState(contact.id);

  useEffect(() => {
    setSelectedContactId(contact.id);
  }, [contact.id]);

  const blocks = demoBlocks.map((block) =>
    block.id === "support-contact"
      ? { ...block, value: contact.publicValue }
      : block,
  );

  function applyContactUpdate() {
    const nextContact = demoContactOptions.find(
      (option) => option.id === selectedContactId,
    );

    if (!nextContact) {
      onFeedbackChange(
        "Não foi possível aplicar essa opção. Escolha um contato de demonstração da lista.",
      );
      return;
    }

    onContactChange(nextContact);
    onFeedbackChange(
      "Atualização simulada nesta sessão. Nenhuma ficha real foi alterada.",
    );
  }

  function withdrawSharing() {
    if (!isShareActive) {
      return;
    }

    onShareChange(false);
    onFeedbackChange(
      "Retirada simulada nesta sessão. Nenhum acesso externo foi revogado.",
    );
  }

  return (
    <div className="management-page">
      <div className="page-heading">
        <div>
          <h1>Revise o que seria compartilhado</h1>
          <p className="page-heading__summary">
            As opções abaixo não alteram dados reais e desaparecem ao recarregar
            esta página.
          </p>
        </div>
        <span
          className={
            isShareActive
              ? "state-pill state-pill--active"
              : "state-pill state-pill--withdrawn"
          }
        >
          {isShareActive ? "Compartilhamento simulado: ativo" : "Retirado nesta sessão"}
        </span>
      </div>

      <div className="management-layout">
        <section className="content-panel profile-panel" aria-labelledby="profile-title">
          <div className="section-heading">
            <div>
              <h2 id="profile-title">Ficha sintética</h2>
              <p>Confira o rótulo antes de abrir a visualização pública.</p>
            </div>
            <span className="route-label">Perfil de demonstração</span>
          </div>

          <div className="visibility-legend" aria-label="Legenda de visibilidade">
            <span>
              <span className="legend-dot legend-dot--public" aria-hidden="true" />
              Público na demonstração
            </span>
            <span>
              <span className="legend-dot legend-dot--private" aria-hidden="true" />
              Privado; não aparece na prévia
            </span>
          </div>

          <dl className="profile-list">
            {blocks.map((block) => (
              <div className="profile-row" key={block.id}>
                <dt>{block.label}</dt>
                <dd>{block.value}</dd>
                <span
                  className={
                    block.visibility === "public"
                      ? "visibility-label visibility-label--public"
                      : "visibility-label visibility-label--private"
                  }
                >
                  {block.visibility === "public"
                    ? "Público"
                    : "Privado"}
                </span>
              </div>
            ))}
          </dl>

          <p className="panel-footnote">
            Os valores são exemplos inventados. Não há telefone, endereço ou
            orientação clínica nesta ficha.
          </p>
        </section>

        <aside className="content-panel action-panel" aria-labelledby="actions-title">
          <div className="section-heading section-heading--compact">
            <div>
              <h2 id="actions-title">Simule uma alteração</h2>
              <p>Escolha uma opção pronta; não digite dados pessoais.</p>
            </div>
          </div>

          <label className="field-label" htmlFor="contact-option">
            Contato público de exemplo
          </label>
          <select
            id="contact-option"
            value={selectedContactId}
            onChange={(event) => setSelectedContactId(event.target.value)}
          >
            {demoContactOptions.map((option) => (
              <option value={option.id} key={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          <button className="button button--primary" onClick={applyContactUpdate}>
            Aplicar atualização simulada
          </button>

          {feedback && (
            <p className="feedback-message" role="status" aria-live="polite">
              {feedback}
            </p>
          )}

          <div className="action-divider" />
          <h3>Compartilhamento desta sessão</h3>
          <p className="action-panel__copy">
            Retirar é apenas uma simulação local. O QR e páginas externas não
            são controlados por esta ação.
          </p>
          <button
            className="button button--secondary"
            onClick={withdrawSharing}
            disabled={!isShareActive}
          >
            {isShareActive
              ? "Simular retirada do compartilhamento"
              : "Compartilhamento já retirado"}
          </button>
          <button className="button button--text" onClick={onReset}>
            Reiniciar a demonstração
          </button>
        </aside>
      </div>
      <FacilitatorChecklist
        observations={observations}
        onObservationChange={onObservationChange}
        onClearObservations={onClearObservations}
      />
    </div>
  );
}
