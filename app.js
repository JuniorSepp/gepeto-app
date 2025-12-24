function gerar() {
  const tema = document.getElementById("tema").value.trim();
  const resultado = document.getElementById("resultado");

  if (!tema) {
    resultado.innerHTML = "⚠️ Digite um tema.";
    return;
  }

  resultado.innerHTML = "⏳ Gerando roteiro viral...";

  // SIMULA IA LOCAL (SEM N8N / SEM API)
  const roteiro = `
ROTEIRO VIRAL – 58s

GANCHO (0–3s):
"${tema}… e quase ninguém percebe isso."

QUEBRA DE PADRÃO (3–7s):
"Isso muda completamente a forma como você vê isso."

DESENVOLVIMENTO:
"${tema} parece comum, mas existe um detalhe que passa despercebido pela maioria.
E é exatamente isso que prende sua atenção sem você notar."

LOOP FINAL:
"Agora volta pro início e repara no detalhe que você ignorou."

THUMBNAIL:
TEXTO: ${tema.toUpperCase()}
EMOÇÃO: Curiosidade
VISUAL: Close no rosto com expressão de choque, fundo escuro, alto contraste
`;

  resultado.innerHTML = `
    <pre style="
      white-space: pre-wrap;
      background:#000;
      color:#fff;
      padding:16px;
      border-radius:8px;
      line-height:1.6;
    ">${roteiro}</pre>

    <button onclick="copiar()" style="
      margin-top:12px;
      padding:12px;
      width:100%;
      background:#e50914;
      color:#fff;
      border:none;
      border-radius:6px;
      font-weight:bold;
    ">
      📋 COPIAR ROTEIRO
    </button>
  `;
}

function copiar() {
  const texto = document.querySelector("pre").innerText;
  navigator.clipboard.writeText(texto);
  alert("Roteiro copiado!");
}