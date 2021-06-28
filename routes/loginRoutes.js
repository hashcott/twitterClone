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
  let password = req.body.logPassword.trim();
  if (username && password) {
    let user = await User.findOne({
      $or: [{ username: username }, { email: username }],
    }).catch(() => {
      payload.errorMessage = "Something went wrong, try again.";
      return res.status(204).render("login", payload);
    });
    if (user != null) {
      let isMatched = await user.comparePassword(password).catch(() => {
        payload.errorMessage = "Something went wrong, try again.";
        return res.status(204).render("login", payload);
      });
      if (isMatched) {
        req.session.user = user;
        return res.redirect("/");
      } else {
        payload.errorMessage = "Password incorrect.";
        return res.status(403).render("login", payload);
      }
    } else {
      payload.errorMessage = "Email or username not exist.";
      return res.status(403).render("login", payload);
    }
  }
  payload.errorMessage = "Make sure each field have a valid value.";
  res.status(204).render("login", payload);
});

module.exports = router;
