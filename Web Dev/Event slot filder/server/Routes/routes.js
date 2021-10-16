const router = require("express").Router();
router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the home page" });
});
router.use("/login", require("../API/login"));
router.use("/signup", require("../API/signup"));
router.use("/verify", require("../API/verify"));
router.use("/logout", require("../API/logout"));
router.use("/getBooking", require("../API/getbooking"));
router.use("/getBookingByUser", require("../API/getBookingByUser"));
router.use("/createBooking", require("../API/createbooking"));
router.use("/createHalls", require("../API/createhalls"));
router.use("/searchBooking", require("../API/getBookingsbyDate"));
router.use("/deleteBooking", require("../API/deleteBooking"));
module.exports = router;
