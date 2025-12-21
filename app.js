async function gerar() {
  const categoria = document.getElementById("categoria").value;
  const tema = document.getElementById("tema").value;
  const resultado = document.getElementById("resultado");

  // Validação simples
  if (!tema) {
    resultado.innerHTML = "⚠️ Digite um tema para gerar os shorts.";
    return;
  }

  // Loading
  resultado.innerHTML = "⏳ Gerando roteiros virais...";

  try {
    const res = await fetch("https://wjr.app.n8n.cloud/webhook/gerar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        categoria,
        tema
      })
    });

    if (!res.ok) {
      throw new Error("Erro na requisição");
    }

    const data = await res.json();

    // Limpa resultado
    resultado.innerHTML = "";

    // Segurança
    if (!data.shorts || data.shorts.length === 0) {
      resultado.innerHTML = "❌ Nenhum roteiro gerado.";
      return;
    }

    // Renderiza shorts
    data.shorts.forEach((s, i) => {
      const bloco = document.createElement("div");
      bloco.className = "short-bloco";

      const textoLimpo = s.roteiro.trim();

      bloco.innerHTML = `
        <h3>🎬 ${s.titulo || `Short ${i + 1}`}</h3>

        <pre>${textoLimpo}</pre>

        <button class="btn-copiar" onclick="copiarTexto(${i}, this)">
          📋 Copiar roteiro
        </button>

        <hr>
      `;

      resultado.appendChild(bloco);

      // Guarda texto para cópia
      window[`roteiro_${i}`] = textoLimpo;
    });

  } catch (e) {
    console.error(e);
    resultado.innerHTML = "❌ Erro ao gerar conteúdo. Tente novamente.";
  }
}

// Copiar sem alert (UX mobile)
function copiarTexto(i, botao) {
  const texto = window[`roteiro_${i}`];

  if (!texto) return;

  navigator.clipboard.writeText(texto).then(() => {
    const textoOriginal = botao.innerText;
    botao.innerText = "✅ Copiado!";
    botao.disabled = true;

    setTimeout(() => {
      botao.innerText = textoOriginal;
      botao.disabled = false;
    }, 1500);
  });
}