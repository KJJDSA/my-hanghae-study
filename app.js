const express = require('express');
const app = express();
const Http = require('http');
const http = Http.createServer(app);
require('dotenv').config();
const port = process.env.EXPRESS_PORT;
const routes = require('./routes');

const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser');

const cors = require('cors');

// const swaggerUi = require('swagger-ui-express');
// const swaggerFile = require('./swagger-output.js');

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use('/api', routes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());

// app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/', (req, res) => {
  res.send('hello!');
});

http.listen(port, () => {
  console.log(`${port}포트로 서버가 열렸습니당`);
});

module.exports = http;