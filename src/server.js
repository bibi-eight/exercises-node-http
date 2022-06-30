/*

  - TODO 1: Criar um servidor que recebe requisições HTTP na porta 8000 e responde com o conteúdo de um arquivo HTML.
  - TODO 2: Se for acessada a URL http://localhost:8000/about deve mostrar o conteúdo da pagina `pages/about.html`
  - TODO 3: Se for acessada a URL http://localhost:8000/ ou http://localhost:8000/home deve mostrar o conteúdo da pagina `pages/index.html`
  - TODO 4: Se for acessada qualquer outro caminho deve mostrar o conteúdo da pagina `pages/404.html`
 

  OBS: Deve ser utilizado apenas os módulos nativos do NODE (http, path, fs, etc), nada de instalar outras libs ( ˘︹˘ )
*/
const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const port = 8000;
const host = "localhost";
const dir = path.resolve(__dirname, "pages");

const server = http.createServer((request, response)=> {
  const myUrl = request.url;
  const param = url.parse(myUrl).path;
  let page = "";
  let status = 0;

  if(param === "/about"){
    page = fs.readFileSync(dir + '/about.html', "utf-8");
    status = 200;
  }
  else if(param === "/home" || param === "/"){
    page = fs.readFileSync(dir + '/index.html', 'utf-8');
    status = 200;
  } else {
    page = fs.readFileSync(dir + '/404.html', "utf-8");
    status = 404;
  }

  response.writeHead(status);
  response.end(page);

});
server.listen(port, host);