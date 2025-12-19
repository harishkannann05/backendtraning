const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const userdb = require('../librarymodels/usermodel')
const Jwt = require('jsonwebtoken')
const auth = require('../middleware/middleware')
router.use(express.json())

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        if (!validator.isEmail(email)) {
            return res.send("Enter valid email")
        }
        if (!validator.isStrongPassword(password)) {
            return res.send({ message: "Enter strong password" })
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const user = new userdb({
            name,
            email,
            password: hashedpassword,
            role
        })
        await user.save()
        res.send(user)
        console.log("Signup succesfull")
    } catch (error) {
        res.json({ message: error })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userdb.findOne({ email: email })

        if (!user) {
            console.log("invalid user")
            return res.json({ message: "invalid user" })
        }
        const verifypassword = await bcrypt.compare(password, user.password)
        if (!verifypassword) {
            return res.json({ message: "invalid password" })

         }
        // if (user.role == 'student') {
        //     res.json({ message: "logined as student" })
        // }
        const token = Jwt.sign({ userId: user._id }, "BACKEND1234")
        console.log("token")
        res.cookie("token", token)
        console.log("Login successful !")
        // res.json("logined as librarian")
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})

router.get('/show', auth,async (req, res) => {
    try {
        const role=req.role
        if(role!="librarian"){
            return res.send("you not have Permission")
        }
        console.log(role)
        const user = await userdb.find();
        res.json(user)
    } catch (error) {
        res.json(error)
    }
})

router.post('/adduser', async (req, res) => {
    try {
        const { name, email } = req.body
        const newuser = new userdb({
            name,
            email
        })
        await newuser.save()
        res.send(newuser)
    } catch (error) {
        res.json(error)
    }
})

router.delete('/delete/:id', auth,async (req, res) => {
    try {
        const { id } = req.params
         const role=req.role
        if(role!="librarian"){
            return res.send("you not have Permission")
        }
        const deleted = await userdb.findByIdAndDelete(id)
        res.json(deleted)
    } catch (error) {
        res.send(error)
    }
})

const user = [
    {
        id: 1,
        name: "hari",
        email: "hari@gmail.com"
    },
    {
        id: 2,
        name: "ragu",
        email: "ragu@gmail.com"
    },
    {
        id: 3,
        name: "kala",
        email: "kala@gmail.com"
    },
]

router.get('/get', (req, res) => {
    res.send(user);
})

router.post('/add', (req, res) => {
    const { id, name, email } = req.body;
    const newuser = { id, name, email };
    user.push(newuser);
    res.send(user);
})

module.exports = router
