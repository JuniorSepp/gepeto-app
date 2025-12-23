const WEBHOOK_URL = "https://wjr.app.n8n.cloud/webhook/gerar";

async function gerar() {
  const categoria = document.getElementById("categoria").value;
  const tema = document.getElementById("tema").value.trim();
  const plataforma = document.getElementById("plataforma").value;
  const duracao = document.getElementById("duracao").value;
  const estilo = document.getElementById("estilo").value;

  const resultado = document.getElementById("resultado");
  const botao = document.getElementById("btnGerar");

  // 🔒 Validação REAL
  if (!categoria || !tema || !plataforma || !duracao || !estilo) {
    resultado.innerHTML = `
      ⚠️ Por favor, forneça todos os dados obrigatórios:
      <br>- CATEGORIA
      <br>- TEMA
      <br>- PLATAFORMA
      <br>- DURAÇÃO
      <br>- ESTILO
    `;
    return;
  }

  botao.disabled = true;
  botao.innerText = "GERANDO...";
  resultado.innerHTML = "⏳ Gerando roteiro viral otimizado para algoritmo...";

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

    let roteiro = null;

    // ✅ FORMATO PADRÃO FINAL
    if (data?.shorts?.length && data.shorts[0].roteiro) {
      roteiro = data.shorts[0].roteiro;
    }

    // ✅ FORMATO MESSAGE A MODEL (n8n)
    if (!roteiro && data?.output?.[0]?.content?.[0]?.text) {
      roteiro = data.output[0].content[0].text;
    }

    if (!roteiro) {
      resultado.innerHTML = "⚠️ A IA não retornou roteiro. Verifique o fluxo no n8n.";
      console.warn("Resposta da IA:", data);
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
">
${roteiro}
</pre>

<button onclick="copiar()" style="
margin-top:12px;
padding:12px;
width:100%;
background:#e50914;
color:white;
border:none;
border-radius:8px;
font-weight:bold;
font-size:16px;
">
📋 COPIAR PARA CAPCUT
</button>
`;

  } catch (err) {
    console.error(err);
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