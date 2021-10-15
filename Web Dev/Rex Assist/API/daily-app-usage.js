const router = require("express").Router();
const userAuth = require("../Middleware/UserAuth");

const addUsage = (req,res,next) => {
    
}

router.post("/",userAuth.ValidateAuth, userAuth.FindUserSession, userAuth.GetUserDetails,);

module.exports = router;