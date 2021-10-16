const router = require("express").Router();
const hallDB = require("../Database/halls");
const { v4: uuidv4 } = require("uuid");
const HallData = (req, res, next) => {
  /**
   * name
   * place
   * capacity
   *
   */
  const body = req.body;
  console.log("Request Body: ", body);
  if (body.name === undefined || body.place === undefined) {
    return res.status(400).json({
      message: "Missing Information",
    });
  } else {
    if (body.capacity === undefined) {
      body.capacity = "not mentioned";
    }
    res.locals.hall = body;
    next();
  }
};
const add2DB = async (req, res) => {
  let data = {
    UID: uuidv4(),
    Name: res.locals.hall.name,
    Place: res.locals.hall.place,
    Capacity: res.locals.hall.capacity,
  };
  try {
    let responsefromDB = await hallDB.CreateHall(data);
    console.log("Response form DB in halls: ", responsefromDB);
    res.status(200).json({
      status: "Hall created successfully",
      error: responsefromDB.error,
    });
  } catch (err) {
    console.log("Error in createHalls: ", err);
    res.status(500).json({ status: "Internal Server Error", error: err });
  }
};
router.post("/", HallData, add2DB);
module.exports = router;
