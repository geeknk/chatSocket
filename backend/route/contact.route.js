const express = require('express');
const { contact } = require('../controller/contact.controller');

const contactRouter = express.Router();

contactRouter.get('/contacts', contact);

module.exports = contactRouter;
