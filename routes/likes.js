const express = require('express'); //express 임포트
const router = express.Router(); // express 의존함수 router임포트
const authMiddleware = require("../middlewares/authMiddleware");
const SECRETKEY = "this-is-secretkey"
const { Op } = require("sequelize"); // sequelize 불러오기
const { Users, Likes, Posts } = require("../models"); // models 모듈 
const jwt = require("jsonwebtoken")

// 내가 좋아요한 게시글 조회
router.get("/", authMiddleware, async (req, res) => {
  const { userId } = res.locals.user; //locals에서 userId 빼와서 Likes 테이블 검색
  let likelist = await Likes.findAll({ where: { userId: userId } });
  let postlist = [];
  for (let i = 0; i < likelist.length; i++) {
    console.log(likelist[i].dataValues.postId)
    postlist.push(await Posts.findOne({ where: { postId: likelist[i].dataValues.postId } }))
  }
  postlist.sort((a, b) => b["likes"] - a["likes"])
  res.json({ postlist });
});

//좋아요
router.put("/:postId", authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { userId } = res.locals.user;  //애초에 여기까지 왔다는건 인증된 사람이라는 뜻임. 
  const postone = await Posts.findOne({ where: { postId } });
  const iLike = await Likes.findOne({ where: { postId, userId } }); // where의 조건으로 postId를 가져오게함
  if (!iLike) { //likes에 좋아요한 정보가 없으면 바로 ㄱ? post를 만든 아이디가 내 아이디일 필요는 없잖아.   
    await postone.set({
      likes: postone.likes += 1, //게시글 likes 컬럼에도 1 넣어주고
    });
    await postone.save();
    Likes.create({ userId, postId }) // likes 하나 생성하기
    return res.json({ "messege": "♥" });
  }
  else {
    await postone.set({
      likes: postone.likes -= 1, //게시글 likes 컬럼에서 1빼주고
    });
    await postone.save();
    iLike.destroy()
    return res.json({ "messege": "♡" }) //내가 좋아요한 데이터 삭제하기
  }
})



module.exports = router;