const form = document.getElementById("form");
const inputTema = document.getElementById("tema");
const resultado = document.getElementById("resultado");
const btnCopiar = document.getElementById("copiar");
const selectFormato = document.getElementById("formato");
const selectNicho = document.getElementById("nicho");
const selectModo = document.getElementById("modo");

const WEBHOOK_URL = "https://wjr.app.n8n.cloud/webhook/gepeto";

// =========================
// SUBMIT
// =========================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const tema = inputTema.value.trim();
  if (!tema) {
    resultado.innerText = "Digite um tema para gerar o roteiro.";
    return;
  }

  resultado.innerText = "Gerando roteiro... ⏳";

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tema,
        formato: selectFormato.value,
        nicho: selectNicho.value,
        modo: selectModo.value
      })
    });

    const data = await response.json();

    const texto = data.roteiro?.trim();

    if (!texto) {
      resultado.innerText = "Não foi possível gerar o roteiro.";
      return;
    }

    renderRoteiro(texto);
    salvarHistorico(texto);

  } catch (error) {
    console.error(error);
    resultado.innerText = "Erro ao gerar roteiro. Verifique o webhook.";
  }
});

// =========================
// RENDER ROTEIRO (PRO)
// =========================
function renderRoteiro(texto) {
  resultado.innerHTML = "";

  const linhas = texto.split("\n");

  linhas.forEach(linha => {
    const p = document.createElement("p");

    if (linha.startsWith("**")) {
      p.innerHTML = linha.replace(/\*\*/g, "");
      p.style.fontWeight = "bold";
      p.style.marginTop = "12px";
    } else {
      p.innerText = linha;
    }

    resultado.appendChild(p);
  });

  btnCopiar.style.display = "block";
}

// =========================
// COPIAR
// =========================
btnCopiar.addEventListener("click", () => {
  const texto = resultado.innerText;
  navigator.clipboard.writeText(texto);
  btnCopiar.innerText = "Copiado ✅";

  setTimeout(() => {
    btnCopiar.innerText = "Copiar roteiro";
  }, 2000);
});

// =========================
// HISTÓRICO
// =========================
function salvarHistorico(roteiro) {
  const historico = JSON.parse(localStorage.getItem("historicoRoteiros")) || [];
  historico.unshift({
    roteiro,
    data: new Date().toLocaleString()
  });

  localStorage.setItem("historicoRoteiros", JSON.stringify(historico.slice(0, 10)));
}

// =========================
// PROMPT INTELIGENTE
// =========================
inputTema.addEventListener("input", () => {
  const valor = inputTema.value.toLowerCase();

  if (valor.includes("naruto")) {
    selectNicho.value = "anime";
  }

  if (valor.includes("deus") || valor.includes("bíblia")) {
    selectNicho.value = "biblia";
  }

  if (valor.includes("motivação") || valor.includes("superar")) {
    selectNicho.value = "motivacional";
  }
});