const mongoose = require("mongoose"); //몽고디비와 관련된 녀석들은 다 이거 리콰이어하는듯. 

const cartSchema = new mongoose.Schema({
  goodsId: {
    type: Number,
    required: true,
    unique: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Cart", cartSchema);