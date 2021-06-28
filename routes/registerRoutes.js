const express = require("express");
const router = express.Router();
const User = require("../schema/UserSchema");

router.get("/", (req, res, next) => {
  res.status(200).render("register");
});
router.post("/", async (req, res, next) => {
  let firstName = req.body.firstName.trim();
  let lastName = req.body.lastName.trim();
  let username = req.body.username.trim();
  let email = req.body.email.trim();
  let password = req.body.password.trim();
  let passwordConf = req.body.passwordConf.trim();

  let payload = req.body;

  if (firstName && lastName && email && username && password && passwordConf) {
    let user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    }).catch((err) => {
      payload.errorMessage = err.message;
      res.status(500).render("register", payload);
    });

    if (user === null) {
      User.create(req.body)
        .then((us) => console.log(us))
        .catch((err) => console.log(err));
    } else {
      if (user.email === email) {
        payload.errorMessage = "Email already in use.";
      } else {
        payload.errorMessage = "Username already in use.";
      }
      res.status(409).render("register", payload);
    }
  } else {
    payload.errorMessage = "Make sure each field have a valid value.";
    res.status(200).render("register", payload);
  }
});
module.exports = router;
