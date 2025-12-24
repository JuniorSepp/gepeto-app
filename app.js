const API_KEY = "SUA_API_KEY_AQUI"; // OpenAI ou compatível

async function gerar() {
  const tema = document.getElementById("tema").value.trim();
  const plataforma = document.getElementById("plataforma").value;
  const estilo = document.getElementById("estilo").value;
  const duracao = document.getElementById("duracao").value;

  const resultado = document.getElementById("resultado");
  const botao = document.getElementById("btnGerar");

  if (!tema) {
    resultado.innerText = "⚠️ Digite uma ideia ou tema.";
    return;
  }

  botao.disabled = true;
  botao.innerText = "GERANDO...";
  resultado.innerText = "⏳ Criando roteiro viral...";

  const prompt = `
Você é um especialista em conteúdo viral para vídeos curtos.

TEMA: ${tema}
PLATAFORMA: ${plataforma}
ESTILO: ${estilo}
DURAÇÃO: ${duracao}

REGRAS:
- NÃO pedir informações
- NÃO sair do tema
- NÃO usar frases genéricas
- Gancho forte nos primeiros 2s
- Texto pronto para CapCut / IA de vídeo
- Criar loop psicológico

FORMATO DE SAÍDA (texto corrido, sem cenas):

ROTEIRO_VIRAL:
CAPCUT_PROMPT:
RETENCAO_HOOK:
LOOP_FINAL:
THUMBNAIL:
TEXTO:
EMOÇÃO:
VISUAL:
`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_KEY
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.9
      })
    });

    const data = await res.json();
    const texto = data.choices?.[0]?.message?.content;

    if (!texto) {
      resultado.innerText = "❌ Erro ao gerar roteiro.";
    } else {
      resultado.innerText = texto;
    }

  } catch (e) {
    resultado.innerText = "❌ Erro de conexão.";
    console.error(e);
  } finally {
    botao.disabled = false;
    botao.innerText = "GERAR ROTEIRO";
  }
}