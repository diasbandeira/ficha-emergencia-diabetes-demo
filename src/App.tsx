import { useEffect, useState } from "react";
import EmergencyDemo from "./pages/EmergencyDemo";
import EmergencyView from "./components/emergency-demo/EmergencyView";
import { getDemoRoute, getEmergencyUrl } from "./navigation/hashRoute";
import {
  demoContactOptions,
  type ObservationCategory,
} from "./data/emergencyDemoData";

export default function App() {
  const [route, setRoute] = useState(() => getDemoRoute(window.location.hash));
  const [contact, setContact] = useState(demoContactOptions[0]);
  const [sharingEnabled, setSharingEnabled] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [observations, setObservations] = useState<
    Record<string, ObservationCategory>
  >({});

  useEffect(() => {
    const updateRoute = () => setRoute(getDemoRoute(window.location.hash));
    window.addEventListener("hashchange", updateRoute);
    return () => window.removeEventListener("hashchange", updateRoute);
  }, []);

  const emergencyUrl = getEmergencyUrl(
    window.location.href,
    import.meta.env.BASE_URL,
  );
  const isEmergencyRoute = route === "emergency";

  function resetDemo() {
    setContact(demoContactOptions[0]);
    setSharingEnabled(true);
    setObservations({});
    setFeedback("Demonstração reiniciada. Nenhuma informação foi salva.");
  }

  return (
    <div className="app-shell">
      <div className="demo-banner" role="status">
        <span className="demo-banner__marker" aria-hidden="true" />
        <strong>Demonstração</strong>
        <span>
          Conteúdo fictício. Não é uma ficha real nem um serviço de emergência.
        </span>
      </div>

      <header className="site-header">
        <a className="brand" href="#/" aria-label="Ir para a gestão da demonstração">
          <svg
            className="brand__route-mark"
            viewBox="0 0 36 36"
            aria-hidden="true"
          >
            <path d="M8 7v21h20" />
            <circle cx="8" cy="7" r="4" />
            <circle cx="8" cy="18" r="3" />
            <circle cx="28" cy="28" r="4" />
          </svg>
          <span>
            <strong>Ficha de emergência</strong>
            <small>Diabetes · ambiente de validação</small>
          </span>
        </a>
        <nav className="main-nav" aria-label="Áreas da demonstração">
          <a
            href="#/"
            aria-current={!isEmergencyRoute ? "page" : undefined}
            className={!isEmergencyRoute ? "main-nav__link is-active" : "main-nav__link"}
          >
            Gestão
          </a>
          <a
            href="#/emergency"
            aria-current={isEmergencyRoute ? "page" : undefined}
            className={isEmergencyRoute ? "main-nav__link is-active" : "main-nav__link"}
          >
            Visualização pública
          </a>
        </nav>
      </header>

      <main className="page-container">
        <nav className="route-nav" aria-label="Etapas da demonstração">
          <a href="#/" className={!isEmergencyRoute ? "route-stop is-current" : "route-stop"}>
            <span className="route-stop__dot" aria-hidden="true" />
            <span>Ficha</span>
          </a>
          <span className="route-nav__line" aria-hidden="true" />
          <span className="route-stop route-stop--static">
            <span className="route-stop__dot" aria-hidden="true" />
            <span>Compartilhamento</span>
          </span>
          <span className="route-nav__line" aria-hidden="true" />
          <a
            href="#/emergency"
            className={isEmergencyRoute ? "route-stop is-current" : "route-stop"}
          >
            <span className="route-stop__dot" aria-hidden="true" />
            <span>Prévia pública</span>
          </a>
        </nav>

        {isEmergencyRoute ? (
          <EmergencyView
            contact={contact}
            isShareActive={sharingEnabled}
            emergencyUrl={emergencyUrl}
          />
        ) : (
          <EmergencyDemo
            contact={contact}
            onContactChange={setContact}
            isShareActive={sharingEnabled}
            onShareChange={setSharingEnabled}
            onReset={resetDemo}
            feedback={feedback}
            onFeedbackChange={setFeedback}
            observations={observations}
            onObservationChange={(task, category) =>
              setObservations((current) => ({ ...current, [task]: category }))
            }
            onClearObservations={() => setObservations({})}
          />
        )}
      </main>

      <footer className="site-footer">
        Esta demonstração não oferece diagnóstico, tratamento nem atendimento.
        Não use este conteúdo para decisões clínicas.
      </footer>
    </div>
  );
}
