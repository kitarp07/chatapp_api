const Chat = require('../model/Chat')

const getAllChat = (req, res, next) => {
    Chat.find({}).then(
        (chat) => {
            res.status(200).json({
                success: true,
                message: "Messages",
                data: chat,
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

const addChat = async (req, res, next) => {
    try {

        const chat = await Chat.create({
            members: [req.body.senderId, req.body.receiverId],


        });
        if (chat) {
            res.json(chat)
        }

    }
    catch (err) {
        next(err);

    }
}


const deleteChat = (req, res, next) => {
    Chat.findByIdAndDelete(req.params.id)
        .then((msg) => {
            res.json("Succesfully deleted")
        }).catch(next)

}

const getChatbyId = (req, res, next) => {
    Chat.findById(req.params.id).then(
        (chat) => {
            res.status(200).json({
                success: true,
                message: "Messages",
                data: chat,
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



module.exports = {
    getAllChat,
    addChat,
    deleteChat,
    getChatbyId
}