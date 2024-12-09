const express = require("express");
const { userRegister, userLogin } = require("../controllers/userController");
const userRegisterValidation = require("../middlewares/userRegisterValidation");
const userLoginValidation = require("../middlewares/userLoginValidation");
const router = express.Router();

router.post("/register", userRegisterValidation, userRegister);
router.post("/login", userLoginValidation, userLogin);
module.exports = router;
