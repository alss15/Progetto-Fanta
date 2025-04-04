const express = require("express");
const router = express.Router();
const { register } = require("../controllers/authController");
const { login } = require("../controllers/authController");


// 📌 Endpoint per la registrazione
router.post("/register", register);
router.post("/login", login);

module.exports = router;