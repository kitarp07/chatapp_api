const jwt = require('jsonwebtoken')

const verifyUser = (req, res, next) => {
    if(!req.headers.authorization) {
        let err = new Error("Authorization info missing")
        res.status(400)
    }

    token = req.headers.authorization.split(' ')[1]


    jwt.verify(token, process.env.SECRET, (err, data)=> {
        if(err){
            return next(err)
        }
        else{
            req.user = data
            next()
        }
    })

   

}

module.exports = { 
    verifyUser
}