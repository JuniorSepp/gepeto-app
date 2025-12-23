async function gerar() {
  const categoria = document.getElementById("categoria").value;
  const tema = document.getElementById("tema").value;
  const resultado = document.getElementById("resultado");

  resultado.innerHTML = "⏳ Gerando...";

  try {
    const response = await fetch("https://wjr.app.n8n.cloud/webhook/gerar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoria, tema })
    });

    if (!response.ok) {
      resultado.innerHTML = "❌ HTTP ERROR: " + response.status;
      return;
    }

    const text = await response.text();

    resultado.innerHTML = `
      <pre style="white-space: pre-wrap; color:#fff;">
${text || "⚠️ RESPOSTA VAZIA"}
      </pre>
    `;

  } catch (err) {
    resultado.innerHTML = "🔥 ERRO JS: " + err.message;
  }
}