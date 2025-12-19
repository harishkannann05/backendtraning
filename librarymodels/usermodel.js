const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const validator=require('validator')
router.use(express.json())

const userschema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:['student','librarian']
    }
})

const userdb=mongoose.model('user',userschema);

module.exports=userdb;