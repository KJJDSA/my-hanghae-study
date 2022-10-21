const PostService = require('../services/posts.service');

class PostsController {
  postService = new PostService();

  getPosts = async (req, res, next) => {
    const posts = await this.postService.getPosts();

    res.status(200).json({ data: posts });
  };

  getPostById = async (req, res, next) => {
    const { postsId } = req.params;
    const post = await this.postService.findPostById(postsId);

    res.status(200).json({ data: post });
  };

  createPost = async (req, res, next) => {
    console.log(req.file, req.body.url); //미들웨어 확인용
    const nickname = res.locals.user.nickname;
    const { title, content } = req.body;
    const img = req.body.url; // 이미지 데이터X 주소만 가져옴
    if (!req.headers.authorization) {
      res.status(400);
      return;
    }

    const createPostData = await this.postService.createPost(nickname, title, content, img);
    res.status(201).json({ data: createPostData });
  };

  updatePost = async (req, res, next) => {
    const { postsId } = req.params;
    const { title, content } = req.body;
    const nickname = res.locals.user.nickname;

    await this.postService.updatePost(postsId, nickname, title, content);

    res.status(204);
  };

  deletePost = async (req, res, next) => {
    const { postsId } = req.params;
    const nickname = res.locals.user.nickname;

    await this.postService.deletePost(postsId, nickname);

    res.status(204);
  };

  likePost = async (req, res, next) => {
    const { postsId } = req.params;
    const { like } = req.body;
    const nickname = res.locals.user.nickname;

    const likePost = await this.postService.likePost(postsId, like, nickname);
    res.status(204);
  };
}

module.exports = PostsController;
