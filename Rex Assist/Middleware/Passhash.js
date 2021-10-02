const bcrypt = require("bcryptjs");
/**
 * Hashes the provided plain text password
 * @param {*} pass
 * @returns {Promise} hash
 */
const hashPass = async (pass) => {
  const saltrounds = 10;
  const hash = await bcrypt.hash(pass, saltrounds);
  return hash;
};
/**
 *
 * @param {string} plainPass
 * @param {string} hash
 * @returns {Promise}  result
 */
const comparePass = async (plainPass, hash) => {
  try {
    let match = await bcrypt.compare(plainPass, hash);
    if (match === true) {
      console.log("Password match result: ", match);
      return { status: "Password matched", error: null };
    }
    else
    {
      console.log("Password match result: ", match);
      return { status: "Password didn't match", error: null };
    }
  } catch (e) {
    console.error("Password could not be compared: ", e);
    return { status: "Password didn't match", error: e };
  }
};
module.exports = { Hash: hashPass, Compare: comparePass };
