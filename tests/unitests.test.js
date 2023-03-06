const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../main')

const api = supertest(app)
const User = require('../model/User')
const Message = require('../model/Message')
const Chat = require('../model/Chat')


beforeAll(async () => {
    await User.deleteMany({})
    await Message.deleteMany({})
    await Chat.deleteMany({})

})


// user tests

const user = {
    fname: "fname",
    lname: "lname",
    username: "willsmith2",
    password: "willsmith2"
}

test('user registration', async () => {
    await api.post('/user/register').send(user)
        .expect(201)
        .expect(res => {
            console.log(res)
            expect(res.body.status).toContain('success')
        })
})

test('user login', async () => {
    await api.post('/user/login').send(user)
        .expect(201)
        .expect(res => {
            console.log(res)
        })

})



test('user update', async () => {
    const res = await api.post('/user/login').send(user)


    const userr = await User.findOne({ username: user.username })

    const update = {
        fname: "fname2",
        lname: "lname2",
        username: "newwillsmith",

    }


    await api.put(`/user/${userr._id}`).send(update)
        .expect(201)
        .expect(res => {
            console.log(res)
        })

})


test('user delete', async () => {

    const userr = await User.findOne({ username: "newwillsmith" })
    await api.delete(`/user/${userr._id}`).send()
        .expect(200)
        .expect(res => {
            console.log(res)
        })

})


// chat tests


const user1 = {
    fname: "fname1",
    lname: "lname1",
    username: "username1",
    password: "username1"
}

const user2 = {
    fname: "fname2",
    lname: "lname2",
    username: "username2",
    password: "username2"
}


// create chat

test('create chat', async () => {
    const res1 = await api.post('/user/register').send(user1)
    const res2 = await api.post('/user/register').send(user2)

    const u1 = await User.findOne({ username: user1.username })
    const u2 = await User.findOne({ username: user2.username })

   
    const data = {
        senderId: u1._id,
        receiverId: u2._id

    }

    await api.post('/chat').send(data)
        .expect(201)
        .expect(res => {
            console.log(res.body._id)
           
        })

})

//get chat by users

test('get chat by users', async () => {

    const u1 = await User.findOne({ username: user1.username })
    const u2 = await User.findOne({ username: user2.username })

    const data = {
        senderId: u1._id,
        receiverId: u2._id

    }

    await api.get(`/chat/${u1._id}/${u2._id}/chats`).send(data)
        .expect(200)
        .expect(res => {
            

            console.log(res)
        })

})

//get contacts

test('get contacts', async () => {

    const u1 = await User.findOne({ username: user1.username })
    const u2 = await User.findOne({ username: user2.username })


    await api.get(`/user/${u1._id}/contacts`).send()
        .expect(200)
        .expect(res => {
            

            console.log(res)
        })

})



//get chat

test('get chats', async () => {
    await api.get('/chat').send()
    .expect(200)
    .expect(res => {
        

        console.log(res)
    })

})


//get message

test('get all messages', async () => {
    await api.get('/message').send()
    .expect(200)
    .expect(res => {
        console.log(res)
    })

})


//add message

test('send messages', async () => {

    const u1 = await User.findOne({ username: user1.username })
    const u2 = await User.findOne({ username: user2.username })

    const data = {
        chatId: '6400a28c25ac04e747163919',
        sender: "6400a28c25ac04e747163919",
        message: "hi"

    }

    
  
    await api.post('/message').send(data)
    .expect(201)
    .expect(res => {
        
    })

})

test('delete messages', async () => {
    
  
    await api.delete('/message').send()
    .expect(200)
    .expect(res => {
        
    })

})





afterAll(async () => {
    await mongoose.connection.close()
})