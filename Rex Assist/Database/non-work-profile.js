const NonWorkProfile = require("../Schema/non-work-profile");

const addorModifyProfile = async (data) => {
  try {
    let newData = await NonWorkProfile.findOneAndUpdate(
      { Email: data.Email },
      { $set: data },
      { upsert: true, new: true, useFindAndModify: false }
    );
    console.log(
      "New non-work profile created for the provided user, Data: ",
      newData
    );
    return {
      status: "New non-work profile created",
      data: newData,
      error: null,
    };
  } catch (e) {
    console.log("New non-work profile was not created, error: ", e);
    return { status: "New non-work profile not created", data: null, error: e };
  }
};
const findSchedule = async (email, day) => {
  try {
    let workSchedule = await NonWorkProfile.find({ Email: email }).select({
      _id: 0,
      non_work_days: 1,
    });
    console.log("Total week schedule: ", workSchedule[0].non_work_days);
    if (day !== undefined) {
      return {
        status: "Found the day's non-work profile",
        data: workSchedule[0].non_work_days[day],
        error: null,
      };
    } else {
      return {
        status: "Found the week's non-work profile",
        data: workSchedule[0].non_work_days,
        error: null,
      };
    }
  } catch (e) {
    console.error("Error in finding schedule, ", e);
    return {
      status: "Could not find day's non-work profile",
      data: null,
      error: e,
    };
  }
};
module.exports = {
  CreateProfile: addorModifyProfile,
  FindSchedule: findSchedule,
};
