const jwt = require("jsonwebtoken");

const generateToken = (id) => {

  // -------- jwt.sign = assigning token ---------------------

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

module.exports = generateToken;
