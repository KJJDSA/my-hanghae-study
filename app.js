const express = require('express');
const session = require('express-session');
const app = express();
const Http = require('http');
const http = Http.createServer(app);
require('dotenv').config();
const port = process.env.EXPRESS_PORT;
const routes = require('./routes');
const passport = require('passport');
const passportConfig = require('./passport');
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser');


app.use(cookieParser(process.env.COOKIE_NAME));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_NAME,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize())

passportConfig();
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