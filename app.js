// GARANTE QUE O JS CARREGOU
console.log("✅ app.js carregado");

// FUNÇÃO GLOBAL (OBRIGATÓRIO)
window.gerarShort = function () {

  const tema = document.getElementById("tema").value.trim();
  const plataforma = document.getElementById("plataforma").value;
  const duracao = document.getElementById("duracao").value;
  const estilo = document.getElementById("estilo").value;
  const resultado = document.getElementById("resultado");

  // VALIDAÇÃO SIMPLES
  if (!tema) {
    resultado.innerText = "❌ Digite um tema para gerar o roteiro.";
    return;
  }

  // ROTEIRO GERADO
  const roteiro = `
VIDEO_SCRIPT:

[CENA 1 | 0–3s]
Voz: "Isso não é coincidência…"
Texto na tela: "${tema.toUpperCase()}"

[CENA 2 | 3–${duracao}]
Voz: "${estilo === "Bíblico" ? "A Bíblia já alertava sobre isso…" : "Poucos percebem esse detalhe…"}"
Texto: "Observe com atenção."

[CENA FINAL]
Voz: "Agora volta e repara nesse detalhe."

CAPCUT_PROMPT:
Formato ${plataforma}, vertical 9:16,
duração ${duracao},
estilo ${estilo},
cortes rápidos, zoom leve, música emocional.

RETENCAO_HOOK:
"Isso não é coincidência…"

LOOP_FINAL:
"Agora volta e repara nesse detalhe."

THUMBNAIL:
TEXTO: ${tema.toUpperCase()}
EMOÇÃO: Impacto
VISUAL: Close dramático
`;

  // EXIBE RESULTADO
  resultado.innerText = roteiro;
};