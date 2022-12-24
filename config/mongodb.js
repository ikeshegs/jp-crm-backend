const mongoose = require('mongoose');

const uri = 'mongodb://mongo:27017/jp-crm-db';
const options = {
  autoIndex: false,
  maxPoolSize: 10, 
  serverSelectionTimeoutMS: 5000, 
  socketTimeoutMS: 45000,
  family: 4
}

mongoose.connect(uri, options);

mongoose.set('strictQuery', true);

const db = mongoose.connection;

module.exports = db;