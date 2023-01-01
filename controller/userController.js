const User = require ('../model/user')


const deleteUser = (req, res, next) =>{
    User.findByIdAndDelete(req.params.id)
    .then((msg)=>{
        res.json(msg)
    }).catch(next)

}

module.exports = {
    deleteUser,
}