const express=require('express');
const app= express()
app.use(express.json())
const cookieparser=require('cookie-parser')
app.use(cookieparser())
const userrouter=require('./routers/user')
const bookrouter=require('./routers/book')
const Connection =require('./connection/Connection')

app.use('/user',userrouter)
app.use('/book',bookrouter)

app.use('/',(req,res)=>
{
    res.send("home page , type (book,user)to navigate")
})

Connection().then(()=>{
app.listen(7000,()=>{
    console.log("http://localhost:7000")
})
})