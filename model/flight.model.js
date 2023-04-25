const mongoose = require("mongoose")

let flightSchema = mongoose.Schema({
    airline: String,
    flightNo: String,
    departure: String,
    arrival: String,
    departureTime: Date,
    arrivalTime: Date,
    seats: Number,
    price: Number

})

let FlightModel = mongoose.model("flight", flightSchema)

module.exports = {FlightModel}