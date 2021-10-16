const router = require("express").Router();
const hallDb = require("../Database/halls");
const incomingData = (req, res, next) => {
  const body = req.body;
  console.log("Search Data:", body);
  /**
   * start_date
   * end_date
   */
  if (body.start_date === null || body.end_date === null) {
    res
      .status(400)
      .json({ m: 0, msg: "Please provide start_date and end_date" });
  } else {
    res.locals.req_start_date = new Date(body.start_date);
    res.locals.req_end_date = new Date(body.end_date);
  }
  next();
};
const getEachHall = async (req, res, next) => {
  let available_to_book = [];
  try {
    let allHalls = await hallDb.FindHalls();
    for (hall of allHalls.hall) {
      for (booking of hall.Bookings) {
        let start_date = new Date(booking.start_date);
        let end_date = new Date(booking.end_date);
        console.log("Booking Start date: ", start_date);
        console.log("Booking End date: ", end_date);
        if (
          (res.locals.req_start_date < start_date &&
            res.locals.req_end_date < start_date) ||
          (res.locals.req_start_date > end_date &&
            res.locals.req_end_date > end_date)
        ) {
          console.log("Booking is in the range", hall);
          available_to_book.push(hall);
        }
      }
    }
    res.locals.available_to_book = available_to_book;
    next();
  } catch (err) {
    console.log(err);
    res.status(200).json({ status: "Error Occured", data: null, error: err });
  }
};
const getBookings = async (req, res, next) => {
  let halls = res.locals.available_to_book;
  for (hall of halls) {
    hall.available = true;
    console.log("Individual halls: ", hall);
  }
  console.log("Available to book: ", halls[0].available);
  res.status(200).json({
    status: "Success",
    data: halls,
    error: null,
  });
};
router.post("/", incomingData, getEachHall, getBookings);
module.exports = router;
