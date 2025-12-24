function gerar() {
  const tema = document.getElementById("tema").value.trim();
  const plataforma = document.getElementById("plataforma").value;
  const duracao = document.getElementById("duracao").value;
  const estilo = document.getElementById("estilo").value;

  const resultado = document.getElementById("resultado");
  const btnCopiar = document.getElementById("copiar");

  if (!tema) {
    resultado.textContent = "⚠️ Digite um tema para o vídeo.";
    btnCopiar.style.display = "none";
    return;
  }

  // 🔥 GERADOR LOCAL (NÃO QUEBRA)
  const roteiro = gerarRoteiroLocal(tema, plataforma, duracao, estilo);

  resultado.textContent = roteiro;
  btnCopiar.style.display = "block";
}

function gerarRoteiroLocal(tema, plataforma, duracao, estilo) {
  return `
VIDEO_SCRIPT:

CENA 1 (0–3s):
Voz: "${gancho(estilo, tema)}"
Texto na tela: ${tema.toUpperCase()}
Visual: Close dramático + corte rápido

CENA 2 (3–7s):
Voz: "${meio(estilo)}"
Texto na tela: "Poucos percebem isso…"
Visual: Detalhe revelador + slow motion

CENA FINAL (7–${duracao}):
Voz: "${final(estilo)}"
Texto na tela: "Assista até o fim"
Visual: Fade + impacto emocional

CAPCUT_PROMPT:
Formato ${plataforma}, vertical 9:16, estilo ${estilo}, música intensa, cortes rápidos, zoom leve, legenda grande.

RETENCAO_HOOK:
"${gancho(estilo, tema)}"

LOOP_FINAL:
"Agora volta e repara nesse detalhe."

THUMBNAIL:
TEXTO: ${tema.split(" ").slice(0,3).join(" ").toUpperCase()}
EMOÇÃO: Impacto
VISUAL: Close forte + contraste alto
`;
}

function gancho(estilo, tema) {
  if (estilo === "Bíblico") return `Isso está acontecendo agora e quase ninguém percebe…`;
  if (estilo === "Anime") return `Esse momento muda tudo em ${tema}`;
  if (estilo === "Tecnologia") return `Isso está sendo escondido de você`;
  if (estilo === "Dark") return `Algo está errado… e você vai entender agora`;
  return `Você nunca reparou nisso`;
}

function meio(estilo) {
  if (estilo === "Bíblico") return `A Bíblia já avisava, mas poucos prestaram atenção`;
  if (estilo === "Anime") return `Esse detalhe muda o significado da cena`;
  if (estilo === "Tecnologia") return `O sistema não quer que você perceba`;
  if (estilo === "Dark") return `Quando você entende, não tem mais volta`;
  return `Veja com atenção`;
}

function final(estilo) {
  if (estilo === "Bíblico") return `Quem tem ouvidos, ouça`;
  if (estilo === "Anime") return `Agora você não vai mais assistir igual`;
  if (estilo === "Tecnologia") return `Depois disso, nada é igual`;
  if (estilo === "Dark") return `Você foi avisado`;
  return `Agora você sabe`;
}

function copiar() {
  const texto = document.getElementById("resultado").textContent;
  navigator.clipboard.writeText(texto);
  alert("Roteiro copiado para o CapCut!");
}