const express = require('express'); //express 임포트
const Post = require("../schemas/post"); // schemas에 있는 goods를 임포트. 
const router = express.Router(); // express 의존함수 router임포트

// 전체 포스트 가져오기
router.get("/", async (req, res) => {
  const postlist = await Post.find(); //포스트 리스트 가져오기(배열)

  const results = postlist.map((post) => {
    return {
      postId: post._id,
      user: post.user,
      title: post.title,
      cratedAt: post.createdAt
    };
  });

  res.json({ data: results });
});

// 포스트 만들기
router.post("/", async (req, res) => {
  const { user, password, title, content } = req.body; //받는건 이름, 비밀번호, 제목과 내용까지.

  Post.create(req.body); //이게 되네;;;; 
  res.json({ "message": "게시글을 생성하였습니다." });
});

//상세 포스트 가져오기
router.get("/:postId", async (req, res) => {   //params를 가져오는 get
  // const postId = req.params.goodsId;              //이렇게 해도되고
  const { postId } = req.params;                     //이렇게 해도 됨(구조분해할당)
  const post = await Post.findOne({ _id: postId });  //포스트 리스트 가져오기(배열)
  delete post.password // <<< BAD. find 선에서 컷 가능.

  // const post = postlist.filter((item) => item["_id"].toString() === postId);
  // _id 비교해서 하나만 가져오기. 
  // *해결되서 기분은 좋은데 tostring이 왜 뜨는거지????
  // const [results] = post.map((post) => { // *앙 구조분해할당띠

  // return {
  //   postId: post._id,
  //   user: post.user,
  //   title: post.title,
  //   content: post.content,
  //   cratedAt: post.createdAt
  // };
  // });
  res.json({ "data": post });
});

//게시글 수정하기
router.put("/:postId", async (req, res) => {
  const { postId } = req.params;
  const { password, title, content } = req.body; //**이거 바뀌면 안되는구나; ss 
  const postone = await Post.findOne({ _id: postId }); // 포스트를 통으로 가져오는데, 비밀번호만 가져오면 되는거였다..
  if (password === postone.password) { //고작 비밀번호밖에 안씀 == 비효율
    await Post.updateOne({ _id: postId }, {
      $set: {
        title: title,
        content: content
      }
    });
  }
  else { return res.json({ messege: "비밀번호가 정확하지 않습니다." }) } //리스폰스는 하나뿐이어야됨.
  res.json({ "messege": "게시글을 수정하였습니다." });
})

router.delete("/:postId", async (req, res) => {
  const { postId } = req.params;
  const { password } = req.body; //**이거 바뀌면 안되는구나;
  console.log(password)
  const postone = await Post.findOne({ _id: postId });
  if (password === postone.password) {
    await Post.deleteOne({ _id: postId });
  }
  else { return res.json({ messege: "비밀번호가 정확하지 않습니다." }) }

  res.json({ "messege": "게시글을 삭제했습니다." });
})


module.exports = router; // router 함수 붙은건 이제 나갈 수 있습니다. 