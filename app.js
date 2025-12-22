async function gerarShorts() {
  const categoria = document.getElementById("categoria").value;
  const tema = document.getElementById("tema").value;

  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "⏳ Gerando conteúdo...";

  try {
    const response = await fetch(
      "https://wjr.app.n8n.cloud/webhook/gepeto",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          categoria: categoria,
          tema: tema
        })
      }
    );

    if (!response.ok) {
      throw new Error("Erro HTTP: " + response.status);
    }

    const data = await response.json();

    // validação de segurança
    if (!data || !data.shorts || !Array.isArray(data.shorts)) {
      throw new Error("Resposta inválida da API");
    }

    renderizarShorts(data.shorts);

  } catch (error) {
    console.error(error);
    resultado.innerHTML = "❌ Erro ao gerar conteúdo.";
  }
}