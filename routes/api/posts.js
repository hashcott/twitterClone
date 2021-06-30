const express = require("express");
const router = express.Router();
const User = require("../../schema/UserSchema");
const Post = require("../../schema/PostSchema");

router.get("/", (req, res, next) => {});
router.post("/", (req, res, next) => {
  console.log(req.body);
  if (!req.body.content) {
    console.log("Content params not send with request");
    return res.sendStatus(400);
  }

  let postContent = {
    content: req.body.content.trim(),
    postBy: req.session.user,
  };

  Post.create(postContent)
    .then(async (newPost) => {
      newPost = await User.populate(newPost, { path: "postBy" });
      res.status(201).send(newPost);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
});
module.exports = router;
