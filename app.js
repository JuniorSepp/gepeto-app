const WEBHOOK_URL = "https://wjr.app.n8n.cloud/webhook-test/gepeto";

async function gerar() {
  const tema = document.getElementById("tema").value.trim();
  const resultado = document.getElementById("resultado");
  const botao = document.getElementById("btnGerar");

  if (!tema) {
    resultado.innerText = "⚠️ Digite um tema para gerar o roteiro.";
    return;
  }

  botao.disabled = true;
  botao.innerText = "GERANDO...";
  resultado.innerText = "⏳ Gerando roteiro viral...";

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tema: tema
      })
    });

    if (!response.ok) {
      throw new Error("Erro HTTP: " + response.status);
    }

    const data = await response.json();

    // 🔥 LEITURA CORRETA DO JSON DO N8N
    const roteiro =
      data?.output?.[0]?.content?.[0]?.text;

    if (!roteiro) {
      console.error("Resposta recebida:", data);
      resultado.innerText =
        "❌ O servidor respondeu, mas sem texto utilizável.";
      return;
    }

    resultado.innerHTML = `
      <pre style="
        white-space: pre-wrap;
        background: #000;
        color: #fff;
        padding: 16px;
        border-radius: 8px;
        line-height: 1.6;
      ">${roteiro}</pre>

      <button onclick="copiar()" style="
        margin-top: 12px;
        padding: 10px;
        width: 100%;
        background: #e50914;
        color: white;
        border: none;
        border-radius: 6px;
        font-weight: bold;
        cursor: pointer;
      ">
        📋 COPIAR ROTEIRO
      </button>
    `;
  } catch (error) {
    console.error(error);
    resultado.innerText =
      "❌ Erro ao gerar roteiro. Verifique o webhook.";
  } finally {
    botao.disabled = false;
    botao.innerText = "GERAR ROTEIRO";
  }
}

function copiar() {
  const texto = document.querySelector("pre")?.innerText;
  if (!texto) return;

  navigator.clipboard.writeText(texto);
  alert("Roteiro copiado! 🚀");
}