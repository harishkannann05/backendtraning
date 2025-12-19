const mongoose = require("mongoose")
const userdb = require('../librarymodels/usermodel')
const Jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if (!token) {
            return res.send("invalid token")
        }

        const decoded = await Jwt.verify(token, "BACKEND1234")
        if (!decoded) {
            return res.send("no user found")
        }
        console.log("3")

        console.log(decoded)
        const { userId } = decoded;
        console.log(userId)
        const userdata = await userdb.findById(userId)
        if (!userdata) {
            return res.send("user not found")
        }
        console.log(decoded)
        console.log(token)

        req.role = userdata.role
        console.log(req.role)
        next();
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

module.exports = auth;