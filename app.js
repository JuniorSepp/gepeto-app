function gerar() {
  const tema = document.getElementById("tema").value.trim();
  const estilo = document.getElementById("estilo").value;
  const resultado = document.getElementById("resultado");

  if (!tema) {
    resultado.innerHTML = "⚠️ Digite um tema.";
    return;
  }

  resultado.innerHTML = "⏳ Gerando roteiros virais...";

  // ===== PROMPT DEFINITIVO =====
  const prompt = `
Você é um especialista em vídeos virais para YouTube Shorts.

Crie 3 ROTEIROS CURTOS (até 58s), extremamente virais, baseados no tema abaixo.

TEMA: ${tema}
ESTILO: ${estilo}

REGRAS:
- Gancho forte nos primeiros 2 segundos
- Linguagem simples e emocional
- Pensar como algoritmo
- Criar loop psicológico no final
- NÃO pedir dados
- NÃO explicar regras
- NÃO usar texto genérico

FORMATO FIXO (repita para cada roteiro):

ROTEIRO:
[0–2s] TEXTO NA TELA + VOZ
[3–8s]
[9–20s]
[21–40s]
[41–55s]
[56–58s] LOOP

THUMBNAIL:
TEXTO:
EMOÇÃO:
VISUAL:
`;

  // ===== GERAÇÃO LOCAL (SIMULADA) =====
  // (Aqui depois você troca por IA real se quiser)
  const roteiros = gerarRoteirosMock(tema, estilo);

  renderizar(roteiros);
  salvarHistorico(tema, estilo, roteiros);
}

function gerarRoteirosMock(tema, estilo) {
  return [
    {
      titulo: "Roteiro 1",
      texto: `
[0–2s] "NINGUÉM TE AVISOU ISSO"
[3–8s] "Mas muda tudo sobre ${tema}"
[9–20s] Revelação emocional
[21–40s] Intensificação
[41–55s] Verdade direta
[56–58s] "Agora volta e repara no começo"

THUMBNAIL:
TEXTO: NINGUÉM AVISOU
EMOÇÃO: Curiosidade
VISUAL: Close no rosto + fundo escuro
`
    },
    {
      titulo: "Roteiro 2",
      texto: `
[0–2s] "VOCÊ PERCEBEU ISSO?"
[3–8s] Algo ignorado sobre ${tema}
[9–20s] Quebra de padrão
[21–40s] Conexão emocional
[41–55s] Verdade desconfortável
[56–58s] "Assiste de novo"

THUMBNAIL:
TEXTO: VOCÊ PERCEBEU?
EMOÇÃO: Tensão
VISUAL: Olhos em destaque
`
    },
    {
      titulo: "Roteiro 3",
      texto: `
[0–2s] "ISSO NÃO É NORMAL"
[3–8s] Contexto rápido
[9–20s] Escalada emocional
[21–40s] Conclusão forte
[41–55s] Chamada direta
[56–58s] Loop psicológico

THUMBNAIL:
TEXTO: ISSO NÃO É NORMAL
EMOÇÃO: Medo / Curiosidade
VISUAL: Silhueta + contraste
`
    }
  ];
}

function renderizar(roteiros) {
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";

  roteiros.forEach((r, i) => {
    const bloco = document.createElement("div");
    bloco.style.border = "1px solid #ccc";
    bloco.style.padding = "12px";
    bloco.style.marginBottom = "12px";

    bloco.innerHTML = `
      <h3>${r.titulo}</h3>
      <pre style="white-space:pre-wrap">${r.texto}</pre>
      <button onclick="copiar(${i})">📋 Copiar</button>
    `;

    resultado.appendChild(bloco);
    window["roteiro_" + i] = r.texto;
  });
}

function copiar(i) {
  navigator.clipboard.writeText(window["roteiro_" + i]);
  alert("Roteiro copiado!");
}

function salvarHistorico(tema, estilo, roteiros) {
  const historico = JSON.parse(localStorage.getItem("gepetoHistorico") || "[]");
  historico.unshift({ tema, estilo, roteiros, data: new Date().toISOString() });
  localStorage.setItem("gepetoHistorico", JSON.stringify(historico.slice(0, 10)));
}