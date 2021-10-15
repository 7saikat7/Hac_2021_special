const mongoose = require("mongoose");
const schema = mongoose.Schema;
let appusage = new schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  daily_usage: [Object],
  monthly_usage: [Object],
  yearly_usage: [Object],
});
module.exports = mongoose.model("app-usage", appusage);
