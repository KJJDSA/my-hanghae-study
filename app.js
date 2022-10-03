const express = require("express");
const app = express();
const port = 3000;
const connect = require("./schemas/index");
const postsRouter = require("./routes/posts.js");
const commentsRouter = require("./routes/comments.js");
connect();

app.get("/", (req, res) => {
  res.send('안녕하세요');
})

app.use(express.json()); //json 미들웨어. body로 전달될 데이터를 사용할 수 있게 해주는 물건. 

app.use("/api", [postsRouter, commentsRouter]);

app.listen(port, () => {
  console.log(`서버가 ${port}번 포트로 열렸습니다.`);
})

// 아래는 예시
// app.post("/", (req, res) => { // body 객체
//   console.log(req.body);

//   res.send("body 잘 써집니다");
// })

// app.get("/", (req, res) => { //query 객체
//   console.log(req.query);
//   const 제이슨 = {
//     'mr.json': 'json 잘 받았다.',
//     'mrs.json': 'json 잘 받았음.'
//   }
//   res.json(제이슨) //.status(000) 으로 상태알림이 가능
// })

// app.get("/:id", (req, res) => { // params 객체
//   console.log(req.params);

//   res.send(":id uri에 정상적으로 반환되었습니다.");
// })