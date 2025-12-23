const WEBHOOK_URL = "https://wjr.app.n8n.cloud/webhook/gerar";

async function gerar() {
  // 🔹 Captura dos campos
  const categoria = document.getElementById("categoria")?.value || "";
  const tema = document.getElementById("tema")?.value.trim() || "";
  const plataforma = document.getElementById("plataforma")?.value || "";
  const duracao = document.getElementById("duracao")?.value || "";
  const estilo = document.getElementById("estilo")?.value || "";

  const resultado = document.getElementById("resultado");
  const botao = document.querySelector("button");

  // 🔍 Validação rígida (igual backend espera)
  if (!categoria || !tema || !plataforma || !duracao || !estilo) {
    resultado.innerHTML = `
      <p style="color:#ffb703">
        ⚠️ Preencha TODOS os campos para gerar o roteiro viral.
      </p>
    `;
    return;
  }

  // 🔄 UI feedback
  botao.disabled = true;
  botao.innerText = "GERANDO...";
  resultado.innerHTML = "⏳ Gerando roteiro viral aprovado pelo algoritmo...";

  // 🧪 DEBUG (pode remover depois)
  console.log("ENVIO PARA IA:", {
    categoria,
    tema,
    plataforma,
    duracao,
    estilo
  });

  try {
    const res = await fetch(WEBHOOK_URL, {
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

    const data = await res.json();
    let roteiro = null;

    // ✅ FORMATO PADRÃO (Respond to Webhook)
    if (data?.shorts?.length && data.shorts[0]?.roteiro) {
      roteiro = data.shorts[0].roteiro;
    }

    // ✅ FORMATO Message a Model (fallback)
    if (!roteiro && data?.output?.[0]?.content?.[0]?.text) {
      roteiro = data.output[0].content[0].text;
    }

    if (!roteiro) {
      resultado.innerHTML = `
        <p style="color:#ff6b6b">
          ⚠️ A IA não retornou roteiro. Verifique o prompt do n8n.
        </p>
      `;
      console.warn("Resposta da IA:", data);
      return;
    }

    // 🎬 Exibição final
    resultado.innerHTML = `
      <pre style="
        white-space: pre-wrap;
        background:#000;
        color:#fff;
        padding:16px;
        border-radius:8px;
        font-size:14px;
        line-height:1.6;
        margin-bottom:12px;
      ">${roteiro}</pre>

      <button onclick="copiarRoteiro()" style="
        width:100%;
        padding:12px;
        background:#e50914;
        color:#fff;
        border:none;
        border-radius:6px;
        font-weight:bold;
        cursor:pointer;
      ">
        📋 COPIAR PARA CAPCUT
      </button>
    `;

  } catch (erro) {
    console.error("Erro:", erro);
    resultado.innerHTML = `
      <p style="color:#ff6b6b">
        ❌ Erro ao conectar com o servidor.
      </p>
    `;
  } finally {
    botao.disabled = false;
    botao.innerText = "GERAR SHORT";
  }
}

// 📋 Copiar roteiro
function copiarRoteiro() {
  const texto = document.querySelector("#resultado pre")?.innerText;
  if (!texto) return;

  navigator.clipboard.writeText(texto);
  alert("Roteiro copiado! 🎬");
}