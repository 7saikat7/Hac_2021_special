const router = require("express").Router();
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const DBusers = require("../Database/unverifed-user");
const jwt = require("../Middleware/jwt");
const newUser = (req, res, next) => {
  /**request body:
   * {
   * Email: email string
   * Name: user_name
   * Password: The password that has been verified in the client side
   * }
   */
  res.locals.User = req.body;
  console.log("User: ", res.locals.User);
  next();
};
const addUnverifiedUser2DB = async (req, res, next) => {
  let uid = uuidv4();
  console.log("UUID: ", uid);
  let UserDetails2bpackedinJWT = {
    Email: res.locals.User.Email,
    Name: res.locals.User.Name,
    Password: res.locals.User.Password,
    UID: uid,
  };
  // res.locals.EmailJWT = jwt.sign(
  //   UserDetails2bpackedinJWT,
  //   process.env.EMAILTOKEN,
  //   {
  //     expiresIn: 900,
  //   }
  // );
  res.locals.EmailJWT = jwt.Sign(UserDetails2bpackedinJWT,process.env.EMAILTOKEN,900);
  try {
    let ResultfromDB = await DBusers.AddUnverifiedUsers({
      UID: uid,
      JWT: res.locals.EmailJWT,
    });
    console.log("Result from DB", ResultfromDB.status);
    console.log("type of UID", typeof uid);
    res.locals.uid = uid;
    next();
  } catch (e) {
    console.error("Could not write to database.\nError: ", e);
    res.status(500).end();
  }
};
const sendVerificationMail = async (req, res, next) => {
  /**Creating a JWT with user details that we would use to verify the email of the user*/
  let mailRoute = res.locals.EmailJWT;
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
    from: '"Coined1 Challenge - Soumalya Bhattacharya" <soumalyabhattacharya6@gmail.com>', // sender address
    to: res.locals.User.Email, // list of receivers
    subject: "Verification Mail from Coined1-intern-Challenge", // Subject line
    html: `
    <div>
      <b>
        Hello ${res.locals.User.Name},
      </ b>
      <p>
        This mail is sent to you from Coined1-Challenge to verify your mail address. This verification Link will be valid for <strong>15 minutes</strong>. 
      </ p>
      <a href=${process.env.ORIGIN}/user/confirmEmail/${mailRoute} style="text-decoration: none">
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
const starttimer = async (uid) => {
  console.log("uid in timer", uid);
  setTimeout(async () => {
    try {
      let deletedUser = await DBusers.DeleteUnverifiedUsers(uid);
      console.log("Deleted an unverified account from DB=>\n", deletedUser);
    } catch (e) {
      console.error("User has already been verified =>\n", e);
    }
  }, 900000);
};
const response2Client = (req, res) => {
  starttimer(res.locals.uid);
  res.status(200).json({
    response:
      "An email has been sent to your provided email with the link to verify your account. Please remember to check your spam or trash folder if you do not find it in your inbox. Verify this email to access all the features of the application.",
  });
};
router.post(
  "/",
  newUser,
  addUnverifiedUser2DB,
  sendVerificationMail,
  response2Client
);

module.exports = router;
