import { useState } from "react";

export default function App() {
  const [categoria, setCategoria] = useState("bíblico");
  const [tema, setTema] = useState("");
  const [resultado, setResultado] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function gerarShorts() {
    setErro("");
    setResultado([]);
    setLoading(true);

    try {
      const response = await fetch(
        "https://wjr.app.n8n.cloud/webhook/gerar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            categoria,
            tema,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro na API");
      }

      const data = await response.json();

      if (!data.shorts) {
        throw new Error("Resposta inválida");
      }

      setResultado(data.shorts);
    } catch (e) {
      setErro("Erro ao gerar conteúdo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <h1>🎬 Gepeto Shorts</h1>
      <p>Crie roteiros curtos e virais</p>

      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        style={styles.input}
      >
        <option value="bíblico">Bíblico</option>
        <option value="anime">Anime</option>
        <option value="curiosidades">Curiosidades</option>
        <option value="notícias">Notícias</option>
      </select>

      <input
        style={styles.input}
        placeholder="Tema"
        value={tema}
        onChange={(e) => setTema(e.target.value)}
      />

      <button onClick={gerarShorts} style={styles.button}>
        {loading ? "Gerando..." : "GERAR SHORTS"}
      </button>

      {erro && <p style={styles.error}>❌ {erro}</p>}

      {resultado.map((item, index) => (
        <div key={index} style={styles.card}>
          <h3>{item.titulo}</h3>
          <p>{item.roteiro}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    background: "#0f0f0f",
    color: "#fff",
    minHeight: "100vh",
    padding: 20,
    textAlign: "center",
    fontFamily: "Arial",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    border: "none",
    fontSize: 16,
  },
  button: {
    width: "100%",
    padding: 14,
    background: "#ff0050",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 18,
    cursor: "pointer",
  },
  card: {
    background: "#1c1c1c",
    padding: 15,
    marginTop: 15,
    borderRadius: 10,
    textAlign: "left",
  },
  error: {
    marginTop: 10,
    color: "#ff4d4d",
  },
};