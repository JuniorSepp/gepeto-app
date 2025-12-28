const form = document.getElementById("form");
const resultado = document.getElementById("resultado");
const copiarBtn = document.getElementById("copiar");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  resultado.textContent = "⏳ Gerando roteiro...";
  copiarBtn.style.display = "none";

  const payload = {
    tema: document.getElementById("tema").value,
    formato: document.getElementById("formato").value,
    nicho: document.getElementById("nicho").value,
    modo: document.getElementById("modo").value
  };

  try {
    const response = await fetch("COLE_AQUI_SEU_WEBHOOK_N8N", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    const texto = data.roteiro?.trim();

    if (!texto) {
      resultado.textContent = "❌ Não foi possível gerar o roteiro.";
      return;
    }

    resultado.textContent = texto;
    copiarBtn.style.display = "block";

    // HISTÓRICO LOCAL
    const historico = JSON.parse(localStorage.getItem("roteiros") || "[]");
    historico.unshift({
      tema: payload.tema,
      data: new Date().toLocaleString(),
      texto
    });
    localStorage.setItem("roteiros", JSON.stringify(historico.slice(0, 20)));

  } catch (error) {
    resultado.textContent = "❌ Erro ao conectar com o servidor.";
    console.error(error);
  }
});

copiarBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(resultado.textContent);
  copiarBtn.textContent = "✅ Copiado!";
  setTimeout(() => {
    copiarBtn.textContent = "📋 Copiar roteiro";
  }, 2000);
});