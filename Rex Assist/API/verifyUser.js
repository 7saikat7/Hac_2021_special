const router = require("express").Router();
const jwt = require("../Middleware/jwt");
const Passhash = require("../Middleware/Passhash");
const unVerifieduserDB = require("../Database/unverifed-user");
const verifieduserDB = require("../Database/verified-user");
const activeUserDB = require("../Database/active-user");
const validateJWT = (req, res, next) => {
  const emailJWT = req.params.emailtoken;
  try {
    let user2Bverified = jwt.Verify(emailJWT, process.env.EMAILTOKEN);
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
    let user = await unVerifieduserDB.FindUnverifiedUser(res.locals.user.UID);
    console.log("User Verified: ", user);
    next();
  } catch (e) {
    console.error("User from the JWT was not found in DB", res.locals.user);
    res.status(401).end();
  }
};
const addVerified2DB = async (req, res, next) => {
  try {
    let hashedPassword = await Passhash.Hash(res.locals.user.Password);
    let userDoc = {
      Email: res.locals.user.Email,
      Name: res.locals.user.Name,
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
    await unVerifieduserDB.DeleteUnverifiedUsers(res.locals.user.UID);
    console.log("User removed from unverified Users");
    next();
  } catch (e) {
    console.log("User could not be removed from unverified Users");
    res.status(500).end();
  }
};
const authToken = (email, name, ip) => {
  let token = jwt.Sign(
    { Email: email, Name: name, IP: ip },
    process.env.AUTHTOKEN
  );
  return token;
};
const add2ActiveUser = async (req, res, next) => {
  let clientIP = req.ip;
  console.log("Client IP address", clientIP);
  res.locals.auth = authToken(
    res.locals.user.Email,
    res.locals.user.Name,
    clientIP
  );
  try {
    await activeUserDB.StartSession({
      IP: clientIP,
      auth_token: res.locals.auth,
    });
    console.log("Session started");
    next();
  } catch (e) {
    console.error("Session could not start", e);
    res.status(200).json({
      response:
        "Your email address has been verified. Please login to continue",
    });
  }
};
const responsd2User = (req, res) => {
  res.status(200).json({
    response: "Email verified successfully",
    Name: res.locals.user.Name,
    Email: res.locals.user.Email,
    Token: res.locals.auth,
  });
};
router.get(
  "/:emailtoken",
  validateJWT,
  findtheunverifiedAccount,
  addVerified2DB,
  deleteUnverifiedAccountfromCollection,
  add2ActiveUser,
  responsd2User
);
module.exports = router;
