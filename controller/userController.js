const User = require ('../model/user')

const getUserById = (req,res,next)=>{

    User.findById(req.params.id)
    .then((User) => {
        res.json(User)
        
    }).catch(next)

}


const deleteUser = (req, res, next) =>{
    User.findByIdAndDelete(req.params.id)
    .then((msg)=>{
        res.json(msg)
    }).catch(next)

}

module.exports = {
    getUserById,
    deleteUser,
}