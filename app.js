const webhookUrl = "https://wjr.app.n8n.cloud/webhook/gepeto";

async function gerarRoteiro() {
  const tema = document.getElementById("tema").value;
  const erro = document.getElementById("erro");
  const resultado = document.getElementById("resultado");

  erro.innerText = "";
  resultado.innerText = "Gerando roteiro...";

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tema })
    });

    if (!response.ok) {
      throw new Error("Resposta inválida do servidor");
    }

    const data = await response.json();

    if (!data.roteiro) {
      throw new Error("Roteiro vazio");
    }

    resultado.innerText = data.roteiro;
  } catch (e) {
    resultado.innerText = "";
    erro.innerText = "Erro ao gerar roteiro. Verifique o webhook.";
    console.error(e);
  }
}