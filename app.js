async function gerar() {
  const categoria = document.getElementById("categoria").value;
  const tema = document.getElementById("tema").value;
  const resultado = document.getElementById("resultado");

  resultado.innerHTML = "⏳ Gerando roteiro...";

  try {
    const response = await fetch(
      "https://wjr.app.n8n.cloud/webhook/gerar",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoria, tema })
      }
    );

    const data = await response.json();

    if (
      !data ||
      !data.shorts ||
      !data.shorts[0] ||
      !data.shorts[0].roteiro
    ) {
      resultado.innerHTML = "⚠️ Erro ao gerar o roteiro.";
      return;
    }

    const texto = data.shorts[0].roteiro;

    // Divide os shorts
    const shorts = texto.split("SHORT ").slice(1);

    let html = "";

    shorts.forEach((shortText, index) => {
      const roteiro = extrair(shortText, "ROTEIRO:", "SCRIPT_CAPCUT:");
      const capcut = extrair(shortText, "SCRIPT_CAPCUT:", "THUMBNAIL_TEXTO:");
      const thumbTexto = extrair(shortText, "THUMBNAIL_TEXTO:", "THUMBNAIL_EMOÇÃO:");
      const emocao = extrair(shortText, "THUMBNAIL_EMOÇÃO:", "THUMBNAIL_VISUAL:");
      const visual = extrair(shortText, "THUMBNAIL_VISUAL:", null);

      html += `
        <div class="card">
          <h3>🎬 Short ${index + 1}</h3>

          <p><strong>Roteiro:</strong></p>
          <p>${roteiro}</p>

          <p><strong>Script CapCut:</strong></p>
          <pre>${capcut}</pre>
          <button onclick="copiarTexto(\`${capcut}\`)">📋 Copiar CapCut</button>

          <hr>

          <p><strong>Thumbnail:</strong></p>
          <p><strong>Texto:</strong> ${thumbTexto}</p>
          <p><strong>Emoção:</strong> ${emocao}</p>
          <p><strong>Prompt Visual:</strong></p>
          <p>${visual}</p>

          <button onclick="copiarTexto(\`${visual}\`)">
            📋 Copiar Prompt da Thumbnail
          </button>
        </div>
      `;
    });

    resultado.innerHTML = html;

  } catch (err) {
    console.error(err);
    resultado.innerHTML = "❌ Erro de conexão com o servidor.";
  }
}

// Funções auxiliares
function extrair(texto, inicio, fim) {
  if (!texto.includes(inicio)) return "";
  let parte = texto.split(inicio)[1];
  if (fim && parte.includes(fim)) {
    parte = parte.split(fim)[0];
  }
  return parte.trim();
}

function copiarTexto(texto) {
  navigator.clipboard.writeText(texto);
  alert("Copiado!");
}