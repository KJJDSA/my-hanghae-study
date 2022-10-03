const mongoose = require("mongoose"); //몽고디비와 관련된 녀석들은 다 이거 리콰이어하는듯. 

const commentSchema = new mongoose.Schema({ //유저, 패스워드(수정용), 콘텐츠, 날짜(조회용)
  postId: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: { //넣을 때 시간대도 넣어줘야.. 근데 여기서 넣어주는거 같은데?
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Comment", commentSchema);