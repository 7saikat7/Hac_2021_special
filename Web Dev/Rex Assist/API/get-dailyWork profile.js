const router = require("express").Router();
const userAuth = require("../Middleware/UserAuth");
const workProfile = require("../Database/work-profile");
const getSchedule = async (req, res, next) => {
  let day = req.params.day;
  console.log("Day=> ", day);
  try {
    let wSchedule = await workProfile.FindSchedule(res.locals.user.Email, day);
    console.log("Find work schedule query executed", wSchedule);
    res
      .status(200)
      .json({
        response: "Found the work schedule for the day",
        day: day,
        data: wSchedule.data,
      });
  } catch (e) {
    console.error("Find schedule query returned error: ", e);
    res
      .status(500)
      .json({
        response: "Could not find your work schedule",
        day: day,
        data: null,
      });
  }
};
router.get(
  "/:day",
  userAuth.ValidateAuth,
  userAuth.FindUserSession,
  userAuth.GetUserDetails,
  getSchedule
);

module.exports = router;
