const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).render("register");
});
router.post('/', (req, res, next) => {
  console.log(req.body);
  let firstName = req.body.firstName.trim();
  let lastName = req.body.lastName.trim();
  let username = req.body.username.trim();
  let password = req.body.password.trim();
  let passwordConf = req.body.passwordConf.trim();

  let payload = req.body;

  if(firstName && lastName && username && password && passwordConf) {
    
  } else {
    payload.errorMessage = "Make sure each field have a valid value.";
    res.status(200).render("register", payload);
  }
})
module.exports = router;
