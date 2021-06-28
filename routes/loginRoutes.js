const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  let payload = {
    title : "Login"
  }
  res.status(200).render("login", payload);
});

module.exports = router;
