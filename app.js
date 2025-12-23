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
    console.log("DEBUG:", data); // 👈 IMPORTANTE

    const short = data?.shorts?.[0];
    const texto = short?.roteiro;

    if (!texto) {
      resultado.innerHTML =
        "⚠️ O servidor respondeu, mas não retornou texto.";
      return;
    }

    // Quebra o conteúdo
    const roteiro = texto.split("THUMBNAIL_TEXTO:")[0]
      .replace("ROTEIRO:", "")
      .trim();

    const thumbnailTexto =
      texto.split("THUMBNAIL_TEXTO:")[1]?.split("THUMBNAIL_EMOÇÃO:")[0]?.trim() || "";

    const thumbnailEmocao =
      texto.split("THUMBNAIL_EMOÇÃO:")[1]?.split("THUMBNAIL_VISUAL:")[0]?.trim() || "";

    const thumbnailVisual =
      texto.split("THUMBNAIL_VISUAL:")[1]?.trim() || "";

    resultado.innerHTML = `
      <div class="card">
        <h3>${short.titulo}</h3>

        <p><strong>🎬 Roteiro:</strong></p>
        <p>${roteiro}</p>

        <hr>

        <p><strong>🖼️ Texto da Thumbnail:</strong></p>
        <p>${thumbnailTexto}</p>

        <p><strong>😱 Emoção:</strong></p>
        <p>${thumbnailEmocao}</p>

        <p><strong>🎨 Prompt Visual:</strong></p>
        <p id="thumbPrompt">${thumbnailVisual}</p>

        <button onclick="copiarThumbnail()">📋 Copiar Prompt da Thumbnail</button>
      </div>
    `;
  } catch (err) {
    console.error(err);
    resultado.innerHTML = "❌ Erro de conexão com o servidor.";
  }
}

function copiarThumbnail() {
  const texto = document.getElementById("thumbPrompt").innerText;
  navigator.clipboard.writeText(texto);
  alert("Prompt da thumbnail copiado!");
}