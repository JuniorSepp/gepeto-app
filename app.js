async function gerarShort() {
  const tema = document.getElementById("tema").value.trim();
  const plataforma = document.getElementById("plataforma").value;
  const duracao = document.getElementById("duracao").value;
  const estilo = document.getElementById("estilo").value;

  const output = document.getElementById("output");
  output.innerText = "Gerando roteiro...";

  if (!tema || !plataforma || !duracao || !estilo) {
    output.innerText = "Preencha todos os campos.";
    return;
  }

  const prompt = `
Você é um estrategista profissional de conteúdo viral para vídeos verticais.

Crie um roteiro EXTREMAMENTE envolvente, emocional e otimizado para retenção nos primeiros 3 segundos.

DADOS:
TEMA: ${tema}
PLATAFORMA: ${plataforma}
DURAÇÃO: ${duracao}
ESTILO: ${estilo}

REGRAS:
- Não faça perguntas
- Não explique o que está fazendo
- Não use linguagem genérica
- Pense como algoritmo, não como escritor

FORMATO FIXO DE SAÍDA:

VIDEO_SCRIPT:
CENA 1 (0-3s):
CENA 2:
CENA FINAL:

RETENCAO_HOOK:
LOOP_FINAL:

CAPCUT_PROMPT:

THUMBNAIL:
TEXTO:
EMOÇÃO:
VISUAL:
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer SUA_API_KEY"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.85
      })
    });

    const data = await response.json();
    output.innerText = data.choices[0].message.content;

  } catch (err) {
    output.innerText = "Erro ao gerar roteiro.";
  }
}