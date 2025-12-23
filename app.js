async function gerar() {
  const categoria = document.getElementById("categoria").value;
  const tema = document.getElementById("tema").value;
  const resultado = document.getElementById("resultado");

  resultado.innerHTML = "⏳ Gerando conteúdo...";

  try {
    const res = await fetch("https://wjr.app.n8n.cloud/webhook/gepeto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ categoria, tema })
    });

    const data = await res.json();

    const texto = data.output[0].content[0].text;

    // separa blocos do prompt
    const roteiro = texto.split("THUMBNAIL_TEXTO:")[0]
      .replace("ROTEIRO:", "").trim();

    const thumbTexto = texto.split("THUMBNAIL_TEXTO:")[1]
      .split("THUMBNAIL_EMOÇÃO:")[0].trim();

    const thumbEmocao = texto.split("THUMBNAIL_EMOÇÃO:")[1]
      .split("THUMBNAIL_VISUAL:")[0].trim();

    const thumbVisual = texto.split("THUMBNAIL_VISUAL:")[1].trim();

    resultado.innerHTML = `
      <h3>🎬 ROTEIRO</h3>
      <pre>${roteiro}</pre>
      <button onclick="copiar(\`${roteiro}\`)">📋 Copiar roteiro</button>

      <h3>🖼️ THUMBNAIL – TEXTO</h3>
      <pre>${thumbTexto}</pre>
      <button onclick="copiar(\`${thumbTexto}\`)">📋 Copiar</button>

      <h3>🎭 EMOÇÃO</h3>
      <pre>${thumbEmocao}</pre>
      <button onclick="copiar(\`${thumbEmocao}\`)">📋 Copiar</button>

      <h3>🎨 DESCRIÇÃO VISUAL</h3>
      <pre>${thumbVisual}</pre>
      <button onclick="copiar(\`${thumbVisual}\`)">📋 Copiar</button>
    `;

  } catch (e) {
    resultado.innerHTML = "❌ Erro ao gerar conteúdo.";
  }
}

function copiar(texto) {
  navigator.clipboard.writeText(texto);
  alert("Copiado!");
}