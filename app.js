const WEBHOOK_URL = "https://wjr.app.n8n.cloud/webhook/gepeto";

const button = document.getElementById("gerar");
const input = document.getElementById("prompt");
const output = document.getElementById("resultado");
const error = document.getElementById("erro");

button.addEventListener("click", async () => {
  const prompt = input.value.trim();

  error.style.display = "none";
  output.textContent = "⏳ Gerando roteiro...";

  if (!prompt) {
    output.textContent = "";
    error.textContent = "Digite um tema.";
    error.style.display = "block";
    return;
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error("Erro HTTP: " + response.status);
    }

    const data = await response.json();

    if (!data.roteiro) {
      throw new Error("Resposta inválida do webhook");
    }

    output.textContent = data.roteiro;

  } catch (err) {
    output.textContent = "";
    error.textContent = "❌ Erro ao gerar roteiro. Verifique o webhook.";
    error.style.display = "block";
    console.error(err);
  }
});