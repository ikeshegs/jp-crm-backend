const mongoose = require('mongoose');

const uri = 'mongodb://mongo:27017/jp-crm-db';
const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // IPV4
  useNewUrlParser: true, 
  useUnifiedTopology: true
}

mongoose.connect(uri, options);

mongoose.set('strictQuery', true);

const db = mongoose.connection;

module.exports = db;