const router = require("express").Router();
const jwt = require("../Middlewares/jwt");
const userDb = require("../Database/verified-user");
const user = (req, res, next) => {
  let authToken = req.header("token");
  if (authToken === undefined) {
    res.status(400).json({ response: "Provide auth-token header" });
  }
  console.log("token: ", authToken);
  let openjwt = jwt.Verify(authToken, process.env.AUTH_SECRET);
  console.log("Opened JWT: ", openjwt);
  res.locals.user = openjwt;
  next();
};
const getBookingByUser = async (req, res, next) => {
  try {
    let userObject = await userDb.FindUser(res.locals.user.Email);
    console.log("User Bookings: ", userObject.user[0].Booking);
    res.status(200).json({ response: userObject.user[0].Booking });
  } catch (err) {
    console.log(err);
    res.status(400).json({ response: "Something went wrong" });
  }
};
router.get("/", user, getBookingByUser);
module.exports = router;
