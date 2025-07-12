
const API_KEY = "AIzaSyAuAMT0zwSTaTvMnEsmDns1Gl-Hl2Cz8Dc";
const SHEET_ID = "1dl3eGzwgKLmoeAIJ3mKH5X045uG_lsoc7DNQdWNy5eM";

function cadastrarCurso() {
  const descricao = document.getElementById("descricao").value;
  const mensagem = document.getElementById("mensagem");

  if (!descricao.trim()) {
    mensagem.textContent = "Por favor, preencha a descrição.";
    return;
  }

  const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Base_Cursos!A1:append?valueInputOption=USER_ENTERED&key=${API_KEY}`;

  const body = {
    values: [[descricao]]
  };

  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .then(data => {
    if (data.updates) {
      mensagem.textContent = "Curso cadastrado com sucesso!";
      document.getElementById("descricao").value = "";
    } else {
      mensagem.textContent = "Erro ao cadastrar curso.";
      console.error(data);
    }
  })
  .catch(error => {
    mensagem.textContent = "Erro de conexão.";
    console.error("Erro:", error);
  });
}
