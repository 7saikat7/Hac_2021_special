const router = require("express").Router();

const routeResponse = (req, res) => {
  res.status(200).json({ response: "Welcome to C1 Database" });
};

router.get("/", routeResponse);

module.exports = router;
