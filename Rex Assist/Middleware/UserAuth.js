const jwt = require("./jwt");
const sessionDB = require("../Database/active-user");
const detectUser = (req, res, next) => {
  let authToken = req.header("auth-token");
  console.log("auth token: ", authToken);
  if (authToken === undefined) {
    res.status(400).json({ response: "Provide auth-token header" });
  } else {
    res.locals.authToken = authToken;
    next();
  }
};
const findSessionfromDB = async (req, res, next) => {
  let ip = req.ip;
  try {
    let token = await sessionDB.FindSession(ip, res.locals.authToken);
    console.log("Verified token: ", token);
    res.locals.token = token.token.auth_token;
    next();
  } catch (e) {
    console.error("No session found with given ip and token");
    res.status(401).json({ response: "User logged out. Login again" });
  }
};
const unpackUser = (req, res, next) => {
  let user = jwt.Verify(res.locals.token, process.env.AUTHTOKEN);
  console.log("Requesting User: ", user);
  res.locals.user = user;
  next();
};

module.exports = {
  ValidateAuth: detectUser,
  FindUserSession: findSessionfromDB,
  GetUserDetails: unpackUser,
};
