const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const User = require('../model/Message')
const { nextDay } = require('date-fns')
const chatController = require('../controller/chatController');
const { route } = require("./userRoutes");


router.route('/')
    .get(chatController.getAllChat)
    .post(chatController.addChat)

router.route('/:id')
    .delete(chatController.deleteChat)

    .post(chatController.addChat)
router.route('/:id/messages')
    .get(chatController.getChatbyId)

router.route('/:userId/chats')
    .get(chatController.getChatbyuserId)
router.route('/:userId/:fId/chats')
    .get(chatController.getChatbyusers)

router.route('/:userId/:friendId')
    .post(chatController.addChat2)

module.exports = router;

