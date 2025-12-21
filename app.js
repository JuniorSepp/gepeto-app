async function gerar() {
  const categoria = document.getElementById("categoria").value;
  const tema = document.getElementById("tema").value;
  const resultado = document.getElementById("resultado");

  resultado.innerHTML = "⏳ Gerando roteiros virais...";

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

    let todosOsRoteiros = "";

    data.shorts.forEach((s, i) => {
      const roteiroViral = `
GANCHO (0–3s):
Você sabia disso sobre ${tema}?

QUEBRA DE PADRÃO (3–7s):
Quase ninguém percebe isso…

DESENVOLVIMENTO:
${s.roteiro}

CTA FINAL:
Segue para a parte 2.
      `.trim();

      todosOsRoteiros += `🎬 SHORT ${i + 1}\n${roteiroViral}\n\n------------------\n\n`;

      const bloco = document.createElement("div");
      bloco.className = "short-bloco";

      bloco.innerHTML = `
        <h3>🎬 Short ${i + 1}</h3>
        <pre>${roteiroViral}</pre>
        <button onclick="copiarTexto(${i})">📋 Copiar roteiro</button>
      `;

      resultado.appendChild(bloco);
      window["roteiro_" + i] = roteiroViral;
    });

    // Botão copiar tudo
    const btnTudo = document.createElement("button");
    btnTudo.className = "btn-copiar-tudo";
    btnTudo.innerText = "📋 Copiar TODOS os roteiros";
    btnTudo.onclick = () => {
      navigator.clipboard.writeText(todosOsRoteiros);
      alert("Todos os roteiros foram copiados!");
    };

    resultado.appendChild(btnTudo);

  } catch (e) {
    resultado.innerHTML = "❌ Erro ao gerar conteúdo.";
  }
}

function copiarTexto(i) {
  navigator.clipboard.writeText(window["roteiro_" + i]);
  alert("Roteiro copiado!");
}