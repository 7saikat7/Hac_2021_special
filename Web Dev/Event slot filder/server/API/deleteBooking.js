const router = require("express").Router();
const jwt = require("../Middlewares/jwt");
const UserDb = require("../Database/verified-user");
const HallDb = require("../Database/halls");
const reqData = (req, res, next) => {
  const body = req.body;
  const authToken = req.headers.token;
  console.log("Auth Token: ", authToken);
  console.log("Request: ", body);
  next();
};
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
const DeletefromUser = async (req, res, next) => {
  try {
    let Email = res.locals.user.Email;
    let BookingData = {
      // _id: req.body._id,
      UID: req.body.UID,
      // Name: req.body.Name,
      // Place: req.body.Place,
      // Capacity: req.body.Capacity,
      // start_date: req.body.start_date,
      // end_date: req.body.end_date,
    };

    let result = await UserDb.deleteBooking(Email, BookingData);
    console.log("Result in users: ", result);
    next();
  } catch (err) {
    res
      .status(400)
      .json({ status: "error in deleting from user DB", response: err });
  }
};
const DeletefromHall = async (req, res, next) => {
  try {
    let uid = req.body.UID;
    let BookingData = {
      Email: res.locals.user.Email,
    };
    let result = await HallDb.DeleteBooking(uid, BookingData);
    console.log("Result in halls: ", result);
    next();
  } catch (err) {
    res.status(400).json({ response: err });
  }
};
const newBookingList = async () => {
  try {
    let userObject = await UserDb.FindUser(res.locals.user.Email);
    console.log("User Bookings: ", userObject.user[0].Booking);
    res.status(200).json({ response: userObject.user[0].Booking });
    res.status(200).json({
      status: "Booking deleted successfully",
      newBookingList: userObject.user[0].Booking,
      error: null,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ response: "Something went wrong" });
  }
};
router.post("/", reqData, user, DeletefromUser, DeletefromHall, newBookingList);
module.exports = router;
