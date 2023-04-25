const mongoose = require("mongoose")

const ObjectId = mongoose.Schema.ObjectId

let bookSchema = mongoose.Schema({
    user: {type: ObjectId, ref: "User"},
    flight: {type: ObjectId, ref: "Flight"}
});

let BookModel = mongoose.model("book", bookSchema)

module.exports = {BookModel}