const express = require('express');
const user = require('../controller/user.controller');
const {isUser} = require('../middleware/auth');

const userRouter = express.Router();

userRouter.post('/signup', isUser, user.signup);
userRouter.post('/signin', isUser, user.signin);
userRouter.get('/all', user.getUsers);

module.exports = userRouter;
