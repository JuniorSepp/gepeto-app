function gerar() {
  try {
    const tema = document.getElementById("tema").value.trim();
    const plataforma = document.getElementById("plataforma").value;
    const duracao = document.getElementById("duracao").value;
    const estilo = document.getElementById("estilo").value;

    const resultado = document.getElementById("resultado");
    const copiarBtn = document.getElementById("copiar");

    if (!tema) {
      resultado.innerText = "⚠️ Digite um tema para gerar o roteiro.";
      copiarBtn.style.display = "none";
      return;
    }

    const roteiro = gerarRoteiroLocal(tema, plataforma, duracao, estilo);

    resultado.innerText = roteiro;
    copiarBtn.style.display = "block";
  } catch (e) {
    document.getElementById("resultado").innerText =
      "❌ Erro ao gerar roteiro. Verifique o app.js.";
    console.error(e);
  }
}

function gerarRoteiroLocal(tema, plataforma, duracao, estilo) {
  return `
VIDEO_SCRIPT:

CENA 1 (0–3s)
Voz: "${gancho(estilo)}"
Texto: "${tema.toUpperCase()}"

CENA 2 (3–7s)
Voz: "${meio(estilo)}"
Texto: "Poucos percebem isso…"

CENA FINAL (7–${duracao})
Voz: "${final(estilo)}"
Texto: "Assista até o fim"

CAPCUT_PROMPT:
Formato ${plataforma}, vertical 9:16, estilo ${estilo},
música intensa, cortes rápidos, zoom leve.

RETENCAO_HOOK:
"${gancho(estilo)}"

LOOP_FINAL:
"Agora volta e repara nesse detalhe."

THUMBNAIL:
TEXTO: ${tema.split(" ").slice(0, 3).join(" ").toUpperCase()}
EMOÇÃO: Impacto
VISUAL: Close dramático
`;
}

function gancho(estilo) {
  if (estilo === "Bíblico") return "Isso não é coincidência…";
  if (estilo === "Anime") return "Esse detalhe muda tudo…";
  if (estilo === "Tecnologia") return "Isso está sendo escondido…";
  if (estilo === "Dark Viral") return "Algo está errado…";
  return "Você nunca percebeu isso…";
}

function meio(estilo) {
  if (estilo === "Bíblico") return "A Bíblia já avisava sobre isso.";
  if (estilo === "Anime") return "Poucos fãs notam esse detalhe.";
  if (estilo === "Tecnologia") return "O sistema funciona assim.";
  if (estilo === "Dark Viral") return "Quando entende, não tem volta.";
  return "Veja com atenção.";
}

function final(estilo) {
  if (estilo === "Bíblico") return "Quem crê, entenda.";
  if (estilo === "Anime") return "Agora você vai assistir diferente.";
  if (estilo === "Tecnologia") return "Depois disso, nada é igual.";
  if (estilo === "Dark Viral") return "Você foi avisado.";
  return "Agora você sabe.";
}

function copiar() {
  const texto = document.getElementById("resultado").innerText;
  navigator.clipboard.writeText(texto);
  alert("Roteiro copiado para o CapCut!");
}