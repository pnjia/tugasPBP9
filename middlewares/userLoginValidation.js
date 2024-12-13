const check = require("express-validator").check;
const db = require("../config/db");

const userLoginValidation = [
  check("email").notEmpty().withMessage("Email harus diisi!"),
  check("password")
    .notEmpty()
    .withMessage("Password harus diisi!")
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        db.query(
          "SELECT * FROM user WHERE password = ?",
          [value],
          (err, result) => {
            if (err) {
              return reject(new Error("Database error"));
            }
            if (result.length == 0) {
              return reject(new Error("Password salah"));
            }
            resolve(true);
          }
        );
      });
    }),
];
module.exports = userLoginValidation;
