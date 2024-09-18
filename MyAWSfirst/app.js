const express = require("express");
const app = express();
const port = 3000;
const connect = require("./schemas"); //index 빼도됨
const router = require("./routes"); // 안 써도 index 라는 단어를 가진 파일을 디폴트로 가져옴.
// const postsRouter = require("./routes/posts.js");
// const commentsRouter = require("./routes/comments.js");
connect(); // schemas 와 연결. app.use처럼 사용을 해주어야해서

app.get("/", (req, res) => {
  res.send('안녕하세요');
})

app.get("/:id", (req, res) => { // params 객체
  console.log(req.params);

  res.send(":id uri에 정상적 으로반환 되었습니다.");
})

app.use(express.json()); //json 미들웨어. body로 전달될 데이터를 사용할 수 있게 해주는 물건.  ss

// app.use("/api", [postsRouter, commentsRouter]);
app.use("/api", router);


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

