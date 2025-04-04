const express = require("express");
const { register } = require("../controllers/authController")
const { login } = require("../controllers/authController");
const sfidaRoutes = require ("./routes/sfidaRoutes");

const app = express();

app.use(express.json());
app.use("/auth/login", login);
app.use("/auth/register", register);
app.use("/sfide", sfidaRoutes);

app.use((req, res, next) => {
  return res.status(404).json({ error: 'Not found' });
 });

module.exports = app

