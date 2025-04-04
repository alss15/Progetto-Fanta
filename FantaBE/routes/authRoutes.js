const express = require("express");
const router = express.Router();
const { register } = require("../controllers/authController");
const { login } = require("../controllers/authController");


// 📌 Endpoint per la registrazione
router.post("/auth/register", register);
router.post("/auth/login", login);

module.exports = router;