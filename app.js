const WEBHOOK_URL = "https://wjr.app.n8n.cloud/webhook/gerar";

async function gerar() {
  const categoria = document.getElementById("categoria").value;
  const tema = document.getElementById("tema").value.trim();
  const resultado = document.getElementById("resultado");

  if (!categoria || !tema) {
    resultado.innerHTML = "⚠️ Preencha categoria e tema.";
    return;
  }

  resultado.innerHTML = "⏳ Gerando roteiro viral...";

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoria, tema })
    });

    const data = await res.json();

    const texto = data?.shorts?.[0]?.roteiro;

    if (!texto) {
      resultado.innerHTML = "⚠️ A IA não retornou roteiro.";
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
padding:12px;
width:100%;
background:#e50914;
color:white;
border:none;
border-radius:6px;
font-weight:bold;
font-size:16px;
">
📋 COPIAR PARA CAPCUT
</button>
`;

  } catch (e) {
    console.error(e);
    resultado.innerHTML = "❌ Erro de conexão.";
  }
}

function copiar() {
  const texto = document.querySelector("pre").innerText;
  navigator.clipboard.writeText(texto);
  alert("Roteiro copiado! 🎬");
}