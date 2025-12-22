async function gerar() {
  const categoria = document.getElementById("categoria").value;
  const tema = document.getElementById("tema").value;
  const resultado = document.getElementById("resultado");

  if (!tema) {
    alert("Digite um tema");
    return;
  }

  resultado.innerHTML = "⏳ Gerando conteúdos virais...";

  try {
    const res = await fetch("https://wjr.app.n8n.cloud/webhook/gerar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoria, tema })
    });

    const data = await res.json();
    resultado.innerHTML = "";

    let copiarTudo = "";

    data.shorts.forEach((s, i) => {
      const bloco = document.createElement("div");
      bloco.className = "short-bloco";

      const roteiro = s.roteiro;
      const imagemPrompt = s.imagem_prompt;
      const thumbTexto = s.thumbnail.texto;
      const thumbPrompt = s.thumbnail.prompt;

      const plataformas = `
YouTube: ${s.plataformas.youtube}
Instagram: ${s.plataformas.instagram}
TikTok: ${s.plataformas.tiktok}
X (Twitter): ${s.plataformas.x}
      `;

      copiarTudo += `
${s.titulo}
${roteiro}

IMAGEM (VÍDEO):
${imagemPrompt}

THUMBNAIL:
${thumbTexto}
${thumbPrompt}

PLATAFORMAS:
${plataformas}
---------------------
`;

      bloco.innerHTML = `
<h3>🎬 ${s.titulo}</h3>

<pre>${roteiro}</pre>
<button onclick="copiarTexto('roteiro_${i}')">📋 Copiar roteiro</button>

<h4>🖼️ Prompt de IMAGEM (vídeo)</h4>
<pre>${imagemPrompt}</pre>
<button onclick="copiarTexto('imagem_${i}')">📋 Copiar imagem</button>

<h4>🔥 THUMBNAIL VIRAL</h4>
<pre><strong>${thumbTexto}</strong>\n${thumbPrompt}</pre>
<button onclick="copiarTexto('thumb_${i}')">📋 Copiar thumbnail</button>

<h4>📈 Plataformas</h4>
<pre>${plataformas}</pre>

<hr>
      `;

      resultado.appendChild(bloco);

      window[`roteiro_${i}`] = roteiro;
      window[`imagem_${i}`] = imagemPrompt;
      window[`thumb_${i}`] = `${thumbTexto}\n${thumbPrompt}`;
    });

    const btnTudo = document.createElement("button");
    btnTudo.innerText = "📋 Copiar TODOS os conteúdos";
    btnTudo.className = "btn-copiar-tudo";
    btnTudo.onclick = () => copiarDireto(copiarTudo);

    resultado.appendChild(btnTudo);

  } catch (e) {
    resultado.innerHTML = "❌ Erro ao gerar conteúdo.";
  }
}

function copiarTexto(chave) {
  navigator.clipboard.writeText(window[chave]);
  alert("Conteúdo copiado!");
}

function copiarDireto(texto) {
  navigator.clipboard.writeText(texto);
  alert("Tudo copiado!");
}