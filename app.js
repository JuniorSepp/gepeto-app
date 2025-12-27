const button = document.getElementById("gerar");
const input = document.getElementById("tema");
const resultado = document.getElementById("resultado");
const erro = document.getElementById("erro");

button.addEventListener("click", async () => {
  erro.textContent = "";
  resultado.textContent = "Gerando roteiro...";

  try {
    const response = await fetch("https://wjr.app.n8n.cloud/webhook/gepeto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tema: input.value || "Curiosidade"
      })
    });

    if (!response.ok) {
      throw new Error("Resposta não OK do servidor");
    }

    const data = await response.json();

    if (!data.roteiro) {
      throw new Error("Roteiro não encontrado na resposta");
    }

    resultado.textContent = data.roteiro;
  } catch (e) {
    console.error(e);
    resultado.textContent = "";
    erro.textContent = "❌ Erro ao gerar roteiro. Verifique o webhook.";
  }
});