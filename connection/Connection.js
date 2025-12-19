const express = require("express")
const mongoose = require("mongoose")
const app = express()

async function ConnectDB() {
    await mongoose.connect("mongodb://localhost:27017/librarymanagement").then(() => {
    // await mongoose.connect("mongodb+srv://librarydb:<hari1234>@cluster10.xyyiokm.mongodb.net/librarymanagement").then(() => {
        console.log("DB Connected")
    }).catch((error) => {
        console.log(error)
    })
}

module.exports=ConnectDB;