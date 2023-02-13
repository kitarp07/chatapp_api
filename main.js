require("dotenv").config();
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose")
const path = require("path");
const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messageRoutes')
const chatRoutes = require('./routes/chatRoutes')
const http =require("http")





const app = express()
app.use(cors())
const port = 3002

const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
})

const DB_URI = (process.env.NODE_ENV === 'test')
    ? process.env.TEST_DB_URI
    : process.env.DB_URI




io.on('connection', socket => {
    console.log("connected io")
    console.log(socket.id)

    socket.on("/event", (res)=>{
        console.log(res)

    })
})

server.listen(port, "0.0.0.0", () =>{
    console.log("server started")
})




mongoose.connect(DB_URI)
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


