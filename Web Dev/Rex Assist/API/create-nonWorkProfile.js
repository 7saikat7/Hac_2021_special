const router = require("express").Router();
const userAuth = require("../Middleware/UserAuth");
const nonWorkProfileDB = require("../Database/non-work-profile");
const saveProfile2DB = async (req, res) => {
  let profile = req.body;
  profile.Email = res.locals.user.Email;
  console.log("Request Body: ", profile);
  try {
    let newData = await nonWorkProfileDB.CreateProfile(profile);
    console.log(
      "New non work profile saved in DB successfully!, Data: ",
      newData
    );
    res
      .status(200)
      .json({ response: "New non-work profile created successfully" });
  } catch (e) {
    console.error("New non-work profile was not created, error: ", e);
    res.status(500).json({ response: "Non-work profile was not created" });
  }
};

router.post(
  "/",
  userAuth.ValidateAuth,
  userAuth.FindUserSession,
  userAuth.GetUserDetails,
  saveProfile2DB
);

module.exports = router;
