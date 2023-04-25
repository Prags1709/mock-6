const express = require("express")
const {BookModel} = require("../model/book.model")

const bookingRoute = express.Router()

bookingRoute.get("/dashboard",async (req, res)=>{
    try {
        let book =await BookModel.find()
        res.send(book)
    } catch (error) {
        console.log(error);
        res.send({error: "something went wrong"})
    }
})

bookingRoute.post("/booking", async (req, res)=>{
    let payload = req.body
    try {
        let book = new BookModel(payload)
        await book.save()
        res.status(201).send("Booking success")
    } catch (error) {
        console.log(error);
        res.send({error: "Booking Failed"})
    }
})

module.exports = {bookingRoute}