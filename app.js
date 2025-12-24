<script>
const WEBHOOK_URL = "https://wjr.app.n8n.cloud/webhook/gerar";

async function gerar() {
  const categoria   = document.getElementById("categoria")?.value;
  const tema        = document.getElementById("tema")?.value.trim();
  const plataforma  = document.getElementById("plataforma")?.value;
  const duracao     = document.getElementById("duracao")?.value;
  const estilo      = document.getElementById("estilo")?.value;

  const resultado = document.getElementById("resultado");
  const botao = document.getElementById("btnGerar");

  // 🔒 VALIDAÇÃO REAL
  if (!categoria || !tema || !plataforma || !duracao || !estilo) {
    resultado.innerHTML = `
      ⚠️ Preencha TODOS os campos:
      <br>- Categoria
      <br>- Tema
      <br>- Plataforma
      <br>- Duração
      <br>- Estilo
    `;
    return;
  }

  botao.disabled = true;
  botao.innerText = "GERANDO...";
  resultado.innerHTML = "⏳ Gerando roteiro viral aprovado pelo algoritmo...";

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoria: categoria,
        tema: tema,
        plataforma: plataforma,
        duracao: duracao,
        estilo: estilo
      })
    });

    const data = await res.json();

    let roteiro = null;

    // 🟢 FORMATO n8n padrão (output do modelo)
    if (data?.output?.[0]?.content?.[0]?.text) {
      roteiro = data.output[0].content[0].text;
    }

    // 🟢 FORMATO alternativo
    if (!roteiro && data?.roteiro) {
      roteiro = data.roteiro;
    }

    if (!roteiro) {
      resultado.innerHTML = "❌ A IA respondeu, mas sem roteiro válido.";
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
font-size:15px;
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
</script>