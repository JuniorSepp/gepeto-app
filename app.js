const WEBHOOK_URL = "https://wjr.app.n8n.cloud/webhook/gerar";

async function gerar() {
  const categoria = document.getElementById("categoria")?.value;
  const tema = document.getElementById("tema")?.value?.trim();
  const plataforma = document.getElementById("plataforma")?.value;
  const duracao = document.getElementById("duracao")?.value;
  const estilo = document.getElementById("estilo")?.value;

  const resultado = document.getElementById("resultado");
  const botao = document.querySelector("button");

  // 🔒 Validação REAL (sem falso negativo)
  if (
    !categoria ||
    !tema ||
    !plataforma ||
    !duracao ||
    !estilo
  ) {
    resultado.innerHTML = `
      <div style="color:#ffb400; font-weight:bold;">
        ⚠️ Preencha TODOS os campos acima para gerar o roteiro.
      </div>
    `;
    return;
  }

  botao.disabled = true;
  botao.innerText = "GERANDO...";
  resultado.innerHTML = "⏳ Criando roteiro viral aprovado pelo algoritmo...";

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoria,
        tema,
        plataforma,
        duracao,
        estilo
      })
    });

    const data = await res.json();

    let texto = null;

    // 🔍 Formato padrão n8n / OpenAI
    if (data?.output?.[0]?.content?.[0]?.text) {
      texto = data.output[0].content[0].text;
    }

    if (!texto) {
      resultado.innerHTML = `
        <div style="color:red;">
          ❌ A IA respondeu, mas não retornou roteiro.
        </div>
      `;
      console.warn("Resposta recebida:", data);
      return;
    }

    // ✅ Renderiza roteiro + botão copiar
    resultado.innerHTML = `
<pre id="roteiro" style="
white-space: pre-wrap;
background:#000;
color:#fff;
padding:16px;
border-radius:8px;
font-size:14px;
line-height:1.6;
">
${texto}
</pre>

<button onclick="copiar()" style="
margin-top:12px;
padding:12px;
width:100%;
background:#e50914;
color:white;
border:none;
border-radius:6px;
font-weight:bold;
font-size:16px;
">
📋 COPIAR PARA CAPCUT
</button>
    `;

  } catch (err) {
    console.error(err);
    resultado.innerHTML = "❌ Erro ao conectar com o servidor.";
  } finally {
    botao.disabled = false;
    botao.innerText = "GERAR SHORT";
  }
}

function copiar() {
  const texto = document.getElementById("roteiro")?.innerText;
  if (!texto) return alert("Nada para copiar.");
  navigator.clipboard.writeText(texto);
  alert("Roteiro copiado para o CapCut 🎬");
}