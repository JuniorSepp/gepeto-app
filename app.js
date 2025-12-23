const WEBHOOK_URL = "https://wjr.app.n8n.cloud/webhook/gerar";

async function gerar() {
  const categoria = document.getElementById("categoria").value;
  const tema = document.getElementById("tema").value.trim();
  const resultado = document.getElementById("resultado");

  if (!categoria || !tema) {
    resultado.innerHTML = "⚠️ Preencha categoria e tema.";
    return;
  }

  resultado.innerHTML = "⏳ Gerando roteiro dark...";

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoria,
        tema: `
Crie um SCRIPT SHORT DARK de 58 segundos.
Formato EXATO:
- SCENES numeradas
- Texto curto na tela
- Voz emocional
- Ritmo rápido
- Gancho nos primeiros 3 segundos
- Loop psicológico no final
Tema base: ${tema}
`
      })
    });

    const data = await res.json();

    if (!data.shorts || !data.shorts.length) {
      resultado.innerHTML = "⚠️ O servidor respondeu, mas sem roteiro.";
      return;
    }

    const roteiro = data.shorts[0].roteiro;

    resultado.innerHTML = `
<pre style="white-space: pre-wrap; font-size:14px; line-height:1.6">
${roteiro}
</pre>
    `;

  } catch (err) {
    console.error(err);
    resultado.innerHTML = "❌ Erro ao conectar com o servidor.";
  }
}