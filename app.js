const express = require('express');
const app = express();
const Http = require('http');
const http = Http.createServer(app);
const routes = require('./routes');
const bodyParser = require("body-parser")

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.js');

const cors = require('cors');

const port = process.env.EXPRESS_PORT;
const cookieParser = require('cookie-parser');

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/public', express.static('public'));
app.use('/api', /**upload.array('many'),**/ routes);

app.get('/', (req, res) => {
  res.send('hello!');
});
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

http.listen(port, () => {
  console.log(`${port}로 MINI 서버가 열렸습니당`);
});

module.exports = http;
