const express = require("express");
const router = express.Router();
const User = require("../../schema/UserSchema");

router.get("/", (req, res, next) => {
 
});
router.post("/", async (req, res, next) => {
  if(!req.body.content) {
    return res.sendStatus(400);
  }
  res.status(200).send("it works !")
});
module.exports = router;
