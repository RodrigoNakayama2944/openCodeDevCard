import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000";

const NOMES_CATEGORIA = {
  weapon: "Weapon",
  vitality: "Vitality",
  spirit: "Spirit",
};

const NOMES_TIER = {
  1: "GR.1",
  2: "GR.2",
  3: "GR.3",
  4: "GR.4",
};

const SLOTS_TOTAL = 12;

function caminhoIcone(nome) {
  return `itens/${encodeURIComponent(nome)}.png`;
}

function Loja({
  voltar,
  tema,
  onTrocarTema,
  TEMAS,
  saldoSouls,
  inventario,
  capacidade,
  limitesTrancado,
  qteVitorias,
  onComprar,
  onVender,
  onTrocar,
}) {
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("weapon");
  const [vendaModal, setVendaModal] = useState(null);

  useEffect(() => {
    let ativo = true;
    async function carregarLoja() {
      try {
        setCarregando(true);
        setErro("");
        const resposta = await fetch(`${API_URL}/api/loja`);
        if (!resposta.ok) {
          throw new Error("Erro ao carregar a loja.");
        }
        const dados = await resposta.json();
        if (ativo) setItens(dados.itens);
      } catch {
        if (ativo) setErro("Unable to reach the store. Is the backend running?");
      } finally {
        if (ativo) setCarregando(false);
      }
    }
    carregarLoja();
    return () => {
      ativo = false;
    };
  }, []);

  const categorias = ["weapon", "vitality", "spirit"];
  const itensCategoria = itens.filter((item) => item.categoria === categoriaAtiva);
  const tiers = [1, 2, 3, 4];

  const slots = Array.from({ length: SLOTS_TOTAL }, (_, indice) => {
    const preenchido = inventario[indice];
    const trancado = indice >= capacidade;
    return { indice, preenchido, trancado };
  });

  function fecharModal() {
    setVendaModal(null);
  }

  function tentarComprar(item) {
    if (inventario.some((i) => i.nome === item.nome)) return;
    if (inventario.length >= capacidade) {
      setVendaModal({ modo: "troca", pendente: item });
      return;
    }
    onComprar(item);
  }

  function confirmarTroca(nomeVendido) {
    if (!vendaModal || vendaModal.modo !== "troca") return;
    onTrocar(nomeVendido, vendaModal.pendente);
    fecharModal();
  }

  return (
    <main className="deadlock">
      <aside className="patron patron-left">
        <span className="patron-ring">◈</span>
        <span className="patron-label">SHOP</span>
      </aside>

      <section className="hero-panel loja-panel">
        <header className="hud-header">
          <div className="hud-brand">
            <span className="hud-logo">◈</span>
            <span className="hud-title">CURIOSITY SHOP</span>
          </div>
          <div className="hud-header-right loja-header-right">
            <div className="loja-balance">
              <span className="soul-label">Souls</span>
              <strong className="soul-count souls-count loja-balance-num">{saldoSouls}</strong>
            </div>
            <button className="btn theme-btn" onClick={onTrocarTema}>
              {TEMAS.find((t) => t.id === tema).nome}
            </button>
            <button className="btn" onClick={voltar}>
              Return
            </button>
          </div>
        </header>

        {erro && <p className="erro">{erro}</p>}

        <div className="loja-inventario">
          <h2 className="loja-section-title">
            Your arsenal · {inventario.length}/{capacidade}
          </h2>
          <p className="loja-slot-legend">
            QTE runs won: {qteVitorias} — break chains by winning more.
          </p>
          <div className="arsenal-grid">
            {slots.map((slot) => {
              if (slot.trancado) {
                const exigencia = limitesTrancado[slot.indice - 9];
                return (
                  <div
                    className="arsenal-slot arsenal-slot-trancado"
                    key={slot.indice}
                    title={`Locked. Win ${exigencia} QTE${exigencia > 1 ? "s" : ""} to open.`}
                  >
                    <span className="arsenal-slot-num">{slot.indice + 1}</span>
                    <span className="arsenal-lock" aria-hidden="true">
                      ⛓
                    </span>
                    <span className="arsenal-lock-label">
                      Win {exigencia} QTE{exigencia > 1 ? "s" : ""}
                    </span>
                  </div>
                );
              }
              if (slot.preenchido) {
                return (
                  <div className="arsenal-slot arsenal-slot-cheio" key={slot.indice}>
                    <span className="arsenal-slot-num">{slot.indice + 1}</span>
                    <img
                      className="arsenal-item-icone"
                      src={caminhoIcone(slot.preenchido.nome)}
                      alt={slot.preenchido.nome}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <span className="arsenal-item-nome">{slot.preenchido.nome}</span>
                    <button
                      className="btn arsenal-sell"
                      onClick={() => setVendaModal({ modo: "venda", item: slot.preenchido })}
                      title="Sell for half price"
                    >
                      Sell
                    </button>
                  </div>
                );
              }
              return (
                <div className="arsenal-slot arsenal-slot-vazio" key={slot.indice}>
                  <span className="arsenal-slot-num">{slot.indice + 1}</span>
                  <span className="arsenal-empty">Open socket</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="loja-tabs">
          {categorias.map((cat) => (
            <button
              key={cat}
              className={`btn loja-tab ${categoriaAtiva === cat ? "loja-tab-ativa" : ""}`}
              onClick={() => setCategoriaAtiva(cat)}
            >
              {NOMES_CATEGORIA[cat]}
            </button>
          ))}
        </div>

        {carregando ? (
          <p className="rune-roll">Cashin' in the scrap...</p>
        ) : (
          tiers.map((tier) => {
            const doTier = itensCategoria.filter((item) => item.tier === tier);
            if (doTier.length === 0) return null;
            return (
              <section className="loja-tier" key={tier}>
                <h3 className="loja-tier-title">
                  <span className="scrap-rack-line" aria-hidden="true" />
                  SCRAP RACK · {NOMES_TIER[tier]}
                </h3>
                <div className="loja-grid">
                  {doTier.map((item) => {
                    const comprado = inventario.some((i) => i.nome === item.nome);
                    const custo = item.custo.toLocaleString("en-US");
                    const falta = (item.custo - saldoSouls).toLocaleString("en-US");
                    const pronto = !comprado && saldoSouls >= item.custo;
                    const cheio = inventario.length >= capacidade;
                    return (
                      <article
                        className={`loja-item loja-item-t${item.tier} ${comprado ? "loja-item-comprado" : ""}`}
                        key={item.nome}
                      >
                        <span className="loja-item-icone-shell">
                          <img
                            className="loja-item-icone"
                            src={caminhoIcone(item.nome)}
                            alt={item.nome}
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </span>
                        <div className="scrap-head">
                          <span className="loja-item-nome">{item.nome}</span>
                          <span className="scrap-grade">{NOMES_TIER[item.tier]}</span>
                        </div>
                        <div className="scrap-price">
                          <span className="scrap-price-num">{custo}</span>
                          <span className="scrap-price-unit">souls</span>
                        </div>
                        {comprado ? (
                          <span className="loja-badge loja-badge-own">Claimed</span>
                        ) : (
                          <button
                            className="btn loja-buy"
                            disabled={!pronto}
                            onClick={() => tentarComprar(item)}
                          >
                            {pronto ? (cheio ? "Trade" : "Buy") : `Short ${falta} souls`}
                          </button>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })
        )}
      </section>

      {vendaModal && (
        <div className="arsenal-overlay" onClick={fecharModal}>
          <div
            className="arsenal-modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            {vendaModal.modo === "troca" ? (
              <>
                <h3 className="loja-section-title">Tunstall, the rack&apos;s full!</h3>
                <p>
                  Every socket&apos;s taken. Sell a piece (half price back) to make room for{" "}
                  <strong className="arsenal-strong">{vendaModal.pendente.nome}</strong>.
                </p>
                <div className="arsenal-modal-list">
                  {inventario.map((item) => (
                    <button
                      key={item.nome}
                      className="btn arsenal-modal-row"
                      onClick={() => confirmarTroca(item.nome)}
                    >
                      <span className="arsenal-modal-nome">
                        {item.nome && (
                          <img
                            className="arsenal-modal-icone"
                            src={caminhoIcone(item.nome)}
                            alt=""
                            loading="lazy"
                          />
                        )}
                        {item.nome}
                      </span>
                      <span>+{Math.floor(item.custo / 2).toLocaleString("en-US")} souls</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h3 className="loja-section-title">Sell {vendaModal.item.nome}?</h3>
                <p>
                  You&apos;ll get{" "}
                  <strong className="arsenal-strong">
                    {Math.floor(vendaModal.item.custo / 2).toLocaleString("en-US")} souls
                  </strong>{" "}
                  back — half the price. The socket opens up again.
                </p>
                <div className="arsenal-modal-actions">
                  <button
                    className="btn"
                    onClick={() => {
                      onVender(vendaModal.item.nome);
                      fecharModal();
                    }}
                  >
                    Sell it
                  </button>
                  <button className="btn" onClick={fecharModal}>
                    Keep it
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <aside className="patron patron-right">
        <span className="patron-ring">◈</span>
        <span className="patron-label">SHOP</span>
      </aside>
    </main>
  );
}

export default Loja;