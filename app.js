const btn = document.getElementById("gerar");
const resultado = document.getElementById("resultado");

btn.addEventListener("click", async () => {
  const tema = document.getElementById("tema").value.trim();
  const categoria = document.getElementById("categoria").value;

  if (!tema) {
    resultado.innerText = "Digite um tema.";
    return;
  }

  resultado.innerText = "Gerando roteiro...";

  try {
    const response = await fetch(
      "https://SEU_DOMINIO.n8n.cloud/webhook/gepeto",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tema,
          categoria
        })
      }
    );

    if (!response.ok) {
      throw new Error("Erro HTTP");
    }

    const data = await response.json();

    if (!data.roteiro || data.roteiro.trim() === "") {
      throw new Error("Roteiro vazio");
    }

    resultado.innerText = data.roteiro;

  } catch (err) {
    console.error(err);
    resultado.innerText = "Erro ao gerar roteiro.";
  }
});