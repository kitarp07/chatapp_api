const Chat = require('../model/Chat')
const Message = require('../model/Message')
const messageController = require('../controller/messageController');

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

const getChatbyuserId = async (req, res, next) => {


    try {


        const conversation = await Chat.find({ members: { $in: [req.params.userId], } });

        // Chat.find({ members: { $in: [req.params.userId], } }).then(c => {
        //     res.json(c)

        // }).catch(next);

        // for(i=0; i++; i<conversation.length){



        // }






        // res.status(200).json({ data: conversation });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err,
        });
    }
    //
}

const getChatbyusers = async (req, res, next) => {

    try {


        const conversation = await Chat.find({ members: { $in: [req.params.userId && req.params.fId], } });
        console.log(conversation)
        if (conversation === []) {
            res.status(500).json({
                success: false,

            });


        }
        else {
            res.status(200).json({ data: conversation });

        }


        //  res.status(200).json(users);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err,
        });
    }
    //
}

const getFriendsInChat = async (req, res, next) => {

    try {

        const conversation = await Chat.find({ members: { $in: [req.params.userId], } });

        res.status(200).json({ data: conversation });
        // res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err,
        });
    }
    //
}

const addChat = async (req, res, next) => {
    try {

        const chat = await Chat.create({
            members: [req.body.senderId, req.body.receiverId]
        });
        if (chat) {
            // res.status(201).json({ data: chat })
            res.status(201).json(chat)
        }

    }
    catch (err) {
        next(err);

    }
}

const addChat2 = async (req, res, next) => {
    Chat.findOne({ members: [req.params.userId, req.params.friendId] }).then(
        chat => {
            console.log(req.params.userId)
            console.log(req.params.friendId)
            console.log(chat)
            if (chat != null) {
                let err = new Error(`Chat already exists`)
                res.status(400)
                return next(err)

            } else {
                try {

                    // const chat = await Chat.create({
                    //     members: [req.body.senderId, req.body.receiverId]
                    // });
                    // if (chat) {
                    //     // res.status(201).json({ data: chat })
                    //     res.status(201).json(chat)
                    // }
                    Chat.create({
                        members: [req.body.senderId, req.body.receiverId]
                    }).then(c => {
                        res.status(201).json(c)

                    })


                }
                catch (err) {
                    next(err);

                }
            }
        }
    )


}


const deleteChat = async (req, res, next) => {
    Chat.findByIdAndDelete(req.params.id)
        .then((msg) => {

            res.status(201).json({
                data: msg,
                'status': "Chat has been deleted"
            });
        }).catch(next)

}

// const deleteChat = (req, res, next) => {
//     Chat.deleteMany()
//         .then( (msg) => {


//             res.status(200).json(msg)
//         }).catch(next)



// }

const getChatbyId = (req, res, next) => {
    Chat.findById(req.params.id).then(
        (chat) => {
            res.status(200).json({
                success: true,
                message: "Messages",
                data: chat,
            });
            console.log('log')
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
    getChatbyId,
    getChatbyuserId,
    getChatbyusers,
    addChat2
}