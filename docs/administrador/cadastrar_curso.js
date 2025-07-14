function cadastrarCurso() {
  const descricao = document.getElementById("descricao").value.trim();
  const mensagem = document.getElementById("mensagem");

  if (!descricao) {
    mensagem.textContent = "Por favor, preencha a descrição.";
    return;
  }

  const body = { descricao };

  fetch("http://localhost:3000/cursos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(data => {
      if (data.mensagem) {
        mensagem.textContent = "✅ " + data.mensagem;
        document.getElementById("descricao").value = "";
      } else if (data.erro) {
        mensagem.textContent = "❌ " + data.erro;
      } else {
        mensagem.textContent = "⚠️ Erro inesperado.";
        console.log(data);
      }
    })
    .catch(error => {
      mensagem.textContent = "Erro de conexão com a API.";
      console.error("Erro:", error);
    });
}
