// Require dependencies
const express = require("express");
const app = express();
const PORT = process.env.PORT | 3001

// Setup
app.set("view engine", "pug");
app.set("views","views");

// Route
app.get("/",(req, res, next) => {
  var payload = {
    title : "Home"
  }
  res.status(200).render("home", payload);
})

// Running Application
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})