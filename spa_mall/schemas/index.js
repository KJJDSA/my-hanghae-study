const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1/spa_mall") //아래거로 하면 연결이 안된다. 
    // .connect("mongodb://localhost:3000/spa_mall")
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;