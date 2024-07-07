const { createServer } = require("node:http");

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, World!");
});

const port = 8080;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
