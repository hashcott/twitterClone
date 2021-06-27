// Require dependencies
const express = require("express");
const app = express();
const PORT = process.env.PORT | 3001;
const middleware = require("./middleware");
const path = require('path');
// Setup
app.set("view engine", "pug");
app.set("views","views");
app.use(express.static(path.join(__dirname, "public")))
// Route
const loginRoute = require('./routes/loginRoutes');
app.use("/login", loginRoute);

app.get("/", middleware.requireLogin ,(req, res, next) => {
  var payload = {
    title : "Home"
  }
  res.status(200).render("home", payload);
})

// Running Application
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})