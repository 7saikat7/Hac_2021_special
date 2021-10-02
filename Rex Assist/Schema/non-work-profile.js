const mongoose = require("mongoose");
const schema = mongoose.Schema;
let non_workProfile = new schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  non_work_days: {
    monday: {
      start: String,
      end: String,
      restricted_apps: {
        facebook: String,
        instagram: String,
        whatsapp: String,
        tiktok: String,
        mxtakatak: String,
        youtube: String,
        snapchat: String,
      },
    },
    tuesday: {
      start: String,
      end: String,
      restricted_apps: {
        facebook: String,
        instagram: String,
        whatsapp: String,
        tiktok: String,
        mxtakatak: String,
        youtube: String,
        snapchat: String,
      },
    },
    wednesday: {
      start: String,
      end: String,
      restricted_apps: {
        facebook: String,
        instagram: String,
        whatsapp: String,
        tiktok: String,
        mxtakatak: String,
        youtube: String,
        snapchat: String,
      },
    },
    thursday: {
      start: String,
      end: String,
      restricted_apps: {
        facebook: String,
        instagram: String,
        whatsapp: String,
        tiktok: String,
        mxtakatak: String,
        youtube: String,
        snapchat: String,
      },
    },
    friday: {
      start: String,
      end: String,
      restricted_apps: {
        facebook: String,
        instagram: String,
        whatsapp: String,
        tiktok: String,
        mxtakatak: String,
        youtube: String,
        snapchat: String,
      },
    },
    saturday: {
      start: String,
      end: String,
      restricted_apps: {
        facebook: String,
        instagram: String,
        whatsapp: String,
        tiktok: String,
        mxtakatak: String,
        youtube: String,
        snapchat: String,
      },
    },
    sunday: {
      start: String,
      end: String,
      restricted_apps: {
        facebook: String,
        instagram: String,
        whatsapp: String,
        tiktok: String,
        mxtakatak: String,
        youtube: String,
        snapchat: String,
      },
    },
  },
});
module.exports = mongoose.model("non-workProfile", non_workProfile);
