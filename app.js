// ===== CONFIG =====
const WEBHOOK_URL = "https://wjr.app.n8n.cloud/webhook/gerar";

// ===== FUNÇÃO PRINCIPAL (CHAMADA PELO BOTÃO) =====
async function gerar() {
  const categoria = document.getElementById("categoria").value;
  const tema = document.getElementById("tema").value.trim();
  const output = document.getElementById("resultado");

  // Limpa tela
  output.innerHTML = "⏳ Gerando roteiro...";

  // Validação
  if (!categoria) {
    output.innerHTML = "⚠️ Categoria não selecionada.";
    return;
  }

  if (!tema) {
    output.innerHTML = "⚠️ Tema não preenchido.";
    return;
  }

  try {
    // ===== REQUEST =====
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoria, tema })
    });

    if (!response.ok) {
      throw new Error("Erro na resposta do servidor");
    }

    const data = await response.json();

    // ===== SEGURANÇA =====
    if (!data.shorts || !data.shorts.length) {
      output.innerHTML = "⚠️ O servidor respondeu, mas não retornou shorts.";
      return;
    }

    const short = data.shorts[0];
    const texto = short.roteiro || "";

    // ===== PARSER =====
    const roteiro = extrair(texto, "ROTEIRO:");
    const thumbTexto = extrair(texto, "THUMBNAIL_TEXTO:");
    const emocao = extrair(texto, "THUMBNAIL_EMOÇÃO:");
    const visual = extrair(texto, "THUMBNAIL_VISUAL:");

    // ===== RENDER =====
    output.innerHTML = `
      <h2>🎬 Roteiro</h2>
      <pre>${roteiro}</pre>

      <h2>🖼️ Texto da Thumbnail</h2>
      <pre>${thumbTexto}</pre>

      <h2>😱 Emoção</h2>
      <pre>${emocao}</pre>

      <h2>🎨 Prompt Visual</h2>
      <pre id="prompt">${visual}</pre>

      <button onclick="copiarPrompt()">📋 Copiar Prompt da Thumbnail</button>
    `;

  } catch (err) {
    output.innerHTML = "❌ Erro ao gerar conteúdo.";
    console.error(err);
  }
}

// ===== FUNÇÃO AUXILIAR: EXTRAI BLOCOS =====
function extrair(texto, chave) {
  const inicio = texto.indexOf(chave);
  if (inicio === -1) return "—";

  const corte = texto.substring(inicio + chave.length);
  const fim = corte.search(/\n[A-Z_]+:/);

  return fim === -1
    ? corte.trim()
    : corte.substring(0, fim).trim();
}

// ===== COPIAR PROMPT =====
function copiarPrompt() {
  const texto = document.getElementById("prompt").innerText;
  navigator.clipboard.writeText(texto);
  alert("Prompt copiado!");
}