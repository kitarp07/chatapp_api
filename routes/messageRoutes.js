const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const Message = require('../model/Message')
const { nextDay } = require('date-fns')
const messageController = require('../controller/messageController');
const upload = require("../middleware/upload");

const FILE_TYPE_MAP = {
    "image/jpeg": "jpeg",
    "image/png": "png",
    "image/jpg": "jpg"
};

router.route('/')
    .get(messageController.getAllMessage)

router.post('/', upload.single("message"), async (req, res, next) => {
    try {


        const data = new Message({
            chatId: req.body.chatId,
            sender: req.body.sender


        });
        if (req.file) {
            const filename = req.file.filename;
            var img = 'images/' + filename;

            data.message = img
        }
        else {
            data.message = req.body.message
        }
        data.save().then(data => {
            res.status(201).json(data)

        });


       

    }
    catch (err) {
        next(err);

    }


})
    .post(messageController.addMessage)

router.route('/')
    .delete(messageController.deleteMessage)

router.route('/:chatId')
    .get(messageController.getMessagebyChatId)
    .delete(messageController.deleteMessagebyChatId)



module.exports = router;
