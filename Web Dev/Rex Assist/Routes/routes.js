const router = require("express").Router();

router.use("/", require("../API/home"));
router.use("/user",require("./user"));
router.use("/app-profiles",require("./profiles"));
router.use("/schedules",require("./schedules"));
module.exports = router;
