async function gerar() {
  const tema = document.getElementById("tema").value.trim();
  const plataforma = document.getElementById("plataforma").value;
  const duracao = document.getElementById("duracao").value;
  const estilo = document.getElementById("estilo").value;

  const resultado = document.getElementById("resultado");
  const btnCopiar = document.getElementById("copiar");

  // Validação mínima (SEM categoria)
  if (!tema) {
    resultado.textContent = "⚠️ Digite um TEMA para o vídeo.";
    btnCopiar.style.display = "none";
    return;
  }

  resultado.textContent = "⏳ Gerando roteiro viral...";
  btnCopiar.style.display = "none";

  const prompt = `
Você é o GEPETO, especialista em roteiros virais para vídeos curtos.

DADOS:
TEMA: ${tema}
PLATAFORMA: ${plataforma}
DURAÇÃO: ${duracao}
ESTILO: ${estilo}

INTERPRETAÇÃO DO ESTILO:
- Anime → épico, confronto, detalhe oculto
- Bíblico → solene, espiritual, revelação
- Tecnologia → alerta, impacto, futuro
- Curiosidade → surpresa, revelação
- Dark → mistério, tensão psicológica

REGRAS:
- NÃO pedir informações
- NÃO validar campos
- Criar narrativa falável
- Pensar como algoritmo
- Prender atenção nos primeiros 3 segundos

FORMATO FIXO:

VIDEO_SCRIPT:
CENA 1 (0–3s):
Voz:
Texto na tela:
Visual:

CENA 2 (3–7s):
Voz:
Texto na tela:
Visual:

CENA FINAL (7–${duracao}):
Voz:
Texto na tela:
Visual:

CAPCUT_PROMPT:
RETENCAO_HOOK:
LOOP_FINAL:
THUMBNAIL:
TEXTO:
EMOÇÃO:
VISUAL:
`;

  try {
    const response = await fetch("SUA_API_AQUI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer SUA_CHAVE_AQUI"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8
      })
    });

    const data = await response.json();
    const texto = data.choices?.[0]?.message?.content;

    if (!texto) {
      resultado.textContent = "⚠️ A IA não retornou conteúdo.";
      return;
    }

    resultado.textContent = texto;
    btnCopiar.style.display = "block";

  } catch (e) {
    resultado.textContent = "❌ Erro ao gerar roteiro.";
  }
}

function copiar() {
  const texto = document.getElementById("resultado").textContent;
  navigator.clipboard.writeText(texto);
  alert("Roteiro copiado para o CapCut!");
}