const router = require("express").Router();

router.use("/work-profile/create", require("../API/create-workProfile"));
router.use("/non-work-profile/create", require("../API/create-nonWorkProfile"));
module.exports = router;
