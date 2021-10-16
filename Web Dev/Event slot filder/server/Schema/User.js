const mongoose = require("mongoose");
const schema = mongoose.Schema;
let User = new schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Name: String,
  Password: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    required: true,
  },
  Booking: [
    {
      UID: {
        type: String,
        required: true,
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
      start_date: String,
      end_date: String,
    },
  ],
});
module.exports = mongoose.model("User", User);
