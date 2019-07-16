const mongoose = require("mongoose");

const Message = new mongoose.Schema({
    username:String,
    message:String,
    date:Date,
},{timestamps: true})

module.exports = mongoose.model("Message",Message);

