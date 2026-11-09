import {
  facilitatorTasks,
  observationCategories,
  type ObservationCategory,
} from "../../data/emergencyDemoData";

type FacilitatorChecklistProps = {
  observations: Record<string, ObservationCategory>;
  onObservationChange: (task: string, category: ObservationCategory) => void;
  onClearObservations: () => void;
};

export default function FacilitatorChecklist({
  observations,
  onObservationChange,
  onClearObservations,
}: FacilitatorChecklistProps) {
  const recordedCount = Object.keys(observations).length;

  return (
    <section className="content-panel checklist-panel" aria-labelledby="checklist-title">
      <div className="section-heading">
        <div>
          <h2 id="checklist-title">Observações do facilitador</h2>
          <p>
            Classifique cada tarefa sem registrar nomes, contatos ou texto livre.
          </p>
        </div>
        <span className="route-label">Temporário nesta sessão</span>
      </div>

      <div className="checklist-items">
        {facilitatorTasks.map((task, index) => (
          <fieldset className="checklist-item" key={task}>
            <legend>
              <span className="checklist-item__number" aria-hidden="true">
                {index + 1}
              </span>
              {task}
            </legend>
            <div className="observation-options">
              {observationCategories.map((category) => (
                <label
                  className={
                    observations[task] === category.id
                      ? "observation-option is-selected"
                      : "observation-option"
                  }
                  key={category.id}
                >
                  <input
                    type="radio"
                    name={`observation-${index}`}
                    value={category.id}
                    checked={observations[task] === category.id}
                    onChange={() => onObservationChange(task, category.id)}
                  />
                  <span>{category.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="checklist-summary">
        <p role="status" aria-live="polite">
          {recordedCount} de {facilitatorTasks.length} tarefas classificadas.
          Nenhum registro é salvo; recarregar apaga as seleções.
        </p>
        <button
          className="button button--text checklist-reset"
          onClick={onClearObservations}
          disabled={recordedCount === 0}
        >
          Limpar observações
        </button>
      </div>
    </section>
  );
}
