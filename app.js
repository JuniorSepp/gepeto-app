const WEBHOOK_URL = "https://wjr.app.n8n.cloud/webhook/gerar";

async function gerar() {
  const categoria = document.getElementById("categoria")?.value;
  const tema = document.getElementById("tema")?.value;
  const plataforma = document.getElementById("plataforma")?.value;
  const duracao = document.getElementById("duracao")?.value;
  const estilo = document.getElementById("estilo")?.value;

  const resultado = document.getElementById("resultado");
  const botao = document.querySelector("button");

  // Validação real
  if (!categoria || !tema || !plataforma || !duracao || !estilo) {
    resultado.innerHTML = "⚠️ Preencha todos os campos para gerar o roteiro.";
    return;
  }

  botao.disabled = true;
  botao.innerText = "GERANDO...";
  resultado.innerHTML = "⏳ Criando roteiro viral aprovado pelo algoritmo...";

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        categoria,
        tema,
        plataforma,
        duracao,
        estilo
      })
    });

    const data = await response.json();

    // Aceita qualquer retorno válido da IA
    let texto =
      data?.VIDEO_SCRIPT ||
      data?.output?.[0]?.content?.[0]?.text ||
      data?.shorts?.[0]?.roteiro;

    if (!texto) {
      resultado.innerHTML = "⚠️ A IA respondeu, mas sem roteiro.";
      console.warn("Resposta:", data);
      return;
    }

    resultado.innerHTML = `
      <pre style="
        white-space: pre-wrap;
        background:#000;
        color:#fff;
        padding:16px;
        border-radius:8px;
        font-size:14px;
        line-height:1.6;
      ">${texto}</pre>

      <button onclick="copiar()" style="
        margin-top:12px;
        width:100%;
        padding:12px;
        background:#e50914;
        color:white;
        border:none;
        border-radius:6px;
        font-weight:bold;
      ">
        📋 COPIAR PARA CAPCUT
      </button>
    `;

  } catch (erro) {
    console.error(erro);
    resultado.innerHTML = "❌ Erro ao conectar com o servidor.";
  } finally {
    botao.disabled = false;
    botao.innerText = "GERAR SHORT";
  }
}

function copiar() {
  const texto = document.querySelector("pre")?.innerText;
  if (!texto) return;
  navigator.clipboard.writeText(texto);
  alert("Roteiro copiado! 🎬");
}