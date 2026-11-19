import { useAuth } from "../auth/AuthProvider";

export default function Login() {
  const { configured, loading, session, signInWithGoogle, signOut } = useAuth();

  if (!configured) {
    return (
      <section className="content-panel setup-panel" aria-labelledby="setup-title">
        <h1 id="setup-title">Backend não configurado</h1>
        <p>
          Esta POC precisa de um backend gratuito com login social. Defina
          <code> VITE_BACKEND_URL </code> e
          <code> VITE_BACKEND_ANON_KEY </code> em <code>.env.local</code>.
        </p>
        <p className="panel-footnote">
          A demonstração antiga continua funcionando em <a href="#/">Gestão</a>.
        </p>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="content-panel setup-panel" aria-live="polite">
        <p>Verificando sessão...</p>
      </section>
    );
  }

  if (session) {
    return (
      <section className="content-panel setup-panel" aria-labelledby="session-title">
        <h1 id="session-title">Sessão ativa</h1>
        <p>Você já está autenticado nesta POC.</p>
        <p className="button-row">
          <a className="button button--primary" href="#/app">
            Ir para minha ficha
          </a>
          <button className="button button--text" onClick={signOut}>
            Sair
          </button>
        </p>
      </section>
    );
  }

  return (
    <section className="content-panel setup-panel" aria-labelledby="login-title">
      <h1 id="login-title">Entrar na POC</h1>
      <p>
        Use sua conta Google para criar e manter uma ficha de emergência. Cada
        conta tem exatamente uma ficha e um QR próprio.
      </p>
      <button className="button button--primary" onClick={signInWithGoogle}>
        Entrar com Google
      </button>
      <p className="panel-footnote">
        Se o provedor exibir algum aviso, ele é esperado nesta fase. Nenhuma
        permissão além de nome, e-mail e perfil é solicitada.
      </p>
    </section>
  );
}
