const btn = document.getElementById("btn-gerar");
const input = document.getElementById("tema");
const resultado = document.getElementById("resultado");

// ⚠️ ATENÇÃO: use sempre a URL DE PRODUÇÃO do n8n
const WEBHOOK_URL = "https://wjr.app.n8n.cloud/webhook/gepeto";

btn.addEventListener("click", async () => {
  const tema = input.value.trim();

  // 🔒 Validação básica
  if (!tema || tema.length < 3) {
    resultado.innerText = "Digite um tema válido para gerar o roteiro.";
    return;
  }

  // ⏳ Feedback visual
  resultado.innerText = "⏳ Gerando roteiro...";

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tema }),
    });

    if (!response.ok) {
      throw new Error("Erro HTTP: " + response.status);
    }

    const data = await response.json();

    // ✅ TRATAMENTO FINAL DO TEXTO
    const texto = data.roteiro?.trim();

    if (!texto) {
      resultado.innerText = "Não foi possível gerar o roteiro.";
      return;
    }

    resultado.innerText = texto;

  } catch (error) {
    console.error("Erro:", error);
    resultado.innerText = "Erro ao gerar roteiro. Verifique o webhook.";
  }
});