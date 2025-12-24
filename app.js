function gerarShort() {
  const tema = document.getElementById("tema").value.trim();
  const plataforma = document.getElementById("plataforma").value;
  const duracao = document.getElementById("duracao").value;
  const estilo = document.getElementById("estilo").value;

  if (!tema) {
    alert("Digite um tema");
    return;
  }

  const ganchos = [
    "Isso muda completamente a forma como você vê",
    "Poucos perceberam esse detalhe em",
    "Quase ninguém reparou nisso em",
    "Esse detalhe passou despercebido por anos em"
  ];

  const conflitos = [
    "Existe um conflito escondido que muda tudo.",
    "Há um detalhe simbólico que revela algo profundo.",
    "Essa cena esconde uma mensagem poderosa.",
    "O que parece simples tem um significado oculto."
  ];

  const finais = [
    "Agora volta e assiste de novo.",
    "Depois disso, você nunca mais vê igual.",
    "Repara nisso da próxima vez.",
    "Esse detalhe muda tudo."
  ];

  const hook = ganchos[Math.floor(Math.random() * ganchos.length)];
  const conflito = conflitos[Math.floor(Math.random() * conflitos.length)];
  const final = finais[Math.floor(Math.random() * finais.length)];

  const roteiro = `
VIDEO_SCRIPT:

[CENA 1 | 0–3s]
Voz: "${hook} ${tema}."
Visual: Corte rápido + zoom + impacto visual.

[CENA 2 | 3–${duracao - 3}s]
Voz: "${conflito}"
Visual: Close dramático, trilha crescente.

[CENA FINAL | ${duracao}s]
Voz: "${final}"
Visual: Cena forte + pausa dramática.

CAPCUT_PROMPT:
Formato ${plataforma}, vertical 9:16, estilo ${estilo}, cortes rápidos, zoom dinâmico, música intensa