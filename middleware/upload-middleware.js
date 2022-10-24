const multer = require('multer');
const path = require('path');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
console.log(AWS, '1234');
require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'team4-mini',
    async key(req, file, cb) {
      await cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`);
      console.log(file.originalname);
    },
  }),
  limits: { fileSize: 5 * 2000 * 2000 },
});

exports.upload = multer(upload);
