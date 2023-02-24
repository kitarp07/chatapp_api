const User = require('../model/User')
const express = require('express')
const bcrypt = require('bcryptjs')


const getAllUsers = (req, res, next) => {
    User.find()
        .then((users) => {
            res.status(201).json(users)
        }).catch((err) => next(err))

}


const getUserById = async (req, res, next) => {

    // try {

    //     const user = await User.find({ _id: req.params.id })
    //     // res.status(201).json({data: user})
    //     res.status(201).json(user)
    // } catch (err) {
    //     res.status(500).json({
    //         success: false
    //     })

    // }

    User.findById(req.params.id)
        .then((user) => {
            res.status(200).json(user);

        }).catch(next)

}

const getUserByUsername = async (req, res, next) => {

    try {

        const user = await User.find({ _id: req.params.id })
        res.status(201).json({ data: user })
    } catch (err) {
        res.status(500).json({
            success: false
        })

    }

    // User.findById(req.params.id)
    //     .then((user) => {
    //         res.status(200).json({ data: user });

    //     }).catch(next)

}

const getUsersExceptId = async (req, res, next) => {
    try {

        const contacts = await User.find({ _id: { $ne: `${req.params.id}`, } });
        console.log("hello")

        res.status(200).json(
            { data: contacts });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err,
        });
    }

}

const updateUser = (req, res, next) => {

    User.findById(req.params.id)
        .then((user) => {
            if (req.body.fname) {
                user.fname = req.body.fname
            }
            if (req.body.lname) {
                user.lname = req.body.lname

            }
            if (req.body.username) {
                user.username = req.body.username
            }

            if (req.body.password) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) return next(err);

                    user.password = hash

                })


            }


            user.save().then(user => {
                console.log(user);
                res.status(201).json({
                    'status': 'User updated successfully',
                    userId: user._id,
                    username: user.username,

                })
            }).catch(next)




        }).catch(next)


}



const deleteUser = (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then((msg) => {
            res.json(msg)
        }).catch(next)

}

//delete all users
const deleteAllUsers = (req, res) => {
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
    updateUser,
    getUsersExceptId
}