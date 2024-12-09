const check = require("express-validator").check;

const userLoginValidation = [
  check("username").notEmpty().withMessage("Username harus diisi!"),
  check("password").notEmpty().withMessage("Password harus diisi!"),
];
module.exports = userLoginValidation;
