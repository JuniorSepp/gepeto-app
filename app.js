// ===============================
// CONFIG
// ===============================
const WEBHOOK_URL = "https://wjr.app.n8n.cloud/webhook/gerar";

// ===============================
// FUNÇÃO PRINCIPAL
// ===============================
async function gerar() {
  const categoriaEl = document.getElementById("categoria");
  const temaEl = document.getElementById("tema");
  const resultadoEl = document.getElementById("resultado");

  // Segurança básica
  if (!categoriaEl || !temaEl || !resultadoEl) {
    alert("Erro: elementos da página não encontrados.");
    return;
  }

  const categoria = categoriaEl.value;
  const tema = temaEl.value.trim();

  // Feedback visual
  resultadoEl.innerHTML = "⏳ Gerando roteiro...";

  if (!categoria || !tema) {
    resultadoEl.innerHTML = "⚠️ Preencha categoria e tema.";
    return;
  }

  try {
    // ===============================
    // REQUEST
    // ===============================
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        categoria,
        tema
      })
    });

    if (!response.ok) {
      throw new Error("Erro HTTP: " + response.status);
    }

    const data = await response.json();

    // ===============================
    // TRATAMENTO DO RETORNO
    // ===============================
    /*
      Esperado:
      {
        status: "ok",
        categoria: "...",
        tema: "...",
        shorts: [
          {
            titulo: "...",
            roteiro: "..."
          }
        ]
      }
    */

    if (!data || !data.shorts || !Array.isArray(data.shorts)) {
      resultadoEl.innerHTML = "⚠️ Resposta inválida do servidor.";
      return;
    }

    if (data.shorts.length === 0) {
      resultadoEl.innerHTML = "⚠️ Nenhum short retornado.";
      return;
    }

    const short = data.shorts[0];
    const roteiro = short.roteiro || "Sem roteiro.";

    // ===============================
    // RENDER
    // ===============================
    resultadoEl.innerHTML = `
      <pre style="
        background:#111;
        color:#fff;
        padding:16px;
        border-radius:8px;
        white-space:pre-wrap;
        line-height:1.5;
      ">${roteiro}</pre>
    `;

  } catch (erro) {
    console.error("Erro:", erro);
    resultadoEl.innerHTML = "❌ Erro ao conectar com o servidor.";
  }
}