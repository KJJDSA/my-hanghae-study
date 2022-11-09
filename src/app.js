const express = require('express');
const app = express();
const { sequelize } = require("../models");
const indexRouter = require("./routes");
require("dotenv").config();
const env = process.env;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json())
app.use("/api", indexRouter);
// app.use(express.static('public'))

// app.set('views', __dirname + '/src/views')
// app.set('view engine', 'jsx')
// app.engine('jsx', require('express-react-views').createEngine())


// app.get('/', (req, res) => {
//     res.render('index', { name: 'Rhapsodist' })
// })


app.listen(env.PORT, () => {
  console.log(env.PORT, 'Welcome Steam Search Service');
});   