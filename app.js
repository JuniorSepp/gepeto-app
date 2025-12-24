const WEBHOOK_URL = "https://wjr.app.n8n.cloud/webhook/gerar";

async function gerar() {
  const tema = document.getElementById("tema").value.trim();
  const plataforma = document.getElementById("plataforma").value;
  const duracao = document.getElementById("duracao").value;
  const estilo = document.getElementById("estilo").value;
  const resultado = document.getElementById("resultado");

  if (!tema || !plataforma || !duracao || !estilo) {
    resultado.innerHTML = "⚠️ Preencha todos os campos.";
    return;
  }

  resultado.innerHTML = "⏳ Gerando roteiro viral...";

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tema,
        plataforma,
        duracao,
        estilo
      })
    });

    const data = await res.json();

    let texto =
      data?.shorts?.[0]?.roteiro ||
      data?.output?.[0]?.content?.[0]?.text ||
      null;

    if (!texto) {
      resultado.innerHTML = "⚠️ IA respondeu sem roteiro.";
      console.log(data);
      return;
    }

    resultado.innerHTML = `
      <pre style="
        white-space: pre-wrap;
        background:#000;
        color:#fff;
        padding:16px;
        border-radius:8px;
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
      ">📋 COPIAR ROTEIRO</button>
    `;

  } catch (e) {
    resultado.innerHTML = "❌ Erro ao conectar.";
    console.error(e);
  }
}

function copiar() {
  const texto = document.querySelector("pre").innerText;
  navigator.clipboard.writeText(texto);
  alert("Roteiro copiado!");
}