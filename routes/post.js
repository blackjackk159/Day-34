const isAuth = require("./auth");
const router = require("express").Router();
const Post = require("../models/post.js");
const handleErrorAsync = require("../utils/handleErrorAsync");

router.post(
  "/",
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    const data = req.body;
    if (data.content) {
      const newPost = await Post.create({
        user: req.user.id,
        content: data.content,
        tags: data.tags,
        type: data.type,
      });
      res.status(200).json({
        status: "success",
        data: newPost,
      });
    } else {
      res.status(400).json({
        status: "false",
        message: "欄位未填寫正確，或無此 todo ID",
      });
    }
  })
);

module.exports = router;
