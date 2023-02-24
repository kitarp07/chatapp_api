require("dotenv").config();
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose")
const path = require("path");
const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messageRoutes')
const chatRoutes = require('./routes/chatRoutes')
const http = require("http")





const app = express()
app.use(cors())
const port = 3002

// const server = http.createServer(app)
// const io = require('socket.io')(server, {
//     cors: {
//         origin: "*"
//     }
// })
const io = require('socket.io')(3003, {
    cors: {
        origin: "*"
    }
});


var clients = {};

let users = []

const DB_URI = (process.env.NODE_ENV === 'test')
    ? process.env.TEST_DB_URI
    : process.env.DB_URI


const addUserToList = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId })
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)

}

const getUser = (userId) => {

    return users.find(user => user.userId === userId)
}


io.on('connection', (socket) => {
    console.log("connected io")
    console.log(socket.id)

    socket.on("/event", (id) => {
        console.log(id)
        clients[id] = socket;
        console.log(clients)

    })

    socket.on("message", (res) => {
        console.log(res)
        let targetId = res.targetId;
        if (clients[targetId]) {
            clients[targetId].emit("message", res)

        }

    })

    socket.on("addUser", userId => {
        addUserToList(userId, socket.id);
        io.emit("getUsers", users);


    });


    //send and get message
    socket.on("sendMsg", ({ senderId, receiverId, message }) => {
        const user = getUser(receiverId);
        io.to(user?.socketId).emit("getMsg", {
            senderId, message,

        });

    });

    socket.on("disconnect", () => {
        console.log("end")
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
})



// server.listen(port, "0.0.0.0", () =>{
//     console.log("server started")
// })




mongoose.connect(DB_URI)
    .then(() => {
        console.log('connected')
        app.listen(port, () => {
            console.log(`running on port : ${port}`)
        })

    }).catch((err) => console.log(err))



app.use(
    "/images",
    express.static(path.join(__dirname, "/images"))
);


//express defined middlware
app.use(express.json())
app.use('/user', userRoutes)
app.use('/chat', chatRoutes)
app.use('/message', messageRoutes)

//error handling middlware 
app.use((err, req, res, next) => {
    console.log(err.stack)
    if (res.statusCode == 200) res.status(500)
    res.json({ "msg": err.message })
})


