function About({ voltar, tema, onTrocarTema, TEMAS }) {
  return (
    <main className="deadlock">
      <aside className="patron patron-left">
        <span className="patron-ring">◈</span>
        <span className="patron-label">CREATOR</span>
      </aside>

      <section className="hero-panel about-panel">
        <header className="hud-header">
          <div className="hud-brand">
            <span className="hud-logo">◈</span>
            <span className="hud-title">THE CREATOR</span>
          </div>
          <div className="hud-header-right">
            <button className="btn theme-btn" onClick={onTrocarTema}>
              {TEMAS.find((t) => t.id === tema).nome}
            </button>
            <button className="btn" onClick={voltar}>
              Return
            </button>
          </div>
        </header>

        <div className="about-dossier">
          <div className="dossier-head">
            <h2 className="hero-name about-title">The Mind Behind The Bop</h2>
          </div>

          <div className="dossier-body">
            <p className="dossier-empty">
              No dossier on file yet. The maker has yet to brief the forge on
              their origin.
            </p>

            <div className="dossier-signal" aria-hidden="true">
              <span className="signal-label">ORIGIN</span>
              <span className="signal-bars">
                <span className="signal-bar"></span>
                <span className="signal-bar"></span>
                <span className="signal-bar"></span>
                <span className="signal-bar"></span>
              </span>
            </div>
          </div>

          <div className="about-links">
            <a
              className="btn about-link"
              href="https://github.com/RodrigoNakayama"
              target="_blank"
              rel="noreferrer"
            >
              Personal GitHub
            </a>
            <a
              className="btn about-link"
              href="https://github.com/RodrigoNakayama2944"
              target="_blank"
              rel="noreferrer"
            >
              School GitHub
            </a>
          </div>

          <div className="lash-section">
            <h3 className="lash-title">Fuckass Retard, fuck you lash</h3>
            <img src="/src/assets/images/lash.jpeg" alt="Lash" className="lash-image" />
          </div>
        </div>

        <footer className="hud-footer">
          <span className="blessing">Summoned by the creator</span>
        </footer>
      </section>

      <aside className="patron patron-right">
        <span className="patron-ring">◈</span>
        <span className="patron-label">CREATOR</span>
      </aside>
    </main>
  );
}

export default About;
