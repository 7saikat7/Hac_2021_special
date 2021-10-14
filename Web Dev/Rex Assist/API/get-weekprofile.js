const router = require("express").Router();
const userAuth = require("../Middleware/UserAuth");
const workProfile = require("../Database/work-profile");
const non_workProfile = require("../Database/non-work-profile");
const getSchedule = async (req, res, next) => {
  let day = req.params.day;
  console.log("Day=> ", day);
  try {
    let wSchedule = await workProfile.FindSchedule(res.locals.user.Email);
    let NwSchedule = await non_workProfile.FindSchedule(res.locals.user.Email);
    console.log("Find work schedule query executed", wSchedule);
    console.log("Find non-work schedule query executed", NwSchedule);
    let schedule = {
      work_profile: wSchedule.data,
      non_work_profile: NwSchedule.data,
    };
    res
      .status(200)
      .json({ response: "Found the work schedule", data: schedule });
  } catch (e) {
    console.error("Find schedule query returned error: ", e);
    res
      .status(500)
      .json({ response: "Could not find work schedule", data: null });
  }
};
router.get(
  "/",
  userAuth.ValidateAuth,
  userAuth.FindUserSession,
  userAuth.GetUserDetails,
  getSchedule
);

module.exports = router;
