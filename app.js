// ===============================
// Gepeto Shorts - app.js
// ===============================

async function gerar() {
  const categoria = document.getElementById("categoria").value;
  const tema = document.getElementById("tema").value;
  const resultado = document.getElementById("resultado");

  if (!tema) {
    resultado.innerHTML = "⚠️ Digite um tema para gerar os shorts.";
    return;
  }

  resultado.innerHTML = "⏳ Gerando roteiros virais...";

  try {
    const res = await fetch("https://wjr.app.n8n.cloud/webhook/gerar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        categoria: categoria,
        tema: tema
      })
    });

    if (!res.ok) {
      throw new Error("Erro na resposta do servidor");
    }

    const data = await res.json();

    if (!data.shorts || data.shorts.length === 0) {
      resultado.innerHTML = "⚠️ Nenhum roteiro retornado.";
      return;
    }

    resultado.innerHTML = "";

    let todosOsRoteiros = "";

    data.shorts.forEach((s, i) => {
      const bloco = document.createElement("div");
      bloco.className = "short-bloco";

      const texto = `
🎬 ${s.titulo}

${s.roteiro}
`.trim();

      todosOsRoteiros += texto + "\n\n---------------------\n\n";

      bloco.innerHTML = `
        <h3>🎬 ${s.titulo}</h3>
        <pre>${s.roteiro}</pre>
        <button class="btn-copy" onclick="copiarTexto(${i})">📋 Copiar roteiro</button>
        <hr>
      `;

      resultado.appendChild(bloco);

      window["roteiro_" + i] = texto;
    });

    // Botão copiar todos
    const btnTodos = document.createElement("button");
    btnTodos.className = "btn-copy-all";
    btnTodos.innerText = "📋 Copiar TODOS os roteiros";
    btnTodos.onclick = () => copiarTodos(todosOsRoteiros);

    resultado.appendChild(btnTodos);

  } catch (err) {
    console.error(err);
    resultado.innerHTML = "❌ Erro ao gerar conteúdo. Verifique o webhook.";
  }
}

// ===============================
// Copiar funções
// ===============================

function copiarTexto(i) {
  const texto = window["roteiro_" + i];
  navigator.clipboard.writeText(texto).then(() => {
    alert("Roteiro copiado!");
  });
}

function copiarTodos(texto) {
  navigator.clipboard.writeText(texto).then(() => {
    alert("Todos os roteiros foram copiados!");
  });
}