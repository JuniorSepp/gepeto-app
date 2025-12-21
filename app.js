async function gerar() {
  const categoria = document.getElementById("categoria").value;
  const tema = document.getElementById("tema").value;

  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "⏳ Gerando roteiros...";

  try {
    const res = await fetch("https://wjr.app.n8n.cloud/webhook/gerar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ categoria, tema })
    });

    const data = await res.json();
    resultado.innerHTML = "";

    data.shorts.forEach((s, i) => {
      const bloco = document.createElement("div");
      bloco.className = "short-bloco";

      const textoLimpo = s.roteiro;

      bloco.innerHTML = `
        <h3>🎬 ${s.titulo}</h3>
        <pre>${textoLimpo}</pre>
        <button onclick="copiarTexto(${i})">📋 Copiar roteiro</button>
        <hr>
      `;

      resultado.appendChild(bloco);

      window[`roteiro_${i}`] = textoLimpo;
    });

  } catch (e) {
    resultado.innerHTML = "❌ Erro ao gerar conteúdo.";
  }
}

function copiarTexto(i) {
  const texto = window[`roteiro_${i}`];
  navigator.clipboard.writeText(texto);
  alert("Roteiro copiado!");
}