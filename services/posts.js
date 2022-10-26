const PostRepository = require('../repositories/posts');

class PostService {
  postRepository = new PostRepository();

  getPosts = async () => {
    try {
      const allPost = await this.postRepository.getPosts();

      allPost.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });

      return allPost;
    } catch (error) {
      throw error;
    }
  };

  findPostById = async (postId) => {
    try {
      const findPost = await this.postRepository.findPostById(postId);

      return findPost;
    } catch (error) {
      throw error;
    }
  };

  createPost = async ({ userId, nickname, title, content, imgUrl }) => {
    try {
      const createPostData = await this.postRepository.createPost({
        userId,
        nickname,
        title,
        content,
        imgUrl,
      });

      return createPostData;
    } catch (error) {
      throw error;
    }
  };

  updatePost = async (postId, userId, title, content) => {
    try {
      await this.postRepository.updatePost(postId, title, content);
      const findPost = await this.postRepository.findPostById(postId);
      if (!findPost) throw { name: 'ERROR', message: "Post doesn't exist" };
      if (findPost.userId !== userId) throw { errorMessage: '권한이 없습니다.' };

      return '게시글 수정을 완료했습니다.';
    } catch (error) {
      throw error;
    }
  };

  deletePost = async (postId, userId) => {
    try {
      const findPost = await this.postRepository.findPostById(postId);
      if (!findPost) throw { name: 'ERROR', message: "Post doesn't exist" };
      if (findPost.userId !== userId) throw { errorMessage: '권한이 없습니다.' };

      await this.postRepository.deletePost(postId);

      return '게시글 삭제를 완료했습니다.';
    } catch (error) {
      throw error;
    }
  };

  likePost = async (postId, like, userId) => {
    try {
      if (like) {
        await this.postRepository.createLike(postId, userId);
        await this.postRepository.countLike(postId);
        return '좋아요 등록완료';
      } else {
        await this.postRepository.deleteLike(postId, userId);
        await this.postRepository.discountLike(postId);
        return '좋아요 취소완료';
      }
    } catch (error) {
      throw error;
    }
  };
}

module.exports = PostService;
