const form = document.getElementById("form");
const resultado = document.getElementById("resultado");
const copiarBtn = document.getElementById("copiar");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  resultado.innerText = "⏳ Gerando roteiro...";
  copiarBtn.style.display = "none";

  const tema = document.getElementById("tema").value;
  const formato = document.getElementById("formato").value;
  const nicho = document.getElementById("nicho").value;
  const modo = document.getElementById("modo").value;

  try {
    const res = await fetch("https://SEU_DOMINIO.n8n.cloud/webhook/gepeto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tema,
        formato,
        nicho,
        modo
      })
    });

    const data = await res.json();
    const texto = data.roteiro?.trim();

    if (!texto) {
      resultado.innerText = "❌ Não foi possível gerar o roteiro.";
      return;
    }

    resultado.innerText = texto;
    copiarBtn.style.display = "block";

  } catch (err) {
    resultado.innerText = "❌ Erro ao gerar roteiro. Verifique o webhook.";
  }
});

copiarBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(resultado.innerText);
  copiarBtn.innerText = "✅ Copiado!";
  setTimeout(() => copiarBtn.innerText = "📋 Copiar roteiro", 1500);
});