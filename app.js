const WEBHOOK_URL = "https://wjr.app.n8n.cloud/webhook/gerar";

async function gerar() {
  const categoria = document.getElementById("categoria").value;
  const tema = document.getElementById("tema").value.trim();
  const plataforma = document.getElementById("plataforma").value;
  const duracao = document.getElementById("duracao").value;
  const estilo = document.getElementById("estilo").value;

  const resultado = document.getElementById("resultado");
  const botao = document.getElementById("btnGerar");

  // 🔒 Validação dura (impede IA de receber vazio)
  if (!categoria || !tema || !plataforma || !duracao || !estilo) {
    resultado.innerHTML = `
      <pre>
Por favor, preencha TODOS os campos:
- Categoria
- Tema
- Plataforma
- Duração
- Estilo
      </pre>
    `;
    return;
  }

  const payload = {
    categoria,
    tema,
    plataforma,
    duracao,
    estilo
  };

  console.log("ENVIO PARA IA:", payload);

  botao.disabled = true;
  botao.innerText = "GERANDO...";
  resultado.innerHTML = "<pre>⏳ Gerando roteiro viral...</pre>";

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    let texto = null;

    // Formato A (shorts[])
    if (data?.shorts?.length && data.shorts[0].roteiro) {
      texto = data.shorts[0].roteiro;
    }

    // Formato B (output → message)
    if (!texto && data?.output?.[0]?.content?.[0]?.text) {
      texto = data.output[0].content[0].text;
    }

    if (!texto) {
      resultado.innerHTML = `
        <pre>
⚠️ A IA respondeu, mas não retornou roteiro.
Verifique o prompt do n8n.
        </pre>
      `;
      console.warn("Resposta da IA:", data);
      return;
    }

    resultado.innerHTML = `
<pre id="roteiroFinal">${texto}</pre>

<button onclick="copiar()" style="
margin-top:12px;
width:100%;
padding:12px;
background:#e50914;
color:#fff;
border:none;
border-radius:8px;
font-weight:bold;
">
📋 COPIAR PARA CAPCUT
</button>
    `;

  } catch (err) {
    console.error(err);
    resultado.innerHTML = "<pre>❌ Erro ao conectar com o servidor.</pre>";
  } finally {
    botao.disabled = false;
    botao.innerText = "GERAR SHORT";
  }
}

function copiar() {
  const texto = document.getElementById("roteiroFinal").innerText;
  navigator.clipboard.writeText(texto);
  alert("Roteiro copiado! 🎬");
}