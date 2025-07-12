document.getElementById('cursoForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const descricao = document.getElementById('descricao').value.trim();

  if (!descricao) return;

  const apiKey = 'AIzaSyAuAMT0zwSTaTvMnEsmDns1Gl-Hl2Cz8Dc';
  const sheetId = '1dl3eGzwgKLmoeAIJ3mKH5X045uG_lsoc7DNQdWNy5eM';
  const sheetName = 'Base_Cursos';

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!B:B:append?valueInputOption=USER_ENTERED&key=${apiKey}`;

  const data = {
    values: [[descricao]]
  };

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.getElementById('status').textContent = 'Curso cadastrado com sucesso!';
    document.getElementById('cursoForm').reset();
  } else {
    document.getElementById('status').textContent = 'Erro ao cadastrar curso.';
    console.error(await response.text());
  }
});