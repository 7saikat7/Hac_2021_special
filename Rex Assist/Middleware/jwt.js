const jwt = require("jsonwebtoken");
/**
 * Sign the payload with secret and expiry time
 * @param {object} payload 
 * @param {string} secret 
 * @param {number} expiry 
 * @returns {stirng}
 */
const sign = (payload, secret, expiry) => {
  if (expiry === undefined) {
    return jwt.sign(payload, secret);
  } else {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }
};
/**
 * Verifies your jwt through your secret
 * @param {string} hash 
 * @param {secret} secret 
 * @returns {stirng}
 */
const verify = (hash, secret) => {
  return jwt.verify(hash, secret);
};

module.exports = { Sign: sign, Verify: verify };
