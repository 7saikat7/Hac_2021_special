const router = require("express").Router();

router.use("/daily-schedule", require("../API/get-dayProfile"));
router.use("/weekly-schedule", require("../API/get-weekprofile"));
router.use("/work",require("../API/get-dailyWork profile"));
router.use("/non-work",require("../API/get-dailyNonworkSchedule"));
module.exports = router;
