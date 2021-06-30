// Require dependencies
const express = require("express");
const app = express();
const PORT = process.env.PORT | 3001;
const middleware = require("./middleware");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
// Setup
app.set("view engine", "pug");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "Test",
    resave: true,
    saveUninitialized: false,
  })
);

// Require Route
const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");
const logoutRoute = require("./routes/logoutRoutes");

// Use route
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {
  var payload = {
    title: "Home",
    user : req.session.user
  };
  res.status(200).render("home", payload);
});

// Running Application
app.listen(PORT, async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:hanhphuc@cluster0.mni3m.gcp.mongodb.net/twitterClone?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    console.log("Connected to mongodb");
  } catch (error) {
    console.log(error.message);
  }
  console.log(`Server running on port ${PORT}`);
});
