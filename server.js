const http = require('http');

const app = require('./app');
const db = require('./config/mongodb');
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

async function startServer () {
  // Database connection should be here
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("DB Connected successfully");
  });

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();