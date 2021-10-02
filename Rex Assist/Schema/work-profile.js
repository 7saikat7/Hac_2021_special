const mongoose = require("mongoose");
const schema = mongoose.Schema;
let workProfile = new schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  work_days: {
    monday: {
      start: String,
      end: String,
      list_of_blocked_apps: [String],
    },
    tuesday: {
      start: String,
      end: String,
      list_of_blocked_apps: [String],
    },
    wednesday: {
      start: String,
      end: String,
      list_of_blocked_apps: [String],
    },
    thursday: {
      start: String,
      end: String,
      list_of_blocked_apps: [String],
    },
    friday: {
      start: String,
      end: String,
      list_of_blocked_apps: [String],
    },
    saturday: {
      start: String,
      end: String,
      list_of_blocked_apps: [String],
    },
    sunday: {
      start: String,
      end: String,
      list_of_blocked_apps: [String],
    },
  },
});
module.exports = mongoose.model("workProfile", workProfile);
