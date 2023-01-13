const jwt  = require('jsonwebtoken')

const verifyUser = (req, res, next) =>{
    console.log(req.headers)
    console.log(req.headers.authorization)
    if(!req.headers.authorization){
        let err = new Error( 'Authorization info missing')
        res.status(400)

    }
    token = req.headers.authorization.split(' ')[1]
    console.log(token)

    jwt.verify(token, process.env.SECRET, (err, data)=>{
        if(err){
            return next(err)
        }
        else{

            console.log(data)
            req.user = data
            next()
        }

        
    })
}

const verifyAdmin = (req,res, next)=>{
    if (req.user.role != "Admin") {
        let err = new Error ("Unauthorized")
        res.status(403)
        return next(err)
    }
    next()

}


module.exports = { 
    verifyUser, 
    verifyAdmin
}