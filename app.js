const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('ברוכים הבאים לשרת Node.js');
});

const port = 3000;
server.listen(port, () => {
  console.log(`השרת רץ על http://localhost:${port}`);
});