const mongoose = require("mongoose");
const schema = mongoose.Schema;
let bookings = new schema({
    start_date:{
        type:Date,
        required:true
    },
    end_date:{
        type:Date,
        required:true
    },
    Email: {
        type:String,
        required:true
    }
});
module.exports = bookings;