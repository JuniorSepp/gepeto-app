async function gerar() {
  const categoria = document.getElementById("categoria").value;
  const tema = document.getElementById("tema").value;
  const plataforma = document.getElementById("plataforma").value;
  const duracao = document.getElementById("duracao").value;
  const estilo = document.getElementById("estilo").value;

  const resultado = document.getElementById("resultado");

  // VALIDAÇÃO LOCAL (ANTES DA IA)
  if (!categoria || !tema || !plataforma || !duracao || !estilo) {
    resultado.innerHTML = `
      <p style="color:#ff4d4d">
        ⚠️ Preencha TODOS os campos antes de gerar o roteiro.
      </p>
    `;
    return;
  }

  resultado.innerHTML = "⏳ Gerando roteiro viral...";

  try {
    const response = await fetch("SUA_URL_DO_BACKEND_AQUI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        categoria: categoria,
        tema: tema,
        plataforma: plataforma,
        duracao: duracao,
        estilo: estilo
      })
    });

    const data = await response.json();

    // DEBUG — VEJA ISSO NO CONSOLE
    console.log("Resposta IA:", data);

    if (!data || !data.output) {
      resultado.innerHTML = `
        <p style="color:#ff4d4d">
          ❌ A IA não retornou conteúdo.
        </p>
      `;
      return;
    }

    resultado.innerHTML = `
      <pre id="roteiro">${data.output}</pre>
      <button onclick="copiar()">📋 COPIAR PARA CAPCUT</button>
    `;
  } catch (error) {
    console.error(error);
    resultado.innerHTML = `
      <p style="color:#ff4d4d">
        ❌ Erro ao conectar com a IA.
      </p>
    `;
  }
}

function copiar() {
  const texto = document.getElementById("roteiro").innerText;
  navigator.clipboard.writeText(texto);
  alert("Roteiro copiado para o CapCut!");
}