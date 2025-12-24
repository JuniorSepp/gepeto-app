const WEBHOOK_URL = "https://wjr.app.n8n.cloud/webhook/gerar";

async function gerar() {
  const tema = document.getElementById("tema").value.trim();
  const plataforma = document.getElementById("plataforma").value;
  const duracao = document.getElementById("duracao").value;
  const estilo = document.getElementById("estilo").value;
  const resultado = document.getElementById("resultado");
  const botao = document.getElementById("btnGerar");

  if (!tema) {
    resultado.innerHTML = "⚠️ Digite um tema.";
    return;
  }

  botao.disabled = true;
  botao.innerText = "GERANDO...";
  resultado.innerHTML = "⏳ Gerando roteiro viral...";

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tema,
        plataforma,
        duracao,
        estilo
      })
    });

    const data = await response.json();

    let texto = null;

    // FORMATO PADRÃO DO N8N
    if (data?.shorts?.[0]?.roteiro) {
      texto = data.shorts[0].roteiro;
    }

    // FORMATO ALTERNATIVO (Message a Model)
    if (!texto && data?.output?.[0]?.content?.[0]?.text) {
      texto = data.output[0].content[0].text;
    }

    if (!texto) {
      resultado.innerHTML = "⚠️ A IA respondeu, mas não gerou roteiro.";
      console.warn(data);
      return;
    }

    resultado.innerHTML = `
      <pre>${texto}</pre>
      <button onclick="copiar()">📋 COPIAR PARA CAPCUT</button>
    `;
  } catch (err) {
    console.error(err);
    resultado.innerHTML = "❌ Erro ao conectar com o servidor.";
  } finally {
    botao.disabled = false;
    botao.innerText = "GERAR ROTEIRO";
  }
}

function copiar() {
  const texto = document.querySelector("pre").innerText;
  navigator.clipboard.writeText(texto);
  alert("Roteiro copiado! 🎬");
}