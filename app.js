const btn = document.getElementById("gerar");

btn.addEventListener("click", () => {
  const temaSelecionado = document.getElementById("tema").value;
  const categoriaSelecionada = document.getElementById("categoria").value;
  const duracaoSelecionada = document.getElementById("duracao").value;

  const resultado = document.getElementById("resultado");
  resultado.innerText = "Gerando roteiro...";

  fetch("https://SEU_DOMINIO.n8n.cloud/webhook/gepeto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      tema: temaSelecionado,
      categoria: categoriaSelecionada,
      duracao: duracaoSelecionada
    })
  })
    .then(res => res.json())
    .then(data => {
      resultado.innerText = data.roteiro;
    })
    .catch(err => {
      console.error(err);
      resultado.innerText = "Erro ao gerar roteiro.";
    });
});