const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const multer = require('multer');
const path = require('path');
// const fs = require('fs');

const PostsController = require('../controllers/posts');
const postsController = new PostsController();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// const upload2 = multer();

router.get('/', postsController.getPosts);
router.get('/:postId', postsController.getPostById);
//이미지를 업로드받고 저장경로를 client에 전달해줌 미들웨어의 정적파일을 제공하는 라우터
router.post('/', authMiddleware, upload.array('many'), postsController.createPost); //single, for문?
// router.post('/img', authMiddleware, upload.array('many'), postsController.uploadImage);
router.put('/:postId', authMiddleware, postsController.updatePost);
router.delete('/:postId', authMiddleware, postsController.deletePost);
router.put('/likes/:postId', authMiddleware, postsController.likePost);

module.exports = router;
