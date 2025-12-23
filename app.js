const WEBHOOK_URL = "https://wjr.app.n8n.cloud/webhook/gerar";

async function gerar() {
  const categoria   = document.getElementById("categoria").value;
  const tema        = document.getElementById("tema").value.trim();
  const plataforma  = document.getElementById("plataforma")?.value || "YouTube Shorts";
  const duracao     = document.getElementById("duracao")?.value || "15 segundos";
  const estilo      = document.getElementById("estilo")?.value || "Épico";

  const resultado = document.getElementById("resultado");
  const botao     = document.getElementById("btnGerar");

  // 🔒 Validação mínima
  if (!categoria || !tema) {
    resultado.innerHTML = "⚠️ Preencha CATEGORIA e TEMA.";
    return;
  }

  botao.disabled = true;
  botao.innerText = "GERANDO...";
  resultado.innerHTML = "⏳ Criando roteiro viral aprovado pelo algoritmo...";

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoria,
        tema,
        plataforma,
        duracao,
        estilo,

        // 🔒 TRAVAS DE COMPORTAMENTO (NÃO REMOVER)
        formato: "shorts",
        orientacao: "vertical 9:16",
        objetivo: "retenção máxima, viralidade, loop psicológico",
        validarTema: true,
        proibidoGenerico: true,
        engine: "gepeto-viral-v1"
      })
    });

    const data = await res.json();
    let roteiro = null;

    // ✅ FORMATO PADRÃO DO GEPETO
    if (data?.shorts?.length && data.shorts[0].roteiro) {
      roteiro = data.shorts[0].roteiro;
    }

    // ✅ FORMATO MESSAGE → MODEL (fallback)
    if (!roteiro && data?.output?.[0]?.content?.[0]?.text) {
      roteiro = data.output[0].content[0].text;
    }

    if (!roteiro || roteiro.toLowerCase().includes("informe a categoria")) {
      resultado.innerHTML = "⚠️ A IA não retornou roteiro válido para esse tema.";
      console.warn("Resposta inválida:", data);
      return;
    }

    // ✅ Render final
    resultado.innerHTML = `
<pre style="
  white-space: pre-wrap;
  background:#000;
  color:#fff;
  padding:16px;
  border-radius:10px;
  font-size:14px;
  line-height:1.7;
  border:1px solid #222;
">
${roteiro}
</pre>

<button onclick="copiarRoteiro()" style="
  margin-top:12px;
  padding:14px;
  width:100%;
  background:#e50914;
  color:white;
  border:none;
  border-radius:8px;
  font-weight:bold;
  font-size:15px;
  cursor:pointer;
">
📋 COPIAR PARA CAPCUT / IA DE VÍDEO
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

// 📋 Copiar roteiro
function copiarRoteiro() {
  const pre = document.querySelector("#resultado pre");
  if (!pre) return;

  navigator.clipboard.writeText(pre.innerText);
  alert("Roteiro copiado! 🎬🔥");
}