const mongoose = require("mongoose");
const goodsSchema = new mongoose.Schema({ // 정보가 쌓이는 형식을 지정해둔것만 같네.

  goodsId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  thumbnailUrl: {
    type: String
  },
  category: {
    type: String
  },
  price: {
    type: Number
  }
});

module.exports = mongoose.model("Goods", goodsSchema);