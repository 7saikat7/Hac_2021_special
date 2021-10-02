const router = require("express").Router();
const userAuth = require("../Middleware/UserAuth");
const non_workProfile = require("../Database/non-work-profile");
const getSchedule = async (req, res, next) => {
  let day = req.params.day;
  console.log("Day=> ", day);
  try {
    let NwSchedule = await non_workProfile.FindSchedule(
      res.locals.user.Email,
      day
    );
    console.log("Find non-work schedule query executed", NwSchedule);
    res
      .status(200)
      .json({
        response: "Found the non-work schedule of your day",
        day: day,
        data: NwSchedule.data,
      });
  } catch (e) {
    console.error("Find schedule query returned error: ", e);
    res
      .status(500)
      .json({ response: "Could not find your non-work schedule", day: day, data: null });
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
