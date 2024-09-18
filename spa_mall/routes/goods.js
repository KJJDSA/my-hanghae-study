// routes/goods.js
const express = require('express'); //express 임포트
const router = express.Router(); // express 의존함수 router임포트
const Goods = require("../schemas/goods"); // schemas에 있는 goods를 임포트. 
const Cart = require("../schemas/cart");


//기본형태
router.get('/', (req, res) => { //api를 라우터로 만듦. get임. 기본경로임. req 받고 res 보냄.
  res.send('default url for goods. js Get Method.'); //보낼 내용임. 화살표함수 맞음.
});

//post 상품추가
router.post("/goods", async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body; //구조분해할당

  const goods = await Goods.find({ goodsId }); //데이터베이스에서 상품id를 찾을 때까지 기다려라
  if (goods.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
  }

  const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });

  res.json({ goods: createdGoods });
});


// post 장바구니에 상품추가
router.post("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params; //상품 id를 params로 받음.  
  const { quantity } = req.body;  //수량을 body post로 받음. json.

  const existsCarts = await Cart.find({ goodsId: Number(goodsId) }); //아이디를 db에 조회. 숫자로 변환하여 조회 가능하게 함.
  if (existsCarts.length) {
    // .length는 변수에(배열에) 담긴 데이터가 있는지 판별할 수 있음. 0이면 falthy하므로 문제가 없지만, 찾아봤을 때 1개 이상이라면 이미 db에 있는 상품이므로 추가할 수 없음.
    return res.json({ success: false, errorMessage: "이미 장바구니에 존재하는 상품입니다." });
  }

  await Cart.create({ goodsId: Number(goodsId), quantity: quantity }); // 아래 res.json 실행 좀 기다리라는 뜻. 완성되야 보내지.

  res.json({ result: "success" });
});

//상품 수량 수정 API
router.put("/goods/:goodsId/cart", async (req, res) => { //put 메서드. 수정을 하는 레스트api
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
  if (existsCarts.length) { // 찾아서 존재하긴 해야 수정을 하든 말든 할테니 여기선 true가 긍정의 의미.
    await Cart.updateOne({ goodsId: Number(goodsId) }, { $set: { quantity } }); //위와 이부분만 다르다. 
  }

  res.json({ success: true });
})

//상품 제거 API 
router.delete("/goods/:goodsId/cart", async (req, res) => { //delete 메서드. 삭제하는 메서드. 
  const { goodsId } = req.params;

  const existsCarts = await Cart.find({ goodsId });
  if (existsCarts.length > 0) { // 찾아서 존재하긴 해야 삭제를 하든 말든 할테니 여기선 true가 긍정의 의미.
    await Cart.deleteOne({ goodsId });
  }

  res.json({ result: "success" })
});
// routes/goods.js
module.exports = router; //router라는 변수를 밖으로 내보냄(모듈방식)



// router.get("/goods", (req, res) => {
//   // /routes/good.js
//   // /routes/good.js
//   const goods = [
//     {
//       goodsId: 4,
//       name: "상품 4",
//       thumbnailUrl:
//         "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
//       category: "drink",
//       price: 0.1,
//     },
//     {
//       goodsId: 3,
//       name: "상품 3",
//       thumbnailUrl:
//         "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
//       category: "drink",
//       price: 2.2,
//     },
//     {
//       goodsId: 2,
//       name: "상품 2",
//       thumbnailUrl:
//         "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
//       category: "drink",
//       price: 0.11,
//     },
//     {
//       goodsId: 1,
//       name: "상품 1",
//       thumbnailUrl:
//         "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
//       category: "drink",
//       price: 6.2,
//     },
//   ];
//   res.json({ goods: goods });
// })

// router.get("/goodId", (req, res) => { //상품이 먼저 읽히는게 좋기 때문에 아래로 내려도 됨. 보통 db쓰니까 이번이 마지막이지만.
//   const goodId = req.params.goodId;

//   res.json({ goodId: goodId })
// })

// router.get("/goods/:goodsId", (req, res) => {

//   const goods = [
//     {
//       goodsId: 4,
//       name: "상품 4",
//       thumbnailUrl:
//         "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
//       category: "drink",
//       price: 0.1,
//     },
//     {
//       goodsId: 3,
//       name: "상품 3",
//       thumbnailUrl:
//         "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
//       category: "drink",
//       price: 2.2,
//     },
//     {
//       goodsId: 2,
//       name: "상품 2",
//       thumbnailUrl:
//         "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
//       category: "drink",
//       price: 0.11,
//     },
//     {
//       goodsId: 1,
//       name: "상품 1",
//       thumbnailUrl:
//         "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
//       category: "drink",
//       price: 6.2,
//     },
//   ];

//   // const goodsId = req.params.goodsId; //params가 오브젝트임. 그래서 goodsId로 쪼갬.
//   const { goodsId } = req.params; //이렇게 해도 똑같음.

//   const detail = goods.filter((item) => { return item.goodsId === Number(goodsId) }); //상세페이지를 찾는 방법인가봐..

//   res.json({ "detail": detail });
// })


