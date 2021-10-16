const router = require("express").Router();
const jwt = require("../Middlewares/jwt");
const Passhash = require("../Middlewares/Passhash");
const unVerifieduserDB = require("../Database/unverifed-user");
const verifieduserDB = require("../Database/verified-user");
const activeUserDB = require("../Database/active-user");
const validateJWT = (req, res, next) => {
  const emailJWT = req.params.emailtoken;
  console.log("email token: ", emailJWT);
  try {
    let user2Bverified = jwt.Verify(emailJWT, process.env.EMAIL_SECRET);
    console.log("Verified user through jwt: ", user2Bverified);
    res.locals.user = user2Bverified;
    next();
  } catch (e) {
    console.error("JWT has been tampered!!!");
    res.status(400).json({ response: "URL malformed!!" });
  }
};
const findtheunverifiedAccount = async (req, res, next) => {
  try {
    let dbResponse = await unVerifieduserDB.FindUnverifiedUser(
      res.locals.user.email
    );
    console.log("User Verified: ", dbResponse.user);
    next();
  } catch (e) {
    console.error("User from the JWT was not found in DB", res.locals.user);
    res.status(401).end();
  }
};
const addVerified2DB = async (req, res, next) => {
  try {
    let hashedPassword = await Passhash.Hash(res.locals.user.password);
    let userDoc = {
      Email: res.locals.user.email,
      Name: res.locals.user.name,
      Role: res.locals.user.role,
      Password: hashedPassword,
    };
    await verifieduserDB.AddnewUser(userDoc);
    console.log(" Verified user added to DB");
    next();
  } catch (e) {
    console.error("Verified user was not added to DB");
    res.status(500).end();
  }
};
const deleteUnverifiedAccountfromCollection = async (req, res, next) => {
  try {
    await unVerifieduserDB.DeleteUnverifiedUsers(res.locals.user.email);
    console.log("User removed from unverified Users");
    next();
  } catch (e) {
    console.log("User could not be removed from unverified Users");
    res.status(500).end();
  }
};

const responsd2User = (req, res) => {
  res.status(200).json({
    response: "Email verified successfully. Please login to continue",
    Name: res.locals.user.name,
    Role: res.locals.user.role,
  });
};
router.get(
  "/:emailtoken",
  validateJWT,
  findtheunverifiedAccount,
  addVerified2DB,
  deleteUnverifiedAccountfromCollection,
  responsd2User
);
module.exports = router;
