const { Posts } = require('../models');
const { Likes } = require('../models');

class PostRepository {
  getPosts = async () => {
    const posts = await Posts.findAll();

    return posts;
  };

  findPostById = async (postId) => {
    const post = await Posts.findByPk(postId);

    return post;
  };

  createPost = async (nickname, title, content, img) => {
    const createPostData = await Posts.create({
      user: nickname,
      likeSum: 0,
      title,
      content,
      imgUrl: img,
    });

    return createPostData;
  };

  updatePost = async (postId, title, content) => {
    const updatePostData = await Posts.update({ title, content }, { where: { postId } });

    return updatePostData;
  };

  deletePost = async (postId) => {
    const updatePostData = await Posts.destroy({ where: { postId } });

    return updatePostData;
  };

  createLike = async (postId, userId) => {
    const createLike = await Likes.create({ user: userId, like: postId });
  };

  countLike = async (postId) => {
    const countLike = await Posts.increment({ likeSum: 1 }, { where: { postId: postId } });
    return countLike;
  };

  deleteLike = async (postId, userId) => {
    const deleteLike = await Likes.destroy({
      where: { userId: userId, like: postId },
    });
    return deleteLike;
  };

  discountLike = async (postId) => {
    const discountLike = await Posts.decrement({ likeSum: 1 }, { where: { postId: postId } });
    return discountLike;
  };
}

module.exports = PostRepository;
