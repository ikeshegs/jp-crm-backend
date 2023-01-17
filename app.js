const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const userRouter = require('./routes/v1/userRouter');

const app = express();

app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(morgan('dev'));
app.use(express.json());

app.use(userRouter);

module.exports = app;
