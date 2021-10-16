const mongoose = require("mongoose");
const schema = mongoose.Schema;
let Unverifieduser = new schema({
  Email: {
    type: String,
    unique: true,
    required: true,
  },
  JWT: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("unverified", Unverifieduser);
