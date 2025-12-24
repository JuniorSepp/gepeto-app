const WEBHOOK_URL = "https://wjr.app.n8n.cloud/webhook/gerar";

async function gerar() {
  const categoria  = document.getElementById("categoria").value;
  const tema       = document.getElementById("tema").value.trim();
  const plataforma = document.getElementById("plataforma").value;
  const duracao    = document.getElementById("duracao").value;
  const estilo     = document.getElementById("estilo").value;

  const resultado = document.getElementById("resultado");
  const botao = document.getElementById("btnGerar");

  if (!categoria || !tema || !plataforma || !duracao || !estilo) {
    resultado.innerHTML = "⚠️ Preencha todos os campos.";
    return;
  }

  botao.disabled = true;
  botao.innerText = "GERANDO...";
  resultado.innerHTML = "⏳ Gerando roteiro viral...";

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoria,
        tema,
        plataforma,
        duracao,
        estilo
      })
    });

    const data = await res.json();

    let texto =
      data?.output?.[0]?.content?.[0]?.text ||
      data?.roteiro ||
      null;

    if (!texto) {
      resultado.innerHTML = "❌ IA respondeu sem roteiro.";
      console.log(data);
      return;
    }

    resultado.innerHTML = `
<pre>${texto}</pre>
<button onclick="copiar()">📋 COPIAR PARA CAPCUT</button>
`;

  } catch (e) {
    resultado.innerHTML = "❌ Erro de conexão.";
    console.error(e);
  } finally {
    botao.disabled = false;
    botao.innerText = "GERAR SHORT";
  }
}

function copiar() {
  const texto = document.querySelector("pre").innerText;
  navigator.clipboard.writeText(texto);
  alert("Roteiro copiado!");
}