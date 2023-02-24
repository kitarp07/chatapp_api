const Message = require('../model/Message')


const FILE_TYPE_MAP = {
    "image/jpeg": "jpeg",
    "image/png": "png",
    "image/jpg": "jpg",
};

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

       

        

        if (req.file){
            const filename = req.file.filename;
            var img = 'images/' + filename;

            const data = await Message.create({
            
                message: img,
                chatId: req.body.chatId,
                sender: req.body.sender,
               
    
            });
        }
        else{
            const data = await Message.create({
            
                message: req.body.message,
                chatId: req.body.chatId,
                sender: req.body.sender,
               
    
            });
        }
        

        console.log(data);
        if (data) {
            res.status(201).json(data)
        }

    }
    catch (err) {
        next(err);

    }
}

const getMessagebyChatId = async (req, res, next) => {

    try {

        const messages = await Message.find({ chatId: req.params.chatId })

        // res.status(200).json({data: messages});
        res.status(200).json(messages);

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err,
        });
    }
    //
}


const deleteMessage = (req, res, next) => {
    Message.deleteMany()
        .then((msg) => {
            res.json("Succesfully deleted")
        }).catch(next)

}

const deleteMessagebyChatId = (req, res, next) => {
    Message.find({chatId: req.params.chatId})
    .then((messages)=> {
        messages.map((item) => {
            if(item.chatId == req.params.chatId){
                item.delete();
                
            }
        })
        
    }).catch(next)
}

module.exports = {
    getAllMessage,
    addMessage,
    deleteMessage,
    getMessagebyChatId,
    deleteMessagebyChatId
}