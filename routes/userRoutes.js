const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const User = require('../model/User')
const { nextDay } = require('date-fns')
const userController = require('../controller/userController')
const upload = require('../middleware/upload')

//Validate upload file
const FILE_TYPE_MAP = {
    "image/jpeg": "jpeg",
    "image/png": "png",
    "image/jpg": "jpg",
};


router.post('/register', upload.single("image"), (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (user != null) {
                let err = new Error(`User ${req.body.username} already exists`)
                res.status(400)
                return next(err)
            } bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) return next(err);

                user = new User(
                    {
                        fname: req.body.fname,
                        lname: req.body.lname,
                        username: req.body.username,
                        password: bcrypt.hashSync(req.body.password, 10),

                    }
                )

                if (req.file) {
                    const filename = req.file.filename;
                    user.image = 'images/' + filename
                }
                else {
                    user.image = 'images/avatar.png'
                }


                user.save().then(user => {
                    res.status(201).json({
                        'status': 'User registered successfully',
                        userId: user._id,
                        username: user.username,

                    })
                }).catch(next)
            })
        }).catch(next)

})

router.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (user == null) {
                let err = new Error(`User ${req.body.username} not registered`)
                res.status(404)
                return next(err)
            }

            bcrypt.compare(req.body.password, user.password, (err, statuss) => {
                if (err) return next(err)
                if (!statuss) {
                    let err = new Error('Password does not match')
                    return next(err)
                }
                let data = {
                    userId: user._id,
                    username: user.username

                }
                jwt.sign(data, process.env.SECRET,
                    { 'expiresIn': '1d' },
                    (err, token) => {
                        if (err) return next(err)

                        console.log("logged in")

                        res.status(201).json({
                            'status': 'Login Successful',
                            token: token,
                            user: user,
                            userID: user._id

                        })


                    })


            })

        }).catch(next)


})


router.route('/:id')
    .get(userController.getUserById)
    .delete(userController.deleteUser)

router.put('/:id', upload.single("image"), (req, res, next) => {
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

            if (req.file) {
                const filename = req.file.filename;
                var img = 'images/' + filename;

                user.image = img
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
)

router.route('/:id/contacts')
    .get(userController.getUsersExceptId)



router
    .route('/')
    .get(userController.getAllUsers)
    .delete(userController.deleteAllUsers)



module.exports = router;
