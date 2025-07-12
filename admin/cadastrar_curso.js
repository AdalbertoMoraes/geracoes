const API_KEY = "AIzaSyAuAMT0zwSTaTvMnEsmDns1Gl-Hl2Cz8Dc";
const SHEET_ID = "1dl3eGzwgKLmoeAIJ3mKH5X045uG_lsoc7DNQdWNy5eM";

function cadastrarCurso() {
  const descricao = document.getElementById("descricao").value.trim();
  const mensagem = document.getElementById("mensagem");

  if (!descricao) {
    mensagem.textContent = "Por favor, preencha a descrição.";
    mensagem.style.color = "red";
    return;
  }

  const id = generateId();

  const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Base_Cursos!A2:B2:append?valueInputOption=USER_ENTERED&key=${API_KEY}`;

  const body = {
    values: [[id, descricao]]
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
      mensagem.style.color = "green";
      document.getElementById("descricao").value = "";
    } else {
      mensagem.textContent = "Erro ao cadastrar curso.";
      mensagem.style.color = "red";
      console.error(data);
    }
  })
  .catch(error => {
    mensagem.textContent = "Erro de conexão.";
    mensagem.style.color = "red";
    console.error("Erro:", error);
  });
}

function generateId() {
  return "CURSO_" + Date.now();
}
