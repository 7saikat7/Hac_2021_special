const unverifiedUser = require("../Schema/unverified-user");
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
    return { status: "Unverified user could not be saved in the DB", error: e };
  }
};
/**
 * Delets the unverified user account from database.
 * @param {string} uid
 * @returns {Object}
 */
const deleteUnverifiedUsers = async (uid) => {
  try {
    await unverifiedUser.deleteOne({ UID: uid });
    return {
      status: `un-verified user having UID ${uid} has been deleted from database`,
      error: null,
    };
  } catch (e) {
    return {
      status: `un-verified user having UID ${uid} could not be deleted from database`,
      error: e,
    };
  }
};
const findUnverifiedUser = async (uid) => {
  try {
    let user = await unverifiedUser
      .findOne({ UID: uid })
      .select({ _id: 0, UID: 1 });
    console.log("User in database: ", user);
    return {
      status: "User found in database good to add in verified User collection",
      error: null,
    };
  } catch (e) {
    console.error(
      `User with given UID= ${uid} does not exist in DB.`,
      "\nError:\t",
      e
    );
    return { status: "User not found in database", error: e };
  }
};
module.exports = {
  AddUnverifiedUsers: addUnverifiedUsers,
  DeleteUnverifiedUsers: deleteUnverifiedUsers,
  FindUnverifiedUser: findUnverifiedUser,
};
