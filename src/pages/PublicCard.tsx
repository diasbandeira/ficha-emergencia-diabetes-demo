import { useEffect, useState } from "react";
import PublicBlockList from "../components/emergency-demo/PublicBlockList";
import { isBackendConfigured } from "../lib/backend";
import { fetchPublicCard } from "../services/cardService";
import { blockLabels, type PublicCard as PublicCardData } from "../types/card";

type PublicCardProps = {
  token: string;
};

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export default function PublicCard({ token }: PublicCardProps) {
  const [loading, setLoading] = useState(isBackendConfigured);
  const [card, setCard] = useState<PublicCardData | null>(null);
  const [error, setError] = useState("");
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!isBackendConfigured) {
      return;
    }
    let active = true;
    fetchPublicCard(token)
      .then((data) => {
        if (!active) {
          return;
        }
        if (!data) {
          setMissing(true);
        } else {
          setCard(data);
        }
      })
      .catch((cause) => {
        if (active) {
          setError(
            cause instanceof Error ? cause.message : "Falha ao abrir a ficha.",
          );
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
  }, [token]);

  if (!isBackendConfigured) {
    return (
      <section className="content-panel setup-panel">
        <h1>Ficha indisponível</h1>
        <p>O backend desta POC não está configurado neste ambiente.</p>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="content-panel setup-panel" aria-live="polite">
        <p>Abrindo a ficha de emergência...</p>
      </section>
    );
  }

  if (missing) {
    return (
      <section className="content-panel setup-panel">
        <h1>Link inválido ou revogado</h1>
        <p>Este QR não aponta para uma ficha pública ativa.</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="content-panel setup-panel">
        <h1>Não foi possível abrir a ficha</h1>
        <p role="alert">{error}</p>
      </section>
    );
  }

  if (!card) {
    return null;
  }

  return (
    <article className="public-card" aria-labelledby="public-card-title">
      <div className="public-card__top">
        <p className="public-card__eyebrow">Ficha de emergência</p>
        <h1 id="public-card-title">{card.displayName}</h1>
        <p className="public-card__meta">
          Atualizada em {formatDate(card.updatedAt)} · POC de demonstração
        </p>
      </div>

      {card.blocks.length === 0 ? (
        <p>Esta ficha ainda não tem blocos públicos.</p>
      ) : (
        <div className="public-card__blocks">
          <PublicBlockList
            items={card.blocks.map((block) => ({
              id: block.key,
              label: blockLabels[block.key],
              value: block.payload.text,
            }))}
          />
        </div>
      )}

      <footer className="public-card__footer">
        <p>
          Em emergência real, ligue 192 (SAMU) ou procure o serviço local. Esta
          ficha é uma prova de conceito e não substitui atendimento médico.
        </p>
        <a className="text-link" href="#/">
          Sobre esta POC
        </a>
      </footer>
    </article>
  );
}
