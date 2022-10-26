const PostService = require('../services/posts');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

class PostsController {
  postService = new PostService();

  getPosts = async (req, res, next) => {
    try {
      const posts = await this.postService.getPosts();

      res.status(200).json({ data: posts });
    } catch (error) {
      console.log(`${error.name}:${error.message}`);
      res.status(400).json({ Type: error.name, Message: error.message });
    }
  };

  getPostById = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const post = await this.postService.findPostById(postId);

      res.status(200).json({ data: post });
    } catch (error) {
      console.log(`${error.name}:${error.message}`);
      res.status(400).json({ Type: error.name, Message: error.message });
    }
  };

  createPost = async (req, res, next) => {
    try {
      const imgUrl = await req.file.location;
      console.log(req.body);

      // const authorization = req.headers.authorization;
      //
      // const [authType, authToken] = (authorization || "").split(" ");
      // if (!authToken || authType !== "Bearer") {
      //   res.status(401).send({
      //     errorMessage: "로그인 후 이용 가능한 기능입니다.",
      //   });
      //   return;
      // }
      //
      // res.locals.authToken = authToken;
      //
      // try {
      //   const { userId } = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
      //   User.findOne({ where: { userId } }).then((user) => {
      //     res.locals.user = user;
      //     next();
      //   });
      // } catch (err) {
      //   res.status(401).send({
      //     errorMessage: "로그인 후 이용 가능한 기능입니다.",
      //   });
      // }

      const { userId, nickname } = res.locals.user;

      const { title, content } = req.body;

      const createPostData = await this.postService.createPost({
        userId,
        nickname,
        title,
        content,
        imgUrl,
      });
      res.status(200).json({ data: createPostData });
    } catch (error) {
      console.log(`${error.name}:${error.message}`);
      res.status(400).json({ Type: error.name, Message: error.message });
    }
  };

  updatePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { title, content } = req.body;
      const userId = res.locals.user.userId;
      console.log(userId);

      const updatePost = await this.postService.updatePost(postId, userId, title, content);

      res.status(200).json({ message: updatePost });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };

  deletePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const userId = res.locals.user.userId;

      const deletePost = await this.postService.deletePost(postId, userId);
      res.status(200).json({ message: deletePost });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };

  likePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { like } = req.body;
      const userId = res.locals.user.userId;

      const likePost = await this.postService.likePost(postId, like, userId);
      res.status(200).json({ message: likePost });
    } catch (error) {
      console.log(`${error.name}:${error.message}`);
      res.status(400).json({ Type: error.name, Message: error.message });
    }
  };
}

module.exports = PostsController;
