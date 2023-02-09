const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({

    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
    }
}, {timestamps: true})

module.exports = mongoose.model('Message', messageSchema)