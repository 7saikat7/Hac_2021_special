const router = require("express").Router();
const bookingDB = require("../Database/halls");
const getHalls = async (req, res) => {
  try {
    let halls = await bookingDB.FindHalls();
    console.log("All halls: ", halls.hall);
    res
      .status(200)
      .json({ status: "All halls are found", halls: halls.hall, error: null });
  } catch (err) {
    console.log("Could not find halls: ", err);
    res
      .status(500)
      .json({ status: "Could not find halls", halls: [], error: err });
  }
};

router.get("/", getHalls);
module.exports = router;
