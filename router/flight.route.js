const express = require("express")
const {FlightModel} = require("../model/flight.model")

const flightRoute = express.Router()

//Flight GET route
flightRoute.get("/flights", async (req, res)=>{
    try {
        let user = await FlightModel.find()
        res.send(user)
    } catch (error) {
        console.log(error);
        res.send("Something went wrong")
    }
})

//Flight GET by ID route
flightRoute.get("/flights/:id", async (req, res)=>{
    let id = req.params.id
    try {
        let user = await FlightModel.findById({_id: id})
        res.send(user)
    } catch (error) {
        console.log(error);
        res.send("Something went wrong")
    }
})

//Flight POST route
flightRoute.post("/flights", async (req, res)=>{
    const payload = req.body
    try {
        let flight = new FlightModel(payload)
        await flight.save()
        res.status(201).send("Flight register success")
    } catch (error) {
        console.log(error);
        res.send("Flight register failed")
    }
})

//****Obj STRUCTURE*** */
// {
//     "airline": "indigo",
//     "flightNo": "53454353",
//     "departure": "india",
//     "arrival": "USA",
//     "departureTime": "2023-04-27",
//     "arrivalTime": "2023-04-29",
//     "seats": 2,
//     "price": 40000
//   }

//Flight PATCH by ID route
flightRoute.patch("/flights/:id", async (req, res)=>{
    let id = req.params.id
    let payload = req.body
    try {
        await FlightModel.findByIdAndUpdate({_id: id}, payload)
        res.status(204).send({message: "Flight Data has been Updated"})
    } catch (error) {
        console.log(error);
        res.send("Something went wrong")
    }
})

//Flight DELETE by ID route
flightRoute.delete("/flights/:id", async (req, res)=>{
    let id = req.params.id
    try {
        await FlightModel.findByIdAndDelete({_id: id})
        res.status(202).send({message: "Flight Data has been Deleted"})
    } catch (error) {
        console.log(error);
        res.send("Something went wrong")
    }
})

module.exports = {flightRoute}