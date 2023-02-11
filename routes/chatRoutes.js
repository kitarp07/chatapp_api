const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const User = require('../model/Message')
const { nextDay } = require('date-fns')
const chatController = require('../controller/chatController')


router.route('/')
    .get(chatController.getAllChat)

    .post(chatController.addChat)

router.route('/:id/messages')
    .get(chatController.getChatbyId)

router.route('/:userId/chats')
    .get(chatController.getChatbyuserId)

module.exports = router;
