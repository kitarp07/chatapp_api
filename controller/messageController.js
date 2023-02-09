const Message = require('../model/Message')

const getAllMessage = (req, res, next) => {
    Message.find({}).then(
        (msg) => {
            res.status(200).json({
                success: true,
                message: "Messages",
                data: msg,
            });
        }).catch(
            (err) => {
                res.status(500).json({
                    success: false,
                    message: err,
                });
            }
        ); //

}

const addMessage = async (req, res, next) => {
    try {

        const data = await Message.create({
            message: req.body.message,
            chatId: req.body.chatId,
            sender: req.body.sender,

        });
        if (data) {
            res.json(data)
        }

    }
    catch (err) {
        next(err);

    }
}

const getMessagebyChatId = async (req, res, next) => {

    try {

        const messages = await Message.find({ chatId: req.params.chatId })

        res.status(200).json({
            success: true,
            message: "Messages",
            data: messages,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err,
        });
    }
    //
}


const deleteMessage = (req, res, next) => {
    Message.findByIdAndDelete(req.params.id)
        .then((msg) => {
            res.json("Succesfully deleted")
        }).catch(next)

}

module.exports = {
    getAllMessage,
    addMessage,
    deleteMessage,
    getMessagebyChatId
}