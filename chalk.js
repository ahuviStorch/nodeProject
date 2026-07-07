const http = require('http');
const chalk = require('chalk');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('השרת פועל');
});

const port = 3000;
server.listen(port, () => {
  console.log(chalk.green('✓ השרת רץ על http://localhost:' + port));
  console.log(chalk.yellow('⌛ ממתין לבקשות...'));
  console.log(chalk.red('X לחץ Ctrl+C לעצירה'));
});