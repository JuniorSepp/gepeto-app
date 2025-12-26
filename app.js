async function gerarRoteiro() {
  const tema = document.getElementById("tema").value;
  const categoria = document.getElementById("categoria").value;

  document.getElementById("resultado").innerText = "Gerando roteiro...";

  try {
    const res = await fetch("https://SEU_SUBDOMINIO.n8n.cloud/webhook/gepeto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tema, categoria })
    });

    if (!res.ok) throw new Error("Erro HTTP");

    const data = await res.json();

    if (!data.roteiro) throw new Error("Roteiro vazio");

    document.getElementById("resultado").innerText = data.roteiro;

  } catch (e) {
    document.getElementById("resultado").innerText =
      "Erro ao gerar roteiro. Failed to fetch";
  }
}