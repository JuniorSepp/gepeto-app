// URL DO WEBHOOK n8n (produção)
const WEBHOOK_URL = "https://wjr.app.n8n.cloud/webhook/gerar";

async function gerar() {
  const categoria = document.getElementById("categoria").value;
  const tema = document.getElementById("tema").value.trim();
  const plataforma = document.getElementById("plataforma").value;
  const duracao = document.getElementById("duracao").value;
  const estilo = document.getElementById("estilo").value;

  const resultado = document.getElementById("resultado");
  const botao = document.getElementById("btnGerar");

  // Validação básica
  if (!categoria || !tema) {
    resultado.innerHTML = "⚠️ Preencha a categoria e o tema.";
    return;
  }

  // Feedback visual
  botao.disabled = true;
  botao.innerText = "GERANDO...";
  resultado.innerHTML = "⏳ Gerando roteiro viral...";

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        categoria: categoria,
        tema: tema,
        plataforma: plataforma,
        duracao: duracao,
        estilo: estilo,
        formato: "9:16"
      })
    });

    if (!res.ok) {
      throw new Error("Resposta inválida do servidor");
    }

    const data = await res.json();

    let roteiro = null;

    // FORMATO PADRÃO DO SEU PIPELINE
    if (data?.shorts?.length && data.shorts[0].roteiro) {
      roteiro = data.shorts[0].roteiro;
    }

    // FORMATO ALTERNATIVO (caso venha direto do model)
    if (!roteiro && data?.output?.[0]?.content?.[0]?.text) {
      roteiro = data.output[0].content[0].text;
    }

    if (!roteiro) {
      resultado.innerHTML = "⚠️ A IA respondeu, mas não gerou roteiro.";
      console.warn("Resposta recebida:", data);
      return;
    }

    // Renderização final (CapCut-friendly)
    resultado.innerHTML = `
      <div style="
        background:#000;
        color:#fff;
        padding:16px;
        border-radius:10px;
        font-size:14px;
        line-height:1.6;
        white-space:pre-wrap;
      ">
${roteiro}
      </div>

      <button onclick="copiarRoteiro()" style="
        margin-top:12px;
        padding:12px;
        width:100%;
        background:#e50914;
        color:#fff;
        border:none;
        border-radius:8px;
        font-weight:bold;
        cursor:pointer;
      ">
        📋 COPIAR PARA CAPCUT
      </button>
    `;

  } catch (error) {
    console.error(error);
    resultado.innerHTML = "❌ Erro ao conectar com o servidor.";
  } finally {
    botao.disabled = false;
    botao.innerText = "GERAR SHORT";
  }
}

function copiarRoteiro() {
  const texto = document.querySelector("#resultado div").innerText;
  navigator.clipboard.writeText(texto);
  alert("Roteiro copiado! 🎬");
}