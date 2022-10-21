const express = require('express');
const router = express.Router();
const Likes = require('./likes');
const Posts = require('./posts');
const Comments = require('./comments');
const Login = require('./login');
const SignUp = require('./signup');

router.use('/likes', Likes);
router.use('/star/posts', Posts);
router.use('/star/comments', Comments);
router.use('/login', Login);
router.use('/signup', SignUp);

module.exports = router;
