import { useEffect, useRef, useState } from "react";
import "./App.css";
import About from "./About.jsx";
import Loja from "./Loja.jsx";
import mikubopImage from "./assets/images/mikubop.webp";
import goatImage from "./assets/images/the goat.jpeg";

const API_URL = "http://localhost:3000";

const TEMAS = [
  { id: "neutral", nome: "Neutral" },
  { id: "hidden-king", nome: "Hidden King" },
  { id: "archmother", nome: "Archmother" },
];

const DEADLOCK_WORDS = [
  "bebop",
  "seven",
  "vindicta",
  "ivy",
  "wraith",
  "dynamo",
  "haze",
  "infernus",
  "lady geist",
  "mcginnis",
  "mo",
  "krill",
  "paradox",
  "pocket",
  "abrams",
  "grey talon",
  "shiv",
  "lifeline",
  "warp stone",
  "laning",
  "patron",
  "shrubs",
  "bomb",
  "ult",
  "grab",
  "dash jump",
  "flex slot",
  "zoning",
  "midboss",
  "rejuv",
  "soul urn",
  "trooper",
  "guardian",
  "jungle camp",
  "creep wave",
  "denizen",
  "zephyr",
  "wraith stalk",
];

function App() {
  const [curtidas, setCurtidas] = useState(0);
  const [souls, setSouls] = useState(0);
  const [soulsGastos, setSoulsGastos] = useState(0);
  const [inventario, setInventario] = useState([]);
  const [tempoNoSite, setTempoNoSite] = useState(0);
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
  const [bombTriggered, setBombTriggered] = useState(false);
  const [qte, setQte] = useState(null);
  const typedBuffer = useRef("");
  const qteInput = useRef("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema);
    localStorage.setItem("devcard-theme", tema);
  }, [tema]);

  useEffect(() => {
    const relogio = setInterval(() => {
      setTempoNoSite((t) => t + 1);
    }, 1000);
    return () => clearInterval(relogio);
  }, []);

  function calcularSouls() {
    const min = 950;
    const max = 3000;
    const limite = 60;
    const fator = Math.min(tempoNoSite / limite, 1);
    return Math.round(min + (max - min) * fator);
  }

  const saldoSouls = souls - soulsGastos;

  function comprarItem(item) {
    if (inventario.includes(item.nome)) return;
    if (saldoSouls < item.custo) return;
    setSoulsGastos((g) => g + item.custo);
    setInventario((inv) => [...inv, item.nome]);
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (bombTriggered || qte) return;
      if (e.key.length > 1 && e.key !== "Backspace") return;

      if (e.key === "Backspace") {
        typedBuffer.current = typedBuffer.current.slice(0, -1);
        return;
      }

      typedBuffer.current += e.key.toLowerCase();
      if (typedBuffer.current.length > 20) {
        typedBuffer.current = typedBuffer.current.slice(-20);
      }

      if (typedBuffer.current.includes("bomb")) {
        typedBuffer.current = "";
        setBombTriggered(true);
        setTimeout(() => setBombTriggered(false), 4500);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [bombTriggered, qte]);

  function iniciarQte() {
    const palavra =
      DEADLOCK_WORDS[Math.floor(Math.random() * DEADLOCK_WORDS.length)];
    qteInput.current = "";
    setQte({ palavra, input: "", timeLeft: 5, status: "ativa" });
  }

  useEffect(() => {
    if (!qte || qte.status !== "ativa") return;

    const temporizador = setInterval(() => {
      setQte((q) => {
        if (q.status !== "ativa") return q;
        const nova = { ...q, timeLeft: q.timeLeft - 1 };
        if (nova.timeLeft <= 0) {
          nova.status = "falhou";
          nova.timeLeft = 0;
        }
        return nova;
      });
    }, 1000);

    return () => clearInterval(temporizador);
  }, [qte && qte.status]);

  useEffect(() => {
    if (!qte || qte.status !== "ativa") return;

    function lidarDigito(e) {
      if (qte.status !== "ativa") return;
      if (e.key.length > 1 && e.key !== "Backspace") return;

      if (e.key === "Backspace") {
        qteInput.current = qteInput.current.slice(0, -1);
        setQte((q) => (q ? { ...q, input: q.input.slice(0, -1) } : q));
        return;
      }

      const proximo = qteInput.current + e.key.toLowerCase();
      qteInput.current = proximo;
      setQte((q) => (q ? { ...q, input: proximo } : q));

      if (proximo === qte.palavra.toLowerCase()) {
        setQte((q) => (q ? { ...q, status: "sucesso", ganhoSouls: calcularSouls() } : q));
        setCurtidas((c) => c + 6);
        setSouls((s) => s + calcularSouls());
      }
    }

    window.addEventListener("keydown", lidarDigito);
    return () => window.removeEventListener("keydown", lidarDigito);
  }, [qte]);

  useEffect(() => {
    if (!qte || (qte.status !== "sucesso" && qte.status !== "falhou")) return;

    const id = setTimeout(() => setQte(null), 2000);
    return () => clearTimeout(id);
  }, [qte && qte.status]);

  useEffect(() => {
    if (pagina !== "inicio" || qte) return;

    const intervalo = 20000 + Math.random() * 25000;
    const id = setTimeout(() => iniciarQte(), intervalo);

    return () => clearTimeout(id);
  }, [qte, pagina]);

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

  if (pagina === "loja") {
    return (
      <Loja
        voltar={() => setPagina("inicio")}
        tema={tema}
        onTrocarTema={trocarTema}
        TEMAS={TEMAS}
        saldoSouls={saldoSouls}
        inventario={inventario}
        onComprar={comprarItem}
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
          <div className="hud-header-right">
            <div className="counter souls-counter-block">
              <span className="soul-label">Souls</span>
              <strong className="soul-count souls-count">{souls}</strong>
            </div>
            <button className="btn theme-btn" onClick={trocarTema}>
              {TEMAS.find((t) => t.id === tema).nome}
            </button>
          </div>
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
            onClick={() => setPagina("loja")}
          >
            Curiosity Shop
          </button>
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

      {bombTriggered && (
        <div className="bomb-overlay">
          <div className="bomb-flash" />
          <div className="bomb-fireball" />
          <div className="bomb-shockwave" />
          <div className="bomb-shockwave bomb-shockwave-2" />
          <div className="bomb-smoke" />
          {Array.from({ length: 40 }).map((_, i) => {
            const ang = (Math.PI * 2 * i) / 40;
            const dist = 80 + Math.random() * 320;
            return (
              <div
                className="bomb-particle"
                key={i}
                style={{
                  "--dx": `${Math.cos(ang) * dist}px`,
                  "--dy": `${Math.sin(ang) * dist + 60}px`,
                  "--size": `${3 + Math.random() * 8}px`,
                  "--delay": `${Math.random() * 0.15}s`,
                  "--dur": `${0.6 + Math.random() * 0.8}s`,
                }}
              />
            );
          })}
          {Array.from({ length: 18 }).map((_, i) => {
            const ang = ((Math.PI * 2 * i) / 18) + Math.random() * 0.35;
            const dist = 120 + Math.random() * 400;
            return (
              <div
                className="bomb-debris"
                key={`d${i}`}
                style={{
                  "--dx": `${Math.cos(ang) * dist}px`,
                  "--dy": `${Math.sin(ang) * dist + 120}px`,
                  "--rot": `${Math.random() * 720}deg`,
                  "--delay": `${Math.random() * 0.2}s`,
                  "--size": `${4 + Math.random() * 10}px`,
                }}
              />
            );
          })}
          <div className="bomb-text">BOOM</div>
        </div>
      )}

      {qte && (
        <div className={`qte-overlay qte-${qte.status}`}>
          <div className="qte-panel">
            <span className="qte-kicker">SHRINE OF THE PATRON</span>
            <h2 className="qte-question">Type the word in time!</h2>

            <div className="qte-word-row">
              <span className="qte-target">{qte.palavra}</span>
              <div
                className={`qte-typeq ${
                  qte.input && !qte.palavra.toLowerCase().startsWith(qte.input)
                    ? "qte-wrong"
                    : ""
                }`}
              >
                {qte.input || ""}
                <span className="qte-caret" />
              </div>
            </div>

            <div className="qte-timer-wrap">
              <div
                className="qte-timer-bar"
                style={{ width: `${(qte.timeLeft / 5) * 100}%` }}
              />
              <span className="qte-timer-num">{qte.timeLeft}s</span>
            </div>

            {qte.status === "sucesso" && (
              <div className="qte-result qte-result-win">
                <span className="qte-reward">+6 BOMB STACKS</span>
                <span className="qte-reward">+{qte.ganhoSouls} SOULS</span>
              </div>
            )}
            {qte.status === "falhou" && (
              <div className="qte-result qte-result-lose">MISSED!</div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
