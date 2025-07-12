const cursosEl = document.getElementById("cursos");

fetch("https://sheets.googleapis.com/v4/spreadsheets/1dl3eGzwgKLmoeAIJ3mKH5X045uG_lsoc7DNQdWNy5eM/values/Base_Cursos!A2:B?key=AIzaSyAuAMT0zwSTaTvMnEsmDns1Gl-Hl2Cz8Dc")
  .then(response => response.json())
  .then(data => {
    const cursos = data.values || [];
    if (cursos.length === 0) {
      cursosEl.innerHTML = "<p>Nenhum curso disponível no momento.</p>";
      return;
    }

    const lista = document.createElement("ul");
    cursos.forEach(curso => {
      const li = document.createElement("li");
      li.textContent = curso[1];
      lista.appendChild(li);
    });
    cursosEl.innerHTML = "";
    cursosEl.appendChild(lista);
  })
  .catch(error => {
    console.error("Erro ao buscar cursos:", error);
    cursosEl.innerHTML = "<p>Erro ao carregar cursos. Tente novamente mais tarde.</p>";
  });
