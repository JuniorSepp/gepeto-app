async function gerar() {
  const categoria = document.getElementById("categoria").value;
  const tema = document.getElementById("tema").value.trim();
  const resultado = document.getElementById("resultado");

  if (!tema) {
    resultado.innerHTML = "⚠️ Digite um tema.";
    return;
  }

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

    // 🔥 LOG DE SEGURANÇA (não remover)
    console.log("Resposta do servidor:", data);

    if (
      !data ||
      !data.shorts ||
      !Array.isArray(data.shorts) ||
      !data.shorts[0] ||
      !data.shorts[0].roteiro
    ) {
      resultado.innerHTML =
        "⚠️ O servidor respondeu, mas não retornou texto.";
      return;
    }

    const texto = data.shorts[0].roteiro;

    // Extrações
    const roteiro = texto.split("THUMBNAIL_TEXTO:")[0]
      .replace("ROTEIRO:", "")
      .trim();

    const thumbnailTexto =
      texto.split("THUMBNAIL_TEXTO:")[1]
        ?.split("THUMBNAIL_EMOÇÃO:")[0]
        ?.trim() || "";

    const thumbnailEmocao =
      texto.split("THUMBNAIL_EMOÇÃO:")[1]
        ?.split("THUMBNAIL_VISUAL:")[0]
        ?.trim() || "";

    const thumbnailVisual =
      texto.split("THUMBNAIL_VISUAL:")[1]?.trim() || "";

    resultado.innerHTML = `
      <div class="card">
        <h3>🎬 Roteiro</h3>
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
  } catch (e) {
    console.error(e);
    resultado.innerHTML = "❌ Erro ao conectar com o servidor.";
  }
}

function copiarThumbnail() {
  const texto = document.getElementById("thumbPrompt")?.innerText;
  if (!texto) return alert("Nada para copiar.");
  navigator.clipboard.writeText(texto);
  alert("Prompt da thumbnail copiado!");
}