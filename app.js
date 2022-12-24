const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const userRouter = require('./routes/users/users.router');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(userRouter);

module.exports = app;