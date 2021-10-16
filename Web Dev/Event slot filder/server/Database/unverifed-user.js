const unverifiedUser = require("../Schema/unverifiedUser");
/**
 * Adds unverified users to the unverfieds collection in Database
 */
const addUnverifiedUsers = async (data) => {
  let user = new unverifiedUser(data);
  try {
    await user.save();
    console.log("unverified user saved in DB!");
    return { status: "Unverified user saved in DB!", error: null };
  } catch (e) {
    console.error("Error in saving unverfied user in DB: ", e);
    return { status: "Unverified user could not be saved in the DB", error: e };
  }
};
/**
 * Delets the unverified user account from database.
 * @param {string} email
 * @returns {Object} status and error
 */
const deleteUnverifiedUsers = async (email) => {
  try {
    await unverifiedUser.deleteOne({ Email: email });
    return {
      status: `un-verified user having Email =  ${email} has been deleted from database`,
      error: null,
    };
  } catch (e) {
    return {
      status: `un-verified user having Email = ${email} could not be deleted from database`,
      error: e,
    };
  }
};
/**
 * Gets the unverified user from database.
 * @param {string} email
 * @returns {Object} status, user and error
 */
const findUnverifiedUser = async (email) => {
  try {
    let user = await unverifiedUser
      .findOne({ Email: email })
      .select({ _id: 0, Email: 1 });
    console.log("User in database: ", user);
    return {
      status: "User found in database good to add in verified User collection",
      user: user,
      error: null,
    };
  } catch (e) {
    console.error(
      `User with given Email = ${email} does not exist in DB.`,
      "\nError:\t",
      e
    );
    return { status: "User not found in database", user: null, error: e };
  }
};
module.exports = {
  AddUnverifiedUsers: addUnverifiedUsers,
  DeleteUnverifiedUsers: deleteUnverifiedUsers,
  FindUnverifiedUser: findUnverifiedUser,
};
