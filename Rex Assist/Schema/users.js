const mongoose = require("mongoose");
const schema = mongoose.Schema;
let User = new schema({
    Email:{
        type: String,
        required: true,
        unique: true,
    },
    Name: String,
    Password:{
        type: String,
        required: true,
    },
});
module.exports = mongoose.model("user",User);