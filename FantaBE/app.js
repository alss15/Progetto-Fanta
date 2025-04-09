const express = require("express");
const cors = require('cors');
const auth = require("./routes/authRoutes")
const sfidaRoutes = require ("./routes/sfidaRoutes");


const app = express();

app.use(express.json());
app.use(cors({origin:'*'  }));

app.use("/api/auth", auth);
app.use("/api/sfide", sfidaRoutes);


app.use((req, res, next) => {
  return res.status(404).json({ error: 'Not found' });
 });


module.exports = app

