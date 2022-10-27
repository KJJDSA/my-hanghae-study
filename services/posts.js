const PostRepository = require('../repositories/posts');
const { post } = require('../routes/posts');

class PostService {
  postRepository = new PostRepository();

  getPosts = async ({ page, pagesize, userId }) => {
    try {
      // 무한스크롤 위해 page, pagesize 받음. 
      let allPost = await this.postRepository.getPosts();
      // 무한스크롤 위해 날짜순 정렬
      allPost.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });

      let selectPost = allPost.filter((a, b) => {
        if (b >= pagesize * (page - 1)) {
          if (b < page * pagesize) {
            return a
          }
        }
      })
      selectPost.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
      // 로그인을 한 경우
      if (userId !== "non") {
        let userLikes = await this.postRepository.getILikes({ userId });

        // console.log(selectPost[0].dataValues)
        let result = selectPost.map((x) => {
          // console.log(userLikes.map((y) => y.postId) + '=' + x.dataValues.PostId)
          return {
            ...x.dataValues,
            userLike: userLikes.map((y) => y.postId).includes(x.dataValues.PostId)
          }
        })
        return result;
      } else {
        let result = selectPost.map((x) => {
          // console.log(userLikes.map((y) => y.postId) + '=' + x.dataValues.PostId)
          return {
            ...x.dataValues,
            userLike: false,
          }
        })
        return result
      }
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
  //1025일새벽 1시 프론트와 연결 테스를 위해 주석처리함
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
      if (findPost.userId !== userId) {
        return '권한이 없습니다.';
      }

      return findPost;
    } catch (error) {
      throw error;
    }
  };

  deletePost = async (postId, userId) => {
    try {
      const findPost = await this.postRepository.findPostById(postId);
      if (!findPost) throw { name: 'ERROR', message: "Post doesn't exist" };
      if (findPost.userId !== userId) {
        return '권한이 없습니다.';
      }

      await this.postRepository.deletePost(postId);

      return findPost;
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
