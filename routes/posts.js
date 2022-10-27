const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');
const getUserIdMiddlware = require('../middleware/getUserIdMiddlware');
const { upload } = require('../middleware/upload-middleware');

const PostsController = require('../controllers/posts');
const postsController = new PostsController();

router.get('/', getUserIdMiddlware, postsController.getPosts);
router.get('/:postId', postsController.getPostById);
//이미지를 업로드받고 저장경로를 client에 전달해줌 미들웨어의 정적파일을 제공하는 라우터
router.post('/', upload.single('images'), authMiddleware, postsController.createPost); // upload.array('many') 잠시 주석
router.put('/:postId', authMiddleware, postsController.updatePost);
router.delete('/:postId', authMiddleware, postsController.deletePost);
router.put('/likes/:postId', authMiddleware, postsController.likePost);

module.exports = router;
