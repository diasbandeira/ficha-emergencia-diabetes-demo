import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { backend, isBackendConfigured } from "../lib/backend";

type AuthContextValue = {
  configured: boolean;
  loading: boolean;
  session: Session | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(isBackendConfigured);

  useEffect(() => {
    if (!backend) {
      setLoading(false);
      return;
    }

    let active = true;
    backend.auth
      .getSession()
      .then(({ data }) => {
        if (active) {
          setSession(data.session);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setLoading(false);
        }
      });

    const { data: subscription } = backend.auth.onAuthStateChange(
      (_event, nextSession) => setSession(nextSession),
    );

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      configured: isBackendConfigured,
      loading,
      session,
      async signInWithGoogle() {
        if (!backend) {
          return;
        }
        const redirectTo = `${window.location.origin}${import.meta.env.BASE_URL}`;
        sessionStorage.setItem("poc:oauth-pending", "1");
        await backend.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo, queryParams: { prompt: "select_account" } },
        });
      },
      async signOut() {
        await backend?.auth.signOut();
      },
    }),
    [loading, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
