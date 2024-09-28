const express = require('express');
const message = require('../controller/message.controller');

const messageRouter = express.Router();

messageRouter.get('/messages', message.getMessage);
messageRouter.post('/messages', message.saveMessage);

module.exports = messageRouter;
