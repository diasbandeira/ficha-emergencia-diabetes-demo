import { useEffect, useState } from "react";
import EmergencyDemo from "./pages/EmergencyDemo";
import EmergencyView from "./components/emergency-demo/EmergencyView";
import Login from "./pages/Login";
import MyCard from "./pages/MyCard";
import CardQr from "./pages/CardQr";
import PublicCard from "./pages/PublicCard";
import { AuthProvider, useAuth } from "./auth/AuthProvider";
import {
  getEmergencyUrl,
  parseHash,
  type AppRoute,
} from "./navigation/hashRoute";
import {
  demoContactOptions,
  type ObservationCategory,
} from "./data/emergencyDemoData";

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}

function AppShell() {
  const [route, setRoute] = useState<AppRoute>(() =>
    parseHash(window.location.hash),
  );
  const [contact, setContact] = useState(demoContactOptions[0]);
  const [sharingEnabled, setSharingEnabled] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [observations, setObservations] = useState<
    Record<string, ObservationCategory>
  >({});
  const { session, loading, signOut } = useAuth();

  useEffect(() => {
    const updateRoute = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", updateRoute);
    return () => window.removeEventListener("hashchange", updateRoute);
  }, []);

  useEffect(() => {
    if (!session) {
      return;
    }
    const pendingRedirect = sessionStorage.getItem("poc:oauth-pending");
    if (
      pendingRedirect ||
      /(access_token|refresh_token|error_description)=/.test(window.location.hash)
    ) {
      sessionStorage.removeItem("poc:oauth-pending");
      window.history.replaceState(null, "", "#/app");
      setRoute({ name: "app" });
    }
  }, [session]);

  const emergencyUrl = getEmergencyUrl(
    window.location.href,
    import.meta.env.BASE_URL,
  );
  const isDemoRoute = route.name === "management" || route.name === "emergency";
  const isCardArea = route.name === "app" || route.name === "qr";
  const isPublic = route.name === "public";

  function resetDemo() {
    setContact(demoContactOptions[0]);
    setSharingEnabled(true);
    setObservations({});
    setFeedback("Demonstração reiniciada. Nenhuma informação foi salva.");
  }

  function renderCardArea(page: "app" | "qr") {
    if (loading) {
      return (
        <section className="content-panel setup-panel" aria-live="polite">
          <p>Carregando sessão...</p>
        </section>
      );
    }
    if (!session) {
      return <Login />;
    }
    return page === "app" ? <MyCard /> : <CardQr />;
  }

  return (
    <div className="app-shell">
      <div className="demo-banner" role="status">
        <span className="demo-banner__marker" aria-hidden="true" />
        <strong>POC</strong>
        <span>
          Prova de conceito. Conteúdo fictício ou de teste. Não é um serviço de
          emergência.
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
            <small>Diabetes · POC multiusuário</small>
          </span>
        </a>
        <nav className="main-nav" aria-label="Áreas do projeto">
          <a
            href="#/"
            aria-current={route.name === "management" ? "page" : undefined}
            className={
              route.name === "management"
                ? "main-nav__link is-active"
                : "main-nav__link"
            }
          >
            Gestão
          </a>
          <a
            href="#/emergency"
            aria-current={route.name === "emergency" ? "page" : undefined}
            className={
              route.name === "emergency"
                ? "main-nav__link is-active"
                : "main-nav__link"
            }
          >
            Visualização pública
          </a>
          {session ? (
            <>
              <a
                href="#/app"
                aria-current={isCardArea ? "page" : undefined}
                className={
                  isCardArea ? "main-nav__link is-active" : "main-nav__link"
                }
              >
                Minha ficha
              </a>
              <button
                className="main-nav__link main-nav__link--button"
                onClick={() => {
                  void signOut();
                }}
              >
                Sair
              </button>
            </>
          ) : (
            <a
              href="#/login"
              aria-current={route.name === "login" ? "page" : undefined}
              className={
                route.name === "login"
                  ? "main-nav__link is-active"
                  : "main-nav__link"
              }
            >
              Entrar
            </a>
          )}
        </nav>
      </header>

      <main className="page-container">
        {isDemoRoute && (
          <nav className="route-nav" aria-label="Etapas da demonstração">
            <a
              href="#/"
              className={
                route.name === "management" ? "route-stop is-current" : "route-stop"
              }
            >
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
              className={
                route.name === "emergency" ? "route-stop is-current" : "route-stop"
              }
            >
              <span className="route-stop__dot" aria-hidden="true" />
              <span>Prévia pública</span>
            </a>
          </nav>
        )}

        {route.name === "management" && (
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

        {route.name === "emergency" && (
          <EmergencyView
            contact={contact}
            isShareActive={sharingEnabled}
            emergencyUrl={emergencyUrl}
          />
        )}

        {route.name === "login" && <Login />}
        {route.name === "app" && renderCardArea("app")}
        {route.name === "qr" && renderCardArea("qr")}
        {isPublic && <PublicCard token={route.token} />}
      </main>

      <footer className="site-footer">
        Esta demonstração não oferece diagnóstico, tratamento nem atendimento.
        Não use este conteúdo para decisões clínicas.
      </footer>
    </div>
  );
}
