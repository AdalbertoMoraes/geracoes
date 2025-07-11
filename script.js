const apiKey = "AIzaSyAuAMT0zwSTaTvMnEsmDns1Gl-Hl2Cz8Dc";
const sheetId = "1dl3eGzwgKLmoeAIJ3mKH5X045uG_lsoc7DNQdWNy5eM";
const sheetName = "Cursos";

async function carregarCursos() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.values || data.values.length < 2) {
      document.getElementById("cursos").innerHTML = "<p>Nenhum curso encontrado.</p>";
      return;
    }

    const cursos = data.values.slice(1).flat();
    const container = document.getElementById("cursos");

    cursos.forEach(curso => {
      const p = document.createElement("p");
      p.textContent = curso;
      container.appendChild(p);
    });
  } catch (error) {
    console.error("Erro ao carregar cursos:", error);
    document.getElementById("cursos").innerHTML = "<p>Erro ao carregar os cursos.</p>";
  }
}

document.addEventListener("DOMContentLoaded", carregarCursos);