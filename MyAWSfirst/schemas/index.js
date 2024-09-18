const mongoose = require("mongoose");


const connect = () => {
  mongoose
    .connect("mongodb://admin:1234@127.0.0.1/spa_week3?authSource=admin") //아래거로 하면 연결이 안된다. 
    // .connect("mongodb://admin:1234@127.0.0.1/spa_week3?authSource=admin")
    // .connect("mongodb://127.0.0.1/spa_week3")
    // .connect("mongodb://localhost:3000/spa_mall")
    // 인스턴스 ip로 바꾸지 않아도 괜찮음
    // 인스턴스도 자기자신의 ip는 위와 같음
    // admin:1234@
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect; // connect 수출. app.js 에서 connect()