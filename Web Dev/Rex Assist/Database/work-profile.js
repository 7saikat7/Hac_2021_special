const workProfile = require("../Schema/work-profile");

const addorModifyProfile = async (data) => {
  try {
    let newData = await workProfile.findOneAndUpdate(
      { Email: data.Email },
      { $set: data },
      { upsert: true, new: true, useFindAndModify: false }
    );
    console.log(
      "New work profile created for the provided user, Data: ",
      newData
    );
    return { status: "New work profile created", data: newData, error: null };
  } catch (e) {
    console.log("New work profile was not created, error: ", e);
    return { status: "New work profile not created", data: null, error: e };
  }
};
const findSchedule = async (email, day) => {
  try {
    let workSchedule = await workProfile
      .find({ Email: email })
      .select({ _id: 0, work_days: 1 });
    console.log("Total week schedule: ", workSchedule[0].work_days);
    if (day !== undefined) {
      return {
        status: "Found the day's work profile",
        data: workSchedule[0].work_days[day],
        error: null,
      };
    } else {
      return {
        status: "Found the week's work profile",
        data: workSchedule[0].work_days,
        error: null,
      };
    }
  } catch (e) {
    console.error("Error in finding schedule, ", e);
    return {
      status: "Could not find day's work profile",
      daya: null,
      error: e,
    };
  }
};
module.exports = {
  CreateProfile: addorModifyProfile,
  FindSchedule: findSchedule,
};
