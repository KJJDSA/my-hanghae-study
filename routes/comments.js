const express = require('express'); //express 임포트
const Post = require("../schemas/post"); // schemas에 있는 goods를 임포트. 
const Comment = require("../schemas/comment");
const router = express.Router(); // express 의존함수 router임포트

router.get("/test", (req, res) => {
  res.send('테스트url입니다 posts에는 없어요 기본url못써요 겹쳐요');
})

// 댓글목록 불러오기(상세보기란에!)
router.get("/comments/:postId", async (req, res) => {
  const { postId } = req.params;
  const commentlist = await Comment.find({ postId: postId }); //포스트 리스트 가져오기(배열) ss
  const results = commentlist.map((com) => {
    return {
      commentId: com._id,
      user: com.user,
      content: com.content,
      cratedAt: com.createdAt
    };
  });

  res.json({ data: results });
});

// 댓글달기
router.post("/comments/:postId", async (req, res) => {
  const { user, password, content } = req.body; //받는건 이름, 비밀번호, 제목과 내용까지.
  const { postId } = req.params;
  await Comment.create({ postId, user, password, content });
  res.json({ "message": "댓글을 생성하였습니다." });
});

//댓글 수정하기
router.put("/comments/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const { password, content } = req.body; //**이거 바뀌면 안되는구나;
  const commentone = await Comment.findOne({ _id: commentId });
  if (password === commentone.password) {
    await Comment.updateOne({ _id: commentId }, { $set: { content: content } });
  }
  else { return res.json({ messege: "비밀번호가 정확하지 않습니다." }) }
  res.json({ "messege": "댓글을 수정하였습니다." });
})

//댓글 삭제하기
router.delete("/comments/:commentId", async (req, res) => {
  const { commentId } = req.params; //id가져옴
  const { password } = req.body; //비번가져옴
  const commentone = await Comment.findOne({ _id: commentId });//댓글찾아옴
  if (password === commentone.password) {//비번확인함
    await Comment.deleteOne({ _id: commentId });
  }
  else { return res.json({ messege: "비밀번호가 정확하지 않습니다." }) }
  res.json({ "messege": "댓글을 삭제하였습니다." });
})

module.exports = router;