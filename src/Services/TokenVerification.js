const jwt = require("jsonwebtoken");

function VerifyJWTToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    console.log(decoded);
    if (!decoded) {
      return false;
    } else if (Date.now() < decoded.exp) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

module.exports = VerifyJWTToken;
