async function gerar() {
  const categoria = document.getElementById("categoria").value;
  const tema = document.getElementById("tema").value;

  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "⏳ Gerando conteúdo viral...";

  try {
    const res = await fetch("https://SEU-WEBHOOK-AQUI", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoria, tema })
    });

    const data = await res.json();
    resultado.innerHTML = "";

    data.shorts.forEach((s, i) => {
      const bloco = document.createElement("div");
      bloco.className = "short-bloco";

      bloco.innerHTML = `
        <h3>🎬 ${s.titulo}</h3>

        <p><strong>⚡ Hook:</strong><br>${s.hook}</p>

        <pre>${s.roteiro}</pre>

        <p><strong>📢 CTA:</strong> ${s.cta}</p>

        <p><strong>🖼️ Texto da Thumbnail:</strong><br>${s.thumbnail_text}</p>

        <p><strong>🎨 Prompt da Thumbnail:</strong></p>
        <pre>${s.thumbnail_prompt}</pre>

        <p><strong>#️⃣ Hashtags:</strong> ${s.hashtags.join(" ")}</p>

        <button onclick="copiarTudo(${i})">📋 Copiar tudo</button>
        <hr>
      `;

      resultado.appendChild(bloco);
      window[`short_${i}`] = s;
    });

  } catch (e) {
    resultado.innerHTML = "❌ Erro ao gerar conteúdo.";
  }
}

function copiarTudo(i) {
  const s = window[`short_${i}`];
  const texto = `
${s.titulo}

HOOK:
${s.hook}

ROTEIRO:
${s.roteiro}

CTA:
${s.cta}

THUMBNAIL TEXTO:
${s.thumbnail_text}

THUMBNAIL PROMPT:
${s.thumbnail_prompt}

HASHTAGS:
${s.hashtags.join(" ")}
  `;
  navigator.clipboard.writeText(texto);
  alert("Conteúdo completo copiado!");
}