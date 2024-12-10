const { validationResult } = require("express-validator");
const db = require("../config/db");

const userRegister = (req, res) => {
  const { email, username, password } = req.body;

  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({
      valtidationMessages: result.array().map((err) => ({ message: err.msg })),
    });
  }
  db.query(`INSERT INTO user (email, username, password) VALUES (?, ?, ?)`, [
    email,
    username,
    password,
  ]);
  res.status(201).json({ message: "Data berhasil didaftarkan!" });
};

const userLogin = (req, res) => {
  const { email } = req.body;

  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({
      valtidationMessages: result.array().map((err) => ({ message: err.msg })),
    });
  }

  db.query("SELECT * FROM user WHERE email = ?", [email], (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      return res
        .status(400)
        .json({ message: "Email belum ada, silahkan daftar!" });
    }
    res.status(200).json({ message: "Berhasil login!" });
  });
};
module.exports = { userRegister, userLogin };
