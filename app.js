const btn = document.getElementById("btn");
const input = document.getElementById("tema");
const resultado = document.getElementById("resultado");
const erro = document.getElementById("erro");

// 👉 URL DE PRODUÇÃO DO N8N
const WEBHOOK_URL = "https://wjr.app.n8n.cloud/webhook/gepeto";

btn.addEventListener("click", async () => {
  const tema = input.value.trim();

  resultado.textContent = "";
  erro.textContent = "";

  if (!tema) {
    erro.textContent = "Digite um tema para gerar o roteiro.";
    return;
  }

  btn.disabled = true;
  btn.textContent = "GERANDO...";

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

    if (!data.roteiro) {
      throw new Error("Resposta inválida do servidor.");
    }

    resultado.textContent = data.roteiro;
  } catch (e) {
    console.error(e);
    erro.textContent = "Erro ao gerar roteiro. Verifique o webhook.";
  } finally {
    btn.disabled = false;
    btn.textContent = "GERAR ROTEIRO";
  }
});