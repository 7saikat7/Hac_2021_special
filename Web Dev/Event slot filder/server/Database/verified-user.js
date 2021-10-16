const user = require("../Schema/User");

const addUser = async (data) => {
  try {
    let newUser = new user(data);
    await newUser.save();
    return { status: "User verified and added to DB", error: null };
  } catch (e) {
    console.error("Verified user was not added to DB, error occoured:\n", e);
    return { status: "Verified user could not be added to DB", error: e };
  }
};

const findUser = async (email) => {
  try {
    let existingUser = await user
      .find({ Email: email })
      .select({ _id: 0, __v: 0 });
    console.log(`Existing user found in DB, details: ${existingUser}`);
    return { status: "User found", user: existingUser, error: null };
  } catch (e) {
    console.error(
      `Existing user not found in DB, email: ${email}`,
      "\nerror: ",
      e
    );
    return { status: "User not found", user: null, error: e };
  }
};

const addHalls = async (email, bookingData) => {
  try {
    let newBooking = await user.updateOne(
      { Email: email },
      { $addToSet: { Booking: bookingData } },
      { upsert: false, new: true }
    );
    console.log("Booking added to DB, details: ", newBooking);
    return { status: "Booking added", error: null };
  } catch (e) {
    console.error("Booking not added to DB, error occoured:\n", e);
    return { status: "Booking could not be added to DB", error: e };
  }
};
const deleteHalls = async (email, bookingData) => {
  try {
    console.log("Calling parameters in user DB: ", email, bookingData);
    let newBooking = await user.updateOne(
      { Email: email },
      { $pull: { Booking: bookingData } },
      { upsert: false, new: true }
    );
    console.log("Booking deleted from DB, details: ", newBooking);
    return { status: "Booking deleted", error: null };
  } catch (e) {
    console.error("Booking not deleted from DB, error occoured:\n", e);
    return { status: "Booking could not be deleted from DB", error: e };
  }
};
module.exports = {
  AddnewUser: addUser,
  FindUser: findUser,
  AddHalls: addHalls,
  deleteBooking: deleteHalls,
};
