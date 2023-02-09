require("dotenv").config();
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose")
const path = require("path");
const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messageRoutes')
const chatRoutes = require('./routes/chatRoutes')



const io = require('socket.io')(5000)

const app = express()
app.use(cors())
const port = 3002



// const users = {};

// io.on('connection', socket => {
//     socket.on('user-joined', name => {
//         users[socket.id] = name;
//         socket.broadcast.emit('user joined', name)

//     })

//     socket.on('send', message => {
//         socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
//     })
// })




mongoose.connect('mongodb://127.0.0.1:27017/fchat')
.then(()=>{
    console.log('connected')
    app.listen(port, ()=>{
        console.log(`running on port : ${port}`)
    })
    
}).catch((err)=> console.log(err)) 



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
app.use((err, req,res,next) => {
    console.log(err.stack)
    if(res.statusCode==200) res.status(500)
    res.json({"msg": err.message})
})


