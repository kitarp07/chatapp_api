const User = require ('../model/User')
const express = require('express')
const bcrypt = require('bcryptjs')


const getAllUsers = (req,res,next)=>{
    User.find()
    .then((users)=>{
        res.json(users)
    }).catch((err)=> next(err))
   
}


const getUserById = (req,res,next)=>{
    User.findById(req.params.id)
    .then((User) => {
        res.json(User)
        
    }).catch(next)

}

const updateUser = (req, res, next) =>{

    User.findById(req.params.id)
    .then((user) =>{
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) return next(err);
            user.username = req.body.username
            user.password = hash
            if(req.body.role) user.role = req.body.role
            user.save().then(user => {
                res.status(201).json({
                    'status': 'User updated successfully',
                    userId: user._id,
                    username: user.username,
                    role: user.role
                })
            }).catch(next)
        })
       
        
        res.json(user)
    }).catch(next)

    
}



const deleteUser = (req, res, next) =>{
    User.findByIdAndDelete(req.params.id)
    .then((msg)=>{
        res.json(msg)
    }).catch(next)

}

//delete all users
const deleteAllUsers = (req, res)=>{
    User.deleteMany()
    .then((reply) => {
        res.json(reply)
    }).catch(console.log)

}

module.exports = {
    getAllUsers,
    getUserById,
    deleteUser,
    deleteAllUsers,
    updateUser
}