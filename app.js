// === ELEMENTOS ===
const btnGerar = document.getElementById("gerar");
const resultado = document.getElementById("resultado");
const btnCopiar = document.getElementById("copiar");

// Campos
const temaInput = document.getElementById("tema");
const plataformaSelect = document.getElementById("plataforma");
const duracaoSelect = document.getElementById("duracao");
const estiloSelect = document.getElementById("estilo");

// === CONFIG ===
const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "SUA_API_KEY_AQUI"; // ⚠️ substitua

// === EVENTO ===
btnGerar.addEventListener("click", gerarRoteiro);

// === FUNÇÃO PRINCIPAL ===
async function gerarRoteiro() {
  const tema = temaInput.value.trim();
  const plataforma = plataformaSelect.value;
  const duracao = duracaoSelect.value;
  const estilo = estiloSelect.value;

  if (!tema || !plataforma || !duracao || !estilo) {
    resultado.innerText = "Preencha todos os campos para gerar o roteiro.";
    return;
  }

  resultado.innerText = "Gerando roteiro viral...";
  btnCopiar.style.display = "none";

  const prompt = `
Você é um especialista em vídeos virais para Shorts, Reels e TikTok.

Crie um ROTEIRO COMPLETO e PRONTO PARA USO.

Tema: ${tema}
Plataforma: ${plataforma}
Duração: ${duracao}
Estilo: ${estilo}

REGRAS OBRIGATÓRIAS:
- Não faça perguntas
- Não explique nada
- Não use listas genéricas
- Texto direto, emocional e viral
- Gancho forte nos primeiros 3 segundos

FORMATO FIXO DE SAÍDA:

VIDEO_SCRIPT:
[CENA 1 | 0-3s]
Texto da narração + ação visual

[CENA 2]
Continuação com conflito ou revelação

[CENA 3]
Clímax emocional

RETENCAO_HOOK:
Frase curta e agressiva

LOOP_FINAL:
Frase que faz o vídeo reiniciar

CAPCUT_PROMPT:
Instruções visuais para edição

THUMBNAIL:
TEXTO:
EMOÇÃO:
VISUAL:
`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8
      })
    });

    const data = await response.json();
    console.log("RESPOSTA DA IA:", data);

    const content =
      data?.choices?.[0]?.message?.content ||
      "Erro: a IA não retornou texto. Tente novamente.";

    resultado.innerText = content;
    btnCopiar.style.display = "block";

  } catch (erro) {
    console.error(erro);
    resultado.innerText =
      "Erro ao gerar roteiro. Verifique a API ou conexão.";
  }
}

// === COPIAR PARA CAPCUT ===
btnCopiar.addEventListener("click", () => {
  navigator.clipboard.writeText(resultado.innerText);
  btnCopiar.innerText = "Copiado!";
  setTimeout(() => (btnCopiar.innerText = "COPIAR PARA CAPCUT"), 2000);
});