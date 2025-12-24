function gerarShort() {
  const tema = document.getElementById("tema").value.trim();
  const plataforma = document.getElementById("plataforma").value;
  const duracao = document.getElementById("duracao").value;
  const estilo = document.getElementById("estilo").value;
  const resultado = document.getElementById("resultado");

  if (!tema) {
    resultado.innerText = "Digite um tema para gerar o roteiro.";
    return;
  }

  // GANCHOS VARIÁVEIS
  const ganchos = [
    `Poucos estão preparados para o que isso significa: ${tema}.`,
    `Quase ninguém percebeu esse sinal sobre ${tema}.`,
    `Isso muda completamente a forma como você entende ${tema}.`,
    `Esse detalhe sobre ${tema} está sendo ignorado.`
  ];

  // DESENVOLVIMENTO VARIÁVEL
  const desenvolvimentos = [
    `O que parece simbólico carrega uma mensagem profunda.`,
    `Há uma ligação direta com acontecimentos atuais.`,
    `A maioria passa por isso sem perceber o significado.`,
    `Esse momento revela algo que não pode ser ignorado.`
  ];

  // FECHAMENTOS EM LOOP
  const finais = [
    `Agora assiste de novo com isso em mente.`,
    `Depois disso, você não vê da mesma forma.`,
    `Repara nesse detalhe quando assistir novamente.`,
    `Isso muda tudo quando você entende o contexto.`
  ];

  const hook = ganchos[Math.floor(Math.random() * ganchos.length)];
  const desenvolvimento = desenvolvimentos[Math.floor(Math.random() * desenvolvimentos.length)];
  const final = finais[Math.floor(Math.random() * finais.length)];

  const roteiro = `
VIDEO_SCRIPT:

[CENA 1 | 0–3s]
Voz: "${hook}"
Visual: Impacto imediato, texto grande, corte rápido.

[CENA 2 | 3–${duracao - 3}s]
Voz: "${desenvolvimento}"
Visual: Close dramático, trilha crescente.

[CENA FINAL | ${duracao}s]
Voz: "${final}"
Visual: Pausa + olhar fixo + fade.

CAPCUT_PROMPT:
Formato ${plataforma}, vertical 9:16, estilo ${estilo}, cortes dinâmicos, zoom leve, trilha emocional.

RETENCAO_HOOK:
"${hook}"

LOOP_FINAL:
"${final}"

THUMBNAIL:
Texto: "${tema.toUpperCase()}"
Emoção: Impacto
Visual: Close dramático
`;

  resultado.innerText = roteiro;
}