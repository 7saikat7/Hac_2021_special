const router = require("express").Router();
const jwt = require("../Middlewares/jwt");
const DBusers = require("../Database/unverifed-user");
const nodemailer = require("nodemailer");
/**
 * Sanitizing Data
 */
const newSignUp = (req, res, next) => {
  body = req.body;
  console.log("Request Body: ", body);
  if (
    body.email === undefined ||
    body.password === undefined ||
    body.role !== "user"
  ) {
    res.status(400).json({
      status: "Missing required fields",
    });
  } else {
    if (body.name === undefined) {
      body.name = "User";
    }
    res.locals.user = body;
    next();
  }
};
// Creating JWT token to be sent with email
const createJWT = (req, res, next) => {
  //payload
  const payload = {
    email: res.locals.user.email,
    password: res.locals.user.password,
    name: res.locals.user.name,
    role: res.locals.user.role,
  };
  //sign token
  let emailJWT = jwt.Sign(payload, process.env.EMAIL_SECRET, 900);
  res.locals.emailJWT = emailJWT;
  console.log("JWT: ", emailJWT);
  next();
};
// Adding unverified users to DB
const addUser = async (req, res, next) => {
  try {
    let ResultfromDB = await DBusers.AddUnverifiedUsers({
      Email: res.locals.user.email,
      JWT: res.locals.emailJWT,
    });
    ///detect error and respond
    if (ResultfromDB.error !== null) {
      res.status(400).json({
        status: "User already exists",
      });
    } else {
      console.log("Result from DB: ", ResultfromDB);
      next();
    }
  } catch (e) {
    console.error("Could not write to database.\nError: ", e);
    res.status(500).end();
  }
};
// Sending Email
const sendVerificationMail = async (req, res, next) => {
  let mailRoute = res.locals.emailJWT;
  console.log("Mail route: ", mailRoute);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAILSENDER,
      pass: process.env.EMAILPASS,
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Hall Booking - Soumalya Bhattacharya" <soumalyabhattacharya6@gmail.com>', // sender address
    to: res.locals.user.email, // list of receivers
    subject: "Verification Mail from Demo Hall Booking", // Subject line
    html: `
    <div>
      <b>
        Hello ${res.locals.user.name},
      </ b>
      <p>
        This mail is sent to you from Coined1-Challenge to verify your mail address. This verification Link will be valid for <strong>15 minutes</strong>. 
      </ p>
      <a href=${process.env.ORIGIN}/verify/${mailRoute} style="text-decoration: none">
        <button style="background-color:purple; color:white">
          Click this button to verify your mail
        </ button>
      </ a>
    </ div>`, // html body
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  next();
};
// Starting timer to delete unverified users from DB
const starttimer = async (email) => {
  console.log("Email in timer", email);
  setTimeout(async () => {
    try {
      let deletedUser = await DBusers.DeleteUnverifiedUsers(email);
      console.log("Deleted an unverified account from DB=>\n", deletedUser);
    } catch (e) {
      console.error("User has already been verified =>\n", e);
    }
  }, 900000);
};
// Sending Response to client
const response2Client = (req, res) => {
  starttimer(res.locals.user.email);
  res.status(200).json({
    status: "Click on the verification mail sent to your inbox",
  });
};
router.post(
  "/",
  newSignUp,
  createJWT,
  addUser,
  sendVerificationMail,
  response2Client
);

module.exports = router;
