const express = require('express');
const Http = require('http');
const routes = require('./routes');

var cors = require('cors');

// const swaggerUi = require('swagger-ui-express');
// const swaggerFile = require('./swagger-output.json');

require('dotenv').config();

const cookieParser = require('cookie-parser');
const app = express();
const http = Http.createServer(app);
const port = process.env.EXPRESS_PORT || 6060;
// const fs = require('fs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/api', routes);
app.use(cors());

// try {
//   fs.readdirSync('uploads');
// } catch (error) {
//   console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
//   fs.mkdirSync('uploads');
// }

app.get('/', (req, res) => {
  res.send('hello!');
});
// app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

http.listen(port, () => {
  console.log(`${port}로 MINI 서버가 열렸습니당`);
});

module.exports = http;
