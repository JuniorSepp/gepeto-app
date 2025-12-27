const webhookURL = "https://wjr.app.n8n.cloud/webhook/gepeto"; 
// ⚠️ Use a URL DE PRODUÇÃO do n8n

const temaInput = document.getElementById("tema");
const formatoSelect = document.getElementById("formato");
const nichoSelect = document.getElementById("nicho");
const modoSelect = document.getElementById("modo");
const resultado = document.getElementById("resultado");
const historicoEl = document.getElementById("historico");

document.getElementById("gerar").onclick = gerarRoteiro;
document.getElementById("copiar").onclick = copiarRoteiro;
document.getElementById("limpar").onclick = limparTela;

carregarHistorico();

/* =========================
   FUNÇÕES PRINCIPAIS
========================= */

async function gerarRoteiro() {
  const tema = temaInput.value.trim();

  if (!tema) {
    resultado.innerText = "Digite um tema para gerar o roteiro.";
    return;
  }

  resultado.innerText = "⏳ Gerando roteiro...";

  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tema,
        formato: formatoSelect.value,
        nicho: nichoSelect.value,
        modo: modoSelect.value
      })
    });

    const data = await response.json();
    const texto = data.roteiro?.trim();

    if (!texto) {
      resultado.innerText = "Não foi possível gerar o roteiro.";
      return;
    }

    resultado.innerText = texto;
    salvarHistorico(tema, texto);

  } catch (err) {
    resultado.innerText = "Erro ao gerar roteiro. Verifique o webhook.";
  }
}

function copiarRoteiro() {
  if (!resultado.innerText) return;
  navigator.clipboard.writeText(resultado.innerText);
  alert("Roteiro copiado!");
}

function limparTela() {
  resultado.innerText = "";
  temaInput.value = "";
}

/* =========================
   HISTÓRICO (localStorage)
========================= */

function salvarHistorico(tema, roteiro) {
  const historico = JSON.parse(localStorage.getItem("gepeto_historico")) || [];
  historico.unshift({ tema, roteiro, data: Date.now() });
  localStorage.setItem("gepeto_historico", JSON.stringify(historico.slice(0, 10)));
  carregarHistorico();
}

function carregarHistorico() {
  historicoEl.innerHTML = "";
  const historico = JSON.parse(localStorage.getItem("gepeto_historico")) || [];

  historico.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item.tema;
    li.onclick = () => resultado.innerText = item.roteiro;
    historicoEl.appendChild(li);
  });
}