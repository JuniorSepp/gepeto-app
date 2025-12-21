async function gerar() {
  const categoria = document.getElementById("categoria").value;
  const tema = document.getElementById("tema").value;
  const resultado = document.getElementById("resultado");

  resultado.innerText = "⏳ Gerando shorts...";

  try { 
    const res = await fetch("https://wjr.app.n8n.cloud/webhook/gerar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ categoria, tema })
    });

    const data = await res.json();

    let texto = "";
    data.shorts.forEach((s) => {
      texto += `🎬 ${s.titulo}\n\n${s.roteiro}\n\n----------------\n\n`;
    });

    resultado.innerText = texto;

  } catch (e) {
    resultado.innerText = "❌ Erro ao gerar conteúdo.";
  }
}