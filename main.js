const exp = require('express')
const path = require('path')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')

const app = exp()
const port = 5000


//express defined middleware
app.use(exp.json())

//error handling
app.use((err, req,res,next) => {
    console.log(err.stack)
    if(res.statusCode==200) res.status(500)
    res.json({"msg": err.message})
})


//connect to database, port
mongoose.connect('mongodb://127.0.0.1:27017/chat')
.then(()=>{
    console.log('connected')
    app.listen(port, ()=>{
        console.log(`running on port : ${port}`)
    })
    
}).catch((err)=> console.log(err)) 


//routes for users
app.use('/user', userRoutes)