# 5 Meses de Nós

Site estático (HTML, CSS e JS puro). Tudo que se edita fica em `js/content.js`.

- **Fotos:** coloque os arquivos em `assets/fotos/` e ajuste `fotos` em `content.js` (nome do arquivo e legenda). Sem a foto, aparece um cartão rosa no lugar.
- **Mensagens dos 5 meses, versículo e carta:** edite `motivos`, `versiculo` e `carta` em `content.js`. No versículo, cole o texto na tradução escolhida em `texto` (uma linha por item) e informe a tradução em `versao`.
- **Data do namoro:** altere `inicio` em `content.js` (formato `AAAA-MM-DDTHH:MM:SS`). O valor atual é só um exemplo.
- **Música:** salve o arquivo como `assets/music/musica.mp3`. Ela só toca depois do clique no botão do topo. Sem o arquivo, o botão fica desativado.
- **Rodar localmente:** abra `index.html` no navegador, ou na pasta rode `python3 -m http.server` e acesse `http://localhost:8000`.
- **Publicar na Vercel:** crie conta em vercel.com, instale a CLI (`npm i -g vercel`), entre na pasta e rode `vercel` (responda as perguntas com Enter; é um site estático, sem build). Para atualizar, rode `vercel --prod`. Também dá para enviar a pasta para um repositório no GitHub e importá-lo pelo painel da Vercel.
