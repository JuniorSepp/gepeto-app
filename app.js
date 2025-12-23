const WEBHOOK_URL = "https://wjr.app.n8n.cloud/webhook/gerar";

async function gerar() {
  const categoria = document.getElementById("categoria")?.value;
  const tema = document.getElementById("tema")?.value?.trim();
  const plataforma = document.getElementById("plataforma")?.value;
  const duracao = document.getElementById("duracao")?.value;
  const estilo = document.getElementById("estilo")?.value;

  const resultado = document.getElementById("resultado");
  const botao = document.querySelector("button");

  // 🔒 Validação real (front)
  if (!categoria || !tema || !plataforma || !duracao || !estilo) {
    resultado.innerHTML = `
⚠️ Por favor, complete os campos abaixo para que eu possa criar o roteiro viral para você:

CATEGORIA:
TEMA:
PLATAFORMA:
DURAÇÃO:
ESTILO:
`;
    return;
  }

  botao.disabled = true;
  botao.innerText = "GERANDO...";
  resultado.innerHTML = "⏳ Gerando roteiro viral aprovado pelo algoritmo...";

  try {
    const payload = {
      categoria,
      tema,
      plataforma,
      duracao,
      estilo,

      // 🔥 CONTROLE DO COMPORTAMENTO DA IA
      formato: "video_curto",
      orientacao: "vertical_9_16",
      objetivo: "retenção_maxima",
      validarTema: true,
      proibidoGenerico: true,
      engine: "gepeto-viral-v1"
    };

    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    let roteiro = null;

    // ✅ Formato padrão n8n
    if (data?.shorts?.length && data.shorts[0]?.roteiro) {
      roteiro = data.shorts[0].roteiro;
    }

    // ✅ Formato OpenAI
    if (!roteiro && data?.output?.[0]?.content?.[0]?.text) {
      roteiro = data.output[0].content[0].text;
    }

    if (!roteiro) {
      resultado.innerHTML = "⚠️ A IA respondeu, mas não retornou roteiro válido.";
      console.warn("Resposta completa:", data);
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
border-radius:6px;
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