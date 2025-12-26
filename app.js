async function gerarRoteiro() {
  const tema = document.getElementById("tema").value;
  const categoria = document.getElementById("categoria").value;
  const resultado = document.getElementById("resultado");

  if (!tema) {
    resultado.innerText = "⚠️ Digite um tema primeiro.";
    return;
  }

  resultado.innerText = "⏳ Gerando roteiro...";

  try {
    const response = await fetch("https://SEU_DOMINIO.n8n.cloud/webhook/gepeto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tema,
        categoria
      })
    });

    if (!response.ok) {
      throw new Error("Erro HTTP: " + response.status);
    }

    const data = await response.json();

    if (!data || !data.roteiro) {
      throw new Error("Resposta sem roteiro");
    }

    resultado.innerText = data.roteiro;

  } catch (err) {
    console.error(err);
    resultado.innerText = "❌ Erro ao gerar roteiro.\n" + err.message;
  }
}