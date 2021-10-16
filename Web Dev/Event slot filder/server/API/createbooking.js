const router = require("express").Router();
const jwt = require("../Middlewares/jwt");
const hallDb = require("../Database/halls");
const userDb = require("../Database/verified-user");
const HallData = require("../Schema/HallData");
const getUser = (req, res, next) => {
  const auth = req.headers.token;
  const user = jwt.Verify(auth, process.env.AUTH_SECRET);
  res.locals.user = user;
  console.log("User: ", user);
  next();
};

const booking = (req, res, next) => {
  const body = req.body;
  if (
    body.UID === undefined ||
    body.Name === undefined ||
    body.Place === undefined ||
    body.start_date === null ||
    body.end_date === null
  ) {
    res.status(400).json({ status: "Required Fields Missing" });
  }
  console.log("request that came in create booking: ", body);
  next();
};
const booking_data = async (req, res, next) => {
  try {
    let booking = {
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      Email: res.locals.user.Email,
    };
    console.log("booking: ", booking);
    // let hall_data = {
    //   UID: req.body.UID,
    //   Name: req.body.Name,
    //   Place: req.body.Place,
    //   Capacity: req.body.Capacity,
    //   Bookings: bookingList,
    //   WaitLists: req.body.WaitLists,
    // };
    let responsefromDB = await hallDb.CreateBooking(req.body.UID, booking);
    console.log("response from DB: ", responsefromDB);
    next();
  } catch (error) {
    if (error) {
      console.log("error: ", error);
      res.status(500).json({ status: "Booking Failed", error: error });
    }
  }
};
const addBookingtoUser = async (req, res, next) => {
  try {
    let hall_data = {
      UID: req.body.UID,
      Name: req.body.Name,
      Place: req.body.Place,
      Capacity: req.body.Capacity,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
    };
    console.log("hall_data in add to user DB: ", hall_data);
    let responsefromDB = await userDb.AddHalls(
      res.locals.user.Email,
      hall_data
    );
    console.log("Response while adding hall to user: ", responsefromDB);
    next();
  } catch (error) {
    if (error) {
      console.log("error: ", error);
      res.status(500).json({ status: "Booking Failed", error: error });
    }
  }
};
router.post(
  "/",
  getUser,
  booking,
  booking_data,
  addBookingtoUser,
  (req, res) => {
    res.status(200).json({ status: "Booking Successful" });
  }
);
module.exports = router;
