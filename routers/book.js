const express = require("express");
const book = express.Router()
const mongoose = require('mongoose')
book.use(express.json())
const auth = require('../middleware/middleware')

const bookschema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  isAvailable: {
    type: Boolean,
    required: true
  }
})

const bookdb = mongoose.model('books', bookschema)

book.get('/show', auth, async (req, res) => {
  try {
    const role = req.role
    if (role != "librarian") {
      return res.send("you not have Permission")
    }
    const book = await bookdb.find()
    res.json(book)
  } catch {
    res.send(error)
  }
})

book.post('/add', async (req, res) => {
  try {
    const role = req.role
    if (role != "librarian") {
      return res.send("you not have Permission")
    }
    const { name, author, isAvailable } = req.body;
    const newbook = new bookdb({
      name,
      author,
      isAvailable
    })
    await newbook.save()
    res.json(newbook)
  } catch (error) {
    res.send(error)
  }
})

book.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await bookdb.findByIdAndDelete(id)
    res.json(deleted)
  } catch (error) {
    res.send(error)
  }
})

// const books = [
//   {
//     id: 1,
//     name: "atomichabits",
//     author: "ragu",
//     isAvailable: true
//   },
//   {
//     id: 2,
//     name: "likeapro",
//     author: "krish",
//     isAvailable: false
//   },
//   {
//     id: 3,
//     name: "cleancode",
//     author: "Robert",
//     isAvailable: true
//   }
// ];

// book.get('/get', (req, res) => {
//   res.send(books)
// })

// book.post('/add', (req, res) => {
//   const { id, name, author, isAvailable } = req.body
//   const newbook = { id, name, author, isAvailable }
//   books.push(newbook);
//   res.send(books)
// })

module.exports = book;
