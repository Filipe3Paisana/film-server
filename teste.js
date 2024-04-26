import { readFile } from 'node:fs';

readFile('arquivo2.txt', 'utf8', (err, data) => {
  if (err) {
    console.error("Erro ao ler o arquivo:", err);
    return;
  }
  console.log("Conteúdo do arquivo:", data);
});
