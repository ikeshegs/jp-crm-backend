// const dotenv = require('dotenv');
const http = require('http');

// dotenv.config();

const app = require('./app');
const db = require('./config/mongodb');

const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 5000;

const server = http.createServer(app);

async function startServer() {
  db.on('error', console.error.bind(console, 'connection error: '));
  db.once('open', () => {
    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  });
}

startServer();
