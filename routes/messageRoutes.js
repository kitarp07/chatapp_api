const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const User = require('../model/Message')
const { nextDay } = require('date-fns')
const messageController = require('../controller/messageController')


router.route('/')
    .get(messageController.getAllMessage)

    .post(messageController.addMessage)

router.route('/:id')
    .delete(messageController.deleteMessage)

router.route('/:chatId')
    .get(messageController.getMessagebyChatId)



module.exports = router;
