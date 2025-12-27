const btn = document.getElementById("btnGerar");
const resultado = document.getElementById("resultado");

btn.addEventListener("click", async () => {
  const tema = document.getElementById("tema").value.trim();

  if (!tema) {
    resultado.textContent = "Digite um tema.";
    return;
  }

  resultado.textContent = "⏳ Gerando roteiro...";

  try {
    const response = await fetch(
      "https://wjr.app.n8n.cloud/webhook/gepeto",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ tema })
      }
    );

    const text = await response.text();
    console.log("Resposta crua:", text);

    const data = JSON.parse(text);

    if (!data.roteiro) {
      throw new Error("Resposta sem roteiro");
    }

    resultado.textContent = data.roteiro;

  } catch (err) {
    console.error(err);
    resultado.textContent =
      "❌ Erro ao gerar roteiro. Verifique o webhook.";
  }
});