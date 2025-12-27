async function gerarRoteiro() {
  const tema = document.getElementById("tema").value;
  const resultado = document.getElementById("resultado");
  const erro = document.getElementById("erro");

  erro.textContent = "";
  resultado.textContent = "Gerando roteiro...";

  try {
    const res = await fetch("https://wjr.app.n8n.cloud/webhook/gepeto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tema })
    });

    if (!res.ok) {
      throw new Error("Erro HTTP: " + res.status);
    }

    const data = await res.json();

    if (!data.roteiro) {
      throw new Error("Resposta sem roteiro");
    }

    resultado.textContent = data.roteiro;
  } catch (e) {
    console.error(e);
    resultado.textContent = "";
    erro.textContent = "❌ Erro ao gerar roteiro. Verifique o webhook.";
  }
}