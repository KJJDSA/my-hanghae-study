const express = require('express');
const router = express.Router();
const postsRouter = require("./posts.js");
const commentsRouter = require("./comments.js");
const usersRouter = require("./users.js");
const likesRouter = require("./likes.js");

router.use("/users", usersRouter);
router.use("/likes", likesRouter);
router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);

module.exports = router;