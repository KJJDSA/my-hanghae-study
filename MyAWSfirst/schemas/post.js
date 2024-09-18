const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({ // 포스트 게시글 개조 완료. 
  user: {
    type: String,
    required: true
  },
  password: { //숫자 외 문자도 들어갈 수 있으니까. ss 
    type: String,
    required: true
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  createdAt: { //넣을 때 시간대도 넣어줘야.. 근데 여기서 넣어주는거 같은데?
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", postSchema); //여기 이미 post로 박아버려서 바꾸면 안됨.