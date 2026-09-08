import { useEffect, useState } from "react";
import "./App.css";
import About from "./About.jsx";
import mikubopImage from "./assets/images/mikubop.webp";
import goatImage from "./assets/images/the goat.jpeg";

const API_URL = "http://localhost:3000";

const TEMAS = [
  { id: "neutral", nome: "Neutral" },
  { id: "hidden-king", nome: "Hidden King" },
  { id: "archmother", nome: "Archmother" },
];

function App() {
  const [curtidas, setCurtidas] = useState(0);
  const [perfil, setPerfil] = useState(null);
  const [habilidades, setHabilidades] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [frase, setFrase] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [pagina, setPagina] = useState("inicio");
  const [tema, setTema] = useState(() => {
    return localStorage.getItem("devcard-theme") || "neutral";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema);
    localStorage.setItem("devcard-theme", tema);
  }, [tema]);

  function trocarTema() {
    const atual = TEMAS.findIndex((t) => t.id === tema);
    const proximo = (atual + 1) % TEMAS.length;
    setTema(TEMAS[proximo].id);
  }

  async function carregarDados() {
    try {
      setCarregando(true);
      setErro("");

      const resposta = await fetch(`${API_URL}/api/devcard`);

      if (!resposta.ok) {
        throw new Error("Erro ao buscar dados do DevCard.");
      }

      const dados = await resposta.json();

      setPerfil(dados.perfil);
      setHabilidades(dados.habilidades);
      setProjetos(dados.projetos);
      setFrase(dados.fraseInicial);
    } catch (error) {
      setErro("Unable to connect to the API. Check that the backend is running.");
    } finally {
      setCarregando(false);
    }
  }

  async function gerarNovaFrase() {
    try {
      setErro("");

      const resposta = await fetch(`${API_URL}/api/frase`);
      const dados = await resposta.json();

      setFrase(dados.frase);
    } catch (error) {
      setErro("Error fetching a new quote.");
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  if (pagina === "sobre") {
    return (
      <About
        voltar={() => setPagina("inicio")}
        tema={tema}
        onTrocarTema={trocarTema}
        TEMAS={TEMAS}
      />
    );
  }

  return (
    <main className="deadlock">
      <aside className="patron patron-left">
        <span className="patron-ring">◈</span>
        <span className="patron-label">PATRON</span>
      </aside>

      <section className="hero-panel">
        <header className="hud-header">
          <div className="hud-brand">
            <span className="hud-logo">◈</span>
            <span className="hud-title">DEADLOCK</span>
          </div>
          <button className="btn theme-btn" onClick={trocarTema}>
            {TEMAS.find((t) => t.id === tema).nome}
          </button>
        </header>

        <div className="hero-card">
          <div className="hero-portrait-frame">
            <img src={mikubopImage} alt="Hero portrait" className="hero-portrait" />
            <span className="hero-tier">TIER 5</span>
          </div>

          <div className="hero-data">
            <span className="hero-kicker">FUNDAMENTOS · DEVLAb</span>
            <h1 className="hero-name">{perfil ? perfil.nome : "Loading hero..."}</h1>

            {perfil && (
              <dl className="stats">
                <div className="stat">
                  <dt>Class</dt>
                  <dd>{perfil.turma}</dd>
                </div>
                <div className="stat">
                  <dt>Area</dt>
                  <dd>{perfil.area}</dd>
                </div>
                <div className="stat stat-wide">
                  <dt>Objective</dt>
                  <dd>{perfil.objetivo || perfil.status}</dd>
                </div>
              </dl>
            )}

            <div className="patron-rune">
              <section className="rune-fortune">
                <h2>API Quote</h2>
                {carregando ? (
                  <p className="rune-roll">Seeking prophecy...</p>
                ) : (
                  <p className="rune-text">{frase}</p>
                )}
                <button className="btn" onClick={gerarNovaFrase}>
                  Invoke new quote
                </button>
              </section>
            </div>
          </div>
        </div>

        <section className="abilities">
          <h2>Stage abilities</h2>
          <div className="ability-grid">
            {habilidades.map((habilidade, index) => (
              <div className="ability-card" key={index}>
                <span className="ability-slot">{String(index + 1).padStart(2, "0")}</span>
                <span className="ability-name">{habilidade.nome}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="abilities projetos">
          <h2>Mini projects</h2>
          <div className="projeto-grid">
            {projetos.map((projeto, index) => (
              <article className="projeto-card" key={index}>
                <span className="projeto-tipo">{projeto.tipo}</span>
                <h3 className="projeto-nome">{projeto.nome}</h3>
                <p className="projeto-descricao">{projeto.descricao}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="soul-block">
          <img src={goatImage} alt="Soul icon" className="soul-icon" />
          <div className="soul-copy">
            <span className="soul-label">Bomb stacks</span>
            <strong className="soul-count">{curtidas}</strong>
          </div>
          <button
            className="btn btn-gold"
            onClick={() => setCurtidas(curtidas + 1)}
          >
            Bomb idiots
          </button>
        </div>

        <footer className="hud-footer">
          <span className="blessing">DevLab Fundamentos</span>
          <button
            className="btn footer-btn"
            onClick={() => setPagina("sobre")}
          >
            The Creator
          </button>
        </footer>

        {erro && <p className="erro">{erro}</p>}
      </section>

      <aside className="patron patron-right">
        <span className="patron-ring">◈</span>
        <span className="patron-label">PATRON</span>
      </aside>
    </main>
  );
}

export default App;
