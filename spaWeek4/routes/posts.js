const express = require('express'); //express 임포트
const router = express.Router(); // express 의존함수 router임포트
const authMiddleware = require("../middlewares/authMiddleware");
const SECRETKEY = "this-is-secretkey"
const { Op } = require("sequelize"); // sequelize 불러오기
const { Users, Posts, Likes } = require("../models"); // models 모듈 
const jwt = require("jsonwebtoken")


// 전체 포스트 가져오기
// "postId": 2, 
// "userId": 1, 
// "nickname": "Developer", 
// "title": "안녕하세요 2번째 게시글 제목입니다.",
// "createdAt": "2022-07-25T07:45:56.000Z",
// "updatedAt": "2022-07-25T07:45:56.000Z", 
// "likes": 0
router.get("/", async (req, res) => {
  const postlist = await Posts.findAll({
    attributes: {
      exclude: ["content"]
    }
  }); //포스트 리스트 가져오기(배열)
  const answer = postlist.sort((a, b) => a["createdAt"] - b["createdAt"]) // SQL도 잘 된다. 
  // 오브젝트id 도 생성기간이 써있어서 정렬을 할 수 있다. 이거순으로 정렬해도 잘 됨.
  res.json({ data: answer });
});

// 포스트 만들기
// {  "title": "안녕하세요 게시글 제목입니다.",  "content": "안녕하세요 content 입니다."}
router.post("/", authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const { userId, nickname } = res.locals.user;

  Posts.create({ userId, nickname, title, content, likes: 0 });
  res.json({ "message": "게시글을 생성하였습니다." });
});

//상세 포스트 가져오기
// "data": {
//     "postId": 2,
//     "userId": 1,
//     "nickname": "Developer",
//     "title": "안녕하새요 수정된 게시글 입니다.",
//     "content": "안녕하세요 content 입니다.",
//     "createdAt": "2022-07-25T07:45:56.000Z",
//     "updatedAt": "2022-07-25T07:52:09.000Z",
//     "likes": 0
// }
router.get("/:postId", async (req, res) => {
  try {
    // const postId = req.params.goodsId;             
    const { postId } = req.params;
    const postone = await Posts.findOne({ where: { postId } })
    if (postone === null) throw new Error("해당 게시글이 존재하지 않습니다.")
    //posts -> postId 식으로 where을 구성해야 하는줄 알고 머리깨질뻔 했으나 기분좋은 오산. 애초에 posts에서 가져옴.
    //없으면 에러발사
    res.json({ "data": postone });

  } catch (err) {
    res.send("해당 게시글이 존재하지 않습니다.")
  }
});

//게시글 수정하기
// {
//     "title": "안녕하새요 수정된 게시글 입니다.",
//     "content": "안녕하세요 content 입니다."
// }
router.put("/:postId", authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body; //**이거 바뀌면 안되는구나; ss
  const { userId } = res.locals.user;  //response 였음 req아님?
  const postone = await Posts.findOne({ where: { postId } }); // where의 조건으로 postId를 가져오게함
  if (postone.userId === userId) { //인증은 누구나 하지만 같은 사람인지 봐야함
    await postone.set({
      title: title,
      content: content,
    });
    await postone.save();
  }
  else { return res.json({ messege: "게시글을 수정할 수 없습니다." }) } //존재하지 않는 글이라면
  res.json({ "messege": "게시글을 수정하였습니다." });
})

//게시글 삭제
router.delete("/:postId", authMiddleware, async (req, res) => {
  const { postId } = req.params;  //body가 필요없음 토큰인증쓰니까
  const { userId } = res.locals.user;  //response 였음 req아님
  const postone = await Posts.findOne({ where: { postId } }); //where로 바꿔주고
  if (postone.userId === userId) {
    await postone.destroy(); //삭제 넣어주고 끝
  }
  else { return res.json({ messege: "게시글을 삭제할 수 없습니다." }) }

  res.json({ "messege": "게시글을 삭제했습니다." });
})



module.exports = router;