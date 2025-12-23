async function gerarShorts() {
  const categoria = document.getElementById("categoria").value;
  const tema = document.getElementById("tema").value;
  const resultado = document.getElementById("resultado");

  if (!categoria || !tema) {
    resultado.innerHTML = "⚠️ Preencha categoria e tema.";
    return;
  }

  resultado.innerHTML = "⏳ Gerando roteiro...";

  try {
    const response = await fetch(
      "https://wjr.app.n8n.cloud/webhook/gerar",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoria, tema }),
      }
    );

    const data = await response.json();

    const texto = data?.shorts?.[0]?.roteiro;

    if (!texto) {
      resultado.innerHTML =
        "⚠️ O servidor respondeu, mas não retornou roteiro.";
      return;
    }

    // Separação dos blocos
    const roteiro = texto.split("THUMBNAIL_TEXTO:")[0]
      .replace("ROTEIRO:", "")
      .trim();

    const thumbnailTexto = texto.split("THUMBNAIL_TEXTO:")[1]
      .split("THUMBNAIL_EMOÇÃO:")[0]
      .trim();

    const thumbnailEmocao = texto.split("THUMBNAIL_EMOÇÃO:")[1]
      .split("THUMBNAIL_VISUAL:")[0]
      .trim();

    const thumbnailVisual = texto.split("THUMBNAIL_VISUAL:")[1]
      .trim();

    resultado.innerHTML = `
      <h3>🎬 Roteiro</h3>
      <p>${roteiro}</p>

      <h3>🖼️ Texto da Thumbnail</h3>
      <p><strong>${thumbnailTexto}</strong></p>

      <h3>😱 Emoção</h3>
      <p>${thumbnailEmocao}</p>

      <h3>🎨 Prompt Visual</h3>
      <p>${thumbnailVisual}</p>

      <button onclick="copiarPrompt()">📋 Copiar Prompt da Thumbnail</button>
    `;

    window.promptThumbnail = thumbnailVisual;

  } catch (err) {
    resultado.innerHTML = "❌ Erro ao conectar com o servidor.";
    console.error(err);
  }
}

function copiarPrompt() {
  navigator.clipboard.writeText(window.promptThumbnail || "");
  alert("Prompt copiado!");
}