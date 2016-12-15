var mongoose = require("mongoose");

var counterSchema = mongoose.Schema({
    _id: String,
   	seq: Number
});

module.exports = mongoose.model("Counter",counterSchema);