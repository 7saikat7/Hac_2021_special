const mongoose = require("mongoose");
const schema = mongoose.Schema;
let ActiveUser = new schema(
  {
    IP: {
      type: String,
      required: true,
      unique: true,
    },
    auth_token: { type: String, unique: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Active", ActiveUser);
