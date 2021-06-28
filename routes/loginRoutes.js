const express = require("express");
const router = express.Router();
const User = require("../schema/UserSchema");

router.get("/", (req, res, next) => {
  let payload = {
    title: "Login",
  };
  res.status(200).render("login", payload);
});

router.post("/", async (req, res, next) => {
  let payload = req.body;
  let username = req.body.logUsername.trim();
  let password = req.body.logUsername.trim();
  if (username && password) {
    let user = await User.findOne({
      $or: [{ username: username }, { email: username }],
    }).catch(() => {
      payload.errorMessage = "Something went wrong, try again.";
      res.status(204).render("login", payload);
    });
    if(user != null) {
      if(user.comparePassword(password)) {
        req.session.user = user;
        res.redirect("/");
      } else {
        payload.errorMessage = "Password incorrect.";
        res.status(403).render("login", payload);
      }
    } else {
        payload.errorMessage = "Email or username not exist.";
        res.status(403).render("login", payload);
    }
  }
  payload.errorMessage = "Make sure each field have a valid value.";
  res.status(204).render("login", payload);
});

module.exports = router;
