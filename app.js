const express = require("express");
const app = express();
const port = 3000;
const goodsRouter = require("./routes/goods.js"); //안쓸 때는 꼭 주석처리를 해야하는 것인가? 강의에선 안그러던데
const connect = require("./schemas");
connect();
const cartsRouter = require("./routes/carts");

app.get("/", (req, res) => {
  res.send('안녕하세요');
})

app.use(express.json()); //json 미들웨어. body로 전달될 데이터를 사용할 수 있게 해주는 물건. 

//### /api/ use ###
app.use("/api", [goodsRouter, cartsRouter]); //goodsRouter 라는 변수명으로 받아옴. /api 붙여야 받을 수 있음.



app.listen(port, () => {
  console.log(`서버가 ${port}번 포트로 열렸습니다.`);
})




// app.post("/", (req, res) => { // body 객체
//   console.log(req.body);

//   res.send("기본 url에 post 메소드가 정상적으로 실행되었습니다.");
// })

// app.get("/", (req, res) => { //query 객체
//   console.log(req.query);

//   // res.send("쿼리스트링 잘 받았음")
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
