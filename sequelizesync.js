const { sequelize } = require("../models");
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 리셋: false");
  })
  .catch((err) => {
    console.error(err);
  });