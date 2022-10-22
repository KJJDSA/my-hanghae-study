const PostService = require('../services/posts');

class PostsController {
  postService = new PostService();

  getPosts = async (req, res, next) => {
    const posts = await this.postService.getPosts();

    res.status(200).json({ data: posts });
  };

  getPostById = async (req, res, next) => {
    const { postId } = req.params;
    const post = await this.postService.findPostById(postId);

    res.status(200).json({ data: post });
  };

  createPost = async (req, res, next) => {
    console.log(req.file); //미들웨어 확인용
    const userId = res.locals.user.userId;
    const { title, content } = req.body;
    const img = req.file.location; // 이미지 데이터X 저장된 경로만 가져옴
    if (!req.headers.authorization) {
      res.status(400);
      return;
    }
    const createPostData = await this.postService.createPost(userId, title, content, img);

    res.status(201).json({ data: createPostData });
  };

  updatePost = async (req, res, next) => {
    const { postId } = req.params;
    const { title, content } = req.body;
    const userId = res.locals.user.userId;

    await this.postService.updatePost(postId, userId, title, content);

    res.status(204);
  };

  deletePost = async (req, res, next) => {
    const { postId } = req.params;
    const userId = res.locals.user.userId;

    await this.postService.deletePost(postId, userId);

    res.status(204);
  };

  likePost = async (req, res, next) => {
    const { postId } = req.params;
    const { like } = req.body;
    const userId = res.locals.user.userId;

    await this.postService.likePost(postId, like, userId);
    res.status(204);
  };
}

module.exports = PostsController;
