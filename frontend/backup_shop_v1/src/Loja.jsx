import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000";

const NOMES_CATEGORIA = {
  weapon: "Weapon",
  vitality: "Vitality",
  spirit: "Spirit",
};

const NOMES_TIER = {
  1: "Tier 1",
  2: "Tier 2",
  3: "Tier 3",
  4: "Tier 4",
};

function Loja({ voltar, tema, onTrocarTema, TEMAS, saldoSouls, inventario, onComprar }) {
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("weapon");

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
  const tiers = [4, 3, 2, 1];

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
          <h2 className="loja-section-title">Your arsenal ({inventario.length})</h2>
          {inventario.length === 0 ? (
            <p className="loja-vazio">No equipment yet. Spend those souls, scrapper.</p>
          ) : (
            <div className="loja-grid loja-grid-inventory">
              {inventario.map((nome) => (
                <span className="loja-inventory-item" key={nome}>
                  {nome}
                </span>
              ))}
            </div>
          )}
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
          <p className="rune-roll">Opening the Curiosity Shop...</p>
        ) : (
          tiers.map((tier) => {
            const doTier = itensCategoria.filter((item) => item.tier === tier);
            if (doTier.length === 0) return null;
            return (
              <section className="loja-tier" key={tier}>
                <h3 className="loja-tier-title">{NOMES_TIER[tier]}</h3>
                <div className="loja-grid">
                  {doTier.map((item) => {
                    const comprado = inventario.includes(item.nome);
                    const podeComprar = !comprado && saldoSouls >= item.custo;
                    return (
                      <div
                        className={`loja-item ${comprado ? "loja-item-comprado" : ""}`}
                        key={item.nome}
                      >
                        <div className="loja-item-top">
                          <span className="loja-item-nome">{item.nome}</span>
                        </div>
                        <div className="loja-item-bottom">
                          <span className="loja-item-custo">{item.custo} souls</span>
                          {comprado ? (
                            <span className="loja-badge loja-badge-own">Owned</span>
                          ) : (
                            <button
                              className="btn loja-buy"
                              disabled={!podeComprar}
                              onClick={() => onComprar(item)}
                            >
                              {podeComprar ? "Buy" : "Need souls"}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })
        )}
      </section>

      <aside className="patron patron-right">
        <span className="patron-ring">◈</span>
        <span className="patron-label">SHOP</span>
      </aside>
    </main>
  );
}

export default Loja;
