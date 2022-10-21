const { Posts } = require('../models');
const { Likes } = require('../models');

class PostRepository {
  getPosts = async () => {
    const posts = await Posts.findAll();

    return posts;
  };

  findPostById = async (postsId) => {
    const post = await Posts.findByPk(postsId);

    return post;
  };

  createPost = async (nickname, title, content, img) => {
    console.log(nickname, title, content);
    const createPostData = await Posts.create({
      user: nickname,
      likeSum: 0,
      title,
      content,
      imgUrl: img,
    });

    return createPostData;
  };

  updatePost = async (postsId, title, content) => {
    const updatePostData = await Posts.update({ title, content }, { where: { postsId } });

    return updatePostData;
  };

  deletePost = async (postsId) => {
    const updatePostData = await Posts.destroy({ where: { postsId } });

    return updatePostData;
  };

  createLike = async (postsId, nickname) => {
    const createLike = await Likes.create({ user: nickname, like: postsId });
  };

  countLike = async (postsId) => {
    const countLike = await Posts.increment({ likeSum: 1 }, { where: { postsId: postsId } });
    return countLike;
  };

  deleteLike = async (postsId, nickname) => {
    const deleteLike = await Likes.destroy({
      where: { user: nickname, like: postsId },
    });
    return deleteLike;
  };

  discountLike = async (postsId) => {
    const discountLike = await Posts.decrement({ likeSum: 1 }, { where: { postsId: postsId } });
    return discountLike;
  };
}

module.exports = PostRepository;
