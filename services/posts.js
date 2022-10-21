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

  findPostById = async (postsId) => {
    const findPost = await this.postRepository.findPostById(postsId);

    return findPost;
  };

  createPost = async (nickname, title, content) => {
    const createPostData = await this.postRepository.createPost(nickname, title, content, img);

    return createPostData;
  };

  updatePost = async (postsId, nickname, title, content) => {
    await this.postRepository.updatePost(postsId, title, content);
    const findPost = await this.postRepository.findPostById(postsId);
    if (!findPost) throw new Error("Post doesn't exist");
    if (findPost.user !== nickname) {
      return '권한이 없습니다.';
    }

    return findPost;
  };

  deletePost = async (postsId, nickname) => {
    const findPost = await this.postRepository.findPostById(postsId);
    if (!findPost) throw new Error("Post doesn't exist");
    if (findPost.user !== nickname) {
      return '권한이 없습니다.';
    }

    await this.postRepository.deletePost(postsId);

    return findPost;
  };

  likePost = async (postsId, like, nickname) => {
    if (like) {
      await this.postRepository.createLike(postsId, nickname);
      await this.postRepository.countLike(postsId);
      return '좋등';
    } else {
      await this.postRepository.deleteLike(postsId, nickname);
      await this.postRepository.discountLike(postsId);
      return '좋취';
    }
  };
}

module.exports = PostService;
