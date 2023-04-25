const express = require("express")
const cors =require("cors")
const {connection} = require("./config/db")
const {userRoute} = require("./router/user.route")
const {flightRoute} = require("./router/flight.route")
const {bookingRoute} = require("./router/book.route")

const app = express()
require('dotenv').config()

app.use(express.json())
app.use(cors())

app.get("/", async (req, res)=>{
    res.send("WELCOME");
})

app.use("/api", userRoute)
app.use("/api", flightRoute)
app.use("/api", bookingRoute)

app.listen(process.env.port,async ()=>{
    try {
        await connection
        console.log("DB connected");
    } catch (error) {
        console.log(error);
        console.log("Connection Loose");
    }
    console.log(`Running at port ${process.env.port}`);
})