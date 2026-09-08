import { useEffect, useState } from "react";
import "./App.css";
import yahuImage from "./assets/images/the biggest yahu.jpeg";
import telAvivImage from "./assets/images/tel aviv.jpeg";

const API_URL = "http://localhost:3000";

function App() {
  const [curtidas, setCurtidas] = useState(0);
  const [perfil, setPerfil] = useState(null);
  const [habilidades, setHabilidades] = useState([]);
  const [frase, setFrase] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function carregarDados() {
    try {
      setCarregando(true);
      setErro("");

      const respostaPerfil = await fetch(`${API_URL}/api/perfil`);
      const respostaHabilidades = await fetch(`${API_URL}/api/habilidades`);
      const respostaFrase = await fetch(`${API_URL}/api/frase`);

      const dadosPerfil = await respostaPerfil.json();
      const dadosHabilidades = await respostaHabilidades.json();
      const dadosFrase = await respostaFrase.json();

      setPerfil(dadosPerfil);
      setHabilidades(dadosHabilidades);
      setFrase(dadosFrase.frase);
    } catch (error) {
      setErro("Nao foi possivel conectar com a API. Verifique se o back-end esta rodando.");
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
      setErro("Erro ao buscar nova frase.");
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <main className="pagina">
      <img src={yahuImage} alt="Biggest Yahu" className="side-image side-image-left" />
      <img src={telAvivImage} alt="Tel Aviv" className="side-image side-image-right" />
      <section className="card">
        <div className="israel-flag">
          <div className="flag-stripe"></div>
          <div className="flag-center">
            <span className="flag-star">✡</span>
            <span className="etiqueta">DevLab Fundamentos</span>
            <span className="flag-star">✡</span>
          </div>
          <div className="flag-stripe"></div>
        </div>

        <span className="shalom-badge">SHALOM</span>

        <h1>{perfil ? perfil.nome : "Carregando perfil..."}</h1>

        {perfil && (
          <>
            <p className="descricao">
              <strong>Turma:</strong> {perfil.turma}
            </p>

            <p className="descricao">
              <strong>Area:</strong> {perfil.area}
            </p>

            <p className="descricao">
              <strong>Objetivo:</strong> {perfil.objetivo}
            </p>
          </>
        )}

        <div className="contador">
          <span>Curtidas no projeto:</span>
          <strong>{curtidas}</strong>
        </div>

        <button onClick={() => setCurtidas(curtidas + 1)}>
          Curtir projeto
        </button>

        <div className="bloco">
          <h2>Frase da API</h2>

          {carregando ? (
            <p className="descricao">Buscando dados...</p>
          ) : (
            <p className="frase">{frase}</p>
          )}

          <button className="botao-secundario" onClick={gerarNovaFrase}>
            Gerar nova frase
          </button>
        </div>

        <div className="bloco">
          <h2>Habilidades da etapa</h2>

          <ul>
            {habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </div>

        <div className="blessing-text">
          "Baruch Hashem" - Bendito seja o Nome
        </div>

        {erro && <p className="erro">{erro}</p>}
      </section>
    </main>
  );
}

export default App;
