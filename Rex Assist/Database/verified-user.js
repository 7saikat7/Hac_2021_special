const user = require("../Schema/users");

const addUser = async (data) => {
  try {
    let newUser = new user(data);
    await newUser.save();
    console.log("Added verified user to DB");
    return { status: "User verified and added to DB", error: null };
  } catch (e) {
    console.error("Verified user was not added to DB, error occoured:\n", e);
    return { status: "Verified user could not be added to DB", error: e };
  }
};
const findUser = async (email) => {
  try {
    let existingUser = await user.find({ Email: email }).select({_id:0,__v:0});
    console.log(`Existing user found in DB, details: ${existingUser}`);
    return { status: "User found", user: existingUser, error: null };
  } catch (e) {
    console.error(`Existing user not found in DB, email: ${email}`,"\nerror: ",e);
    return { status: "User not found", user: null, error: e };
  }
};

module.exports = { AddnewUser: addUser, FindUser: findUser };
