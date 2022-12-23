const express = require('express');

const usersRouter = express.Router();

usersRouter.post('/users', userSignupRouter);

module.exports = usersRouter;