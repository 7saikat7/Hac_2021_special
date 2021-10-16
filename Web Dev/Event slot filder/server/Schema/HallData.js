const mongoose = require("mongoose");
const bookingSchema = require("./booking");
const schema = mongoose.Schema;
let Hall = new schema({
  UID: {
    type: String,
    required: true,
    unique: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Place: {
    type: String,
    required: true,
  },
  Capacity: String,
  Bookings: [bookingSchema],
  WaitLists: [bookingSchema],
});
module.exports = mongoose.model("Hall", Hall);
