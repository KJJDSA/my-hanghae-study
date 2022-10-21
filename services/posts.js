const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();

  getPosts = async () => {
    const allPost = await this.postRepository.getPosts();

    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return allPost;
  };

  findPostById = async (postId) => {
    const findPost = await this.postRepository.findPostById(postId);

    return findPost;
  };

  createPost = async (nickname, title, content) => {
    const createPostData = await this.postRepository.createPost(nickname, title, content, img);

    return createPostData;
  };

  updatePost = async (postId, userId, title, content) => {
    await this.postRepository.updatePost(postId, title, content);
    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) throw new Error("Post doesn't exist");
    if (findPost.userId !== userId) {
      return '권한이 없습니다.';
    }

    return findPost;
  };

  deletePost = async (postId, userId) => {
    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) throw new Error("Post doesn't exist");
    if (findPost.userId !== userId) {
      return '권한이 없습니다.';
    }

    await this.postRepository.deletePost(postId);

    return findPost;
  };

  likePost = async (postId, like, userId) => {
    if (like) {
      await this.postRepository.createLike(postId, userId);
      await this.postRepository.countLike(postId);
      return '좋등';
    } else {
      await this.postRepository.deleteLike(postId, userId);
      await this.postRepository.discountLike(postId);
      return '좋취';
    }
  };
}

module.exports = PostService;
