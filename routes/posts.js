const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const multer = require('multer');
const path = require('path');
const AWS = require('aws-sdk');

const PostsController = require('../controllers/posts');
const postsController = new PostsController();

AWS.config.update({
  accessKetId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'team4-mini',
    key(req, file, cb) {
      cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.get('/', postsController.getPosts);
router.get('/:postId', postsController.getPostById);
//이미지를 업로드받고 저장경로를 client에 전달해줌 미들웨어의 정적파일을 제공하는 라우터
router.post('/', authMiddleware, upload.array('many'), postsController.createPost); //single, for문? db엔 어떻게,,
router.put('/:postId', authMiddleware, postsController.updatePost);
router.delete('/:postId', authMiddleware, postsController.deletePost);
router.put('/likes/:postId', authMiddleware, postsController.likePost);

module.exports = router;
