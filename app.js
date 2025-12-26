// === função que será chamada pelo botão ===
function gerarRoteiro() {
  const tema = document.getElementById("tema").value || "";
  const categoria = document.getElementById("categoria").value || "";

  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerText = "Gerando roteiro...";

  fetch("https://SEU_DOMINIO.n8n.cloud/webhook/gepeto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      tema: tema,
      categoria: categoria,
      duracao: "30s"
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log("API RETORNOU:", data); // importante para debug
      resultadoDiv.innerText = data.roteiro || "Roteiro vazio";
    })
    .catch(error => {
      console.error("ERRO NO FETCH:", error);
      resultadoDiv.innerText = "Erro ao gerar roteiro.";
    });
}

// === adiciona o evento de clique ao botão ===
document.getElementById("btnGerar").addEventListener("click", gerarRoteiro);