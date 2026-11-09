import { QRCodeSVG } from "qrcode.react";
import {
  demoBlocks,
  type DemoContactOption,
} from "../../data/emergencyDemoData";

type EmergencyViewProps = {
  contact: DemoContactOption;
  isShareActive: boolean;
  emergencyUrl: string;
};

function DemoQrPanel({ emergencyUrl }: { emergencyUrl: string }) {
  return (
    <aside className="content-panel qr-panel" aria-labelledby="qr-title">
      <h2 id="qr-title">QR de demonstração</h2>
      <p>
        O código abre apenas esta rota genérica. Ele não contém dados de uma
        pessoa.
      </p>
      <div className="qr-frame">
        <QRCodeSVG
          value={emergencyUrl}
          size={176}
          level="M"
          role="img"
          aria-label="QR Code para a visualização pública demonstrativa"
        />
      </div>
      <a className="text-link" href={emergencyUrl}>
        Abrir a visualização pelo link
      </a>
      <p className="qr-url" aria-label="Endereço genérico do QR Code">
        {emergencyUrl}
      </p>
      <p className="panel-footnote">
        A retirada simulada não invalida este endereço em outra sessão.
      </p>
    </aside>
  );
}

export default function EmergencyView({
  contact,
  isShareActive,
  emergencyUrl,
}: EmergencyViewProps) {
  const publicBlocks = demoBlocks
    .filter((block) => block.visibility === "public")
    .map((block) =>
      block.id === "support-contact"
        ? { ...block, value: contact.publicValue }
        : block,
    );

  return (
    <div className="emergency-page">
      <div className="page-heading emergency-heading">
        <div>
          <h1>Visualização de emergência</h1>
          <p className="page-heading__summary">
            Esta tela mostra somente os blocos marcados como públicos neste
            exemplo fictício.
          </p>
        </div>
        <span className={isShareActive ? "state-pill state-pill--active" : "state-pill state-pill--withdrawn"}>
          {isShareActive
            ? "Compartilhamento simulado: ativo"
            : "Retirado nesta sessão"}
        </span>
      </div>

      {!isShareActive && (
        <div className="withdrawn-notice" role="status">
          <strong>Compartilhamento retirado nesta demonstração.</strong>
          <span>
            Nenhum acesso externo foi revogado. Outra sessão ou leitura do QR
            inicia novamente com o conteúdo sintético padrão.
          </span>
        </div>
      )}

      <div className="emergency-layout">
        {!isShareActive ? (
          <section className="content-panel withdrawn-content" aria-labelledby="withdrawn-title">
            <h2 id="withdrawn-title">Conteúdo oculto nesta sessão</h2>
            <p>
              A retirada é apenas local e temporária. Recarregar a página
              reinicia o exemplo; isso não revoga nenhum QR ou acesso real.
            </p>
          </section>
        ) : publicBlocks.length > 0 ? (
          <section className="content-panel emergency-card" aria-labelledby="public-content-title">
            <div className="emergency-card__header">
              <div>
                <h2 id="public-content-title">Pessoa de demonstração</h2>
                <span className="public-label">PÚBLICO NESTA DEMONSTRAÇÃO</span>
              </div>
              <span className="route-label">Conteúdo fictício</span>
            </div>
            <dl className="public-list">
              {publicBlocks.map((block) => (
                <div className="public-row" key={block.id}>
                  <dt>{block.label}</dt>
                  <dd>{block.value}</dd>
                </div>
              ))}
            </dl>
            <p className="panel-footnote">
              Esta página não contém instruções clínicas nem um canal de
              atendimento.
            </p>
          </section>
        ) : (
          <div className="error-state" role="alert">
            <h2>Não foi possível mostrar o conteúdo da demonstração</h2>
            <p>
              Nenhum dado foi inventado para preencher esta tela. Volte à
              gestão ou recarregue para reiniciar a demonstração.
            </p>
          </div>
        )}
        <DemoQrPanel emergencyUrl={emergencyUrl} />
      </div>
    </div>
  );
}
