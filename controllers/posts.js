const PostService = require('../services/posts');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

class PostsController {
  postService = new PostService();

  getPosts = async (req, res, next) => {
    try {
      const { page, pagesize } = req.query;
      const posts = await this.postService.getPosts({ page, pagesize });

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
      const imgUrl = req.file.location;
      const userId = res.locals.user.userId;

      const updatePost = await this.postService.updatePost(postId, userId, title, content, imgUrl);
      res.status(200).json({ message: updatePost });
    } catch (error) {
      console.log(`${error.name}:${error.message}`);
      res.status(400).json({ Type: error.name, Message: error.message });
    }
  };

  deletePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const userId = res.locals.user.userId;

      const deletePost = await this.postService.deletePost(postId, userId);
      res.status(200).json({ message: deletePost });
    } catch (error) {
      console.log(`${error.name}:${error.message}`);
      res.status(400).json({ Type: error.name, Message: error.message });
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
