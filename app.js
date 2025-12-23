async function gerar() {
  const categoria = document.getElementById("categoria").value;
  const tema = document.getElementById("tema").value;
  const resultado = document.getElementById("resultado");

  // Feedback visual
  resultado.innerHTML = "⏳ Gerando roteiro...";

  try {
    const response = await fetch(
      "https://wjr.app.n8n.cloud/webhook/gerar",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          categoria,
          tema
        })
      }
    );

    const data = await response.json();

    // Validação de segurança
    if (
      !data ||
      !data.shorts ||
      !data.shorts[0] ||
      !data.shorts[0].roteiro
    ) {
      resultado.innerHTML = "⚠️ Erro ao gerar o roteiro.";
      return;
    }

    // Texto bruto vindo da IA
    const texto = String(data.shorts[0].roteiro);

    // Extrações seguras
    const roteiro = texto
      .split("THUMBNAIL_TEXTO:")[0]
      .replace("ROTEIRO:", "")
      .trim();

    const thumbnailTexto = texto.includes("THUMBNAIL_TEXTO:")
      ? texto.split("THUMBNAIL_TEXTO:")[1].split("THUMBNAIL_EMOÇÃO:")[0].trim()
      : "";

    const thumbnailEmocao = texto.includes("THUMBNAIL_EMOÇÃO:")
      ? texto.split("THUMBNAIL_EMOÇÃO:")[1].split("THUMBNAIL_VISUAL:")[0].trim()
      : "";

    const thumbnailVisual = texto.includes("THUMBNAIL_VISUAL:")
      ? texto.split("THUMBNAIL_VISUAL:")[1].trim()
      : "";

    // Renderização FINAL
    resultado.innerHTML = `
      <div class="card">
        <h3>${data.shorts[0].titulo}</h3>

        <p><strong>🎬 Roteiro:</strong></p>
        <p>${roteiro}</p>

        <hr>

        <p><strong>🖼️ Texto da Thumbnail:</strong></p>
        <p>${thumbnailTexto}</p>

        <p><strong>😱 Emoção:</strong></p>
        <p>${thumbnailEmocao}</p>

        <p><strong>🎨 Prompt Visual:</strong></p>
        <p class="thumbnail-prompt">${thumbnailVisual}</p>

        <button onclick="copiarThumbnail()">📋 Copiar Prompt da Thumbnail</button>
      </div>
    `;

  } catch (error) {
    resultado.innerHTML = "❌ Erro de conexão com o servidor.";
    console.error(error);
  }
}

// Função COMPLETA — não precisa adicionar nada
function copiarThumbnail() {
  const texto = document.querySelector(".thumbnail-prompt")?.innerText;

  if (!texto) {
    alert("Nenhum prompt de thumbnail encontrado.");
    return;
  }

  navigator.clipboard.writeText(texto);
  alert("Prompt da thumbnail copiado!");
}