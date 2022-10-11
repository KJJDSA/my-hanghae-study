const express = require('express'); //express 임포트
const router = express.Router(); // express 의존함수 router임포트
const authMiddleware = require("../middlewares/authMiddleware");
const SECRETKEY = "this-is-secretkey"
const { Op } = require("sequelize"); // sequelize 불러오기
const { Users, Comments } = require("../models"); // models 모듈 
const jwt = require("jsonwebtoken")

// 댓글목록 불러오기(상세보기란에!) 완료
// {
//     "data": [
//         {
//             "commentId": 2,
//             "userId": 1,
//             "nickname": "Developer",
//             "comment": "안녕하세요 2번째 댓글입니다.",
//             "createdAt": "2022-07-25T07:54:24.000Z",
//             "updatedAt": "2022-07-25T07:54:24.000Z"
//         }, {
//             "commentId": 1,
//             "userId": 1,
//             "nickname": "Developer",
//             "comment": "안녕하세요 댓글입니다.",
//             "createdAt": "2022-07-25T07:53:31.000Z",
//             "updatedAt": "2022-07-25T07:53:31.000Z"
//         }
//     ]
// }
router.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  const commentlist = await Comments.findAll({ where: { postId } }); //포스트 리스트 가져오기(배열) ss
  const answer = commentlist.sort((a, b) => a["createdAt"] - b["createdAt"]) //잘 됨.
  res.json({ data: answer });
});

// 댓글달기 완료
// {  "comment": "안녕하세요 댓글입니다."}
router.post("/:postId", authMiddleware, async (req, res) => {
  const { comment } = req.body; //코멘트가 아니라 컨텐츠로 했네..
  const { postId } = req.params;
  const { userId, nickname } = res.locals.user;
  await Comments.create({ userId, postId, nickname, comment }); //postId 같이 넣어줌 식별자 역할.
  res.json({ "message": "댓글을 생성하였습니다." });
});

//댓글 수정하기
router.put("/:commentId", authMiddleware, async (req, res) => {
  const { commentId } = req.params;
  const { comment } = req.body; //모델에서 comment다.
  const commentone = await Comments.findOne({ where: { commentId } });
  const { userId } = res.locals.user;
  if (commentone.userId === userId) { //인증은 누구나 하지만 같은 사람인지 봐야함
    await commentone.set({ comment });
    await commentone.save();
  }
  else { return res.json({ messege: "댓글을 수정할 수 없습니다." }) }
  res.json({ "messege": "댓글을 수정 하였습니다." });
})

//댓글 삭제하기
router.delete("/:commentId", authMiddleware, async (req, res) => {
  const { commentId } = req.params;
  const commentone = await Comments.findOne({ where: { commentId } });//댓글찾아옴
  const { userId } = res.locals.user;
  if (commentone.userId === userId) { //인증은 누구나 하지만 같은 사람인지 봐야함
    await commentone.destroy();
  }
  else { return res.json({ messege: "댓글을 삭제 할 수 없습니다." }) }
  res.json({ "messege": "댓글을 삭제하였습니다." });
})


module.exports = router;