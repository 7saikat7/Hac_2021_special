const router = require("express").Router();
const workprofileDB = require("../Database/work-profile");
const userAuth = require("../Middleware/UserAuth");
const saveProfile2DB = async (req, res) => {
  const profile = req.body;
  profile.Email = res.locals.user.Email;
  console.log("Request Body", profile);
  try {
    await workprofileDB.CreateProfile(profile);
    console.log("New Work Profile created");
    res.status(200).json({ response: "Work profile successfully created" });
  } catch (e) {
    console.error("New work profile was not created");
    res.status(500).json({ response: "Could not create the profile" });
  }
};
router.post("/", userAuth.ValidateAuth, userAuth.FindUserSession, userAuth.GetUserDetails, saveProfile2DB);

module.exports = router;
