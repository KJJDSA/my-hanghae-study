const express = require('express');
const app = express();
const port = 8080;
const indexRouter = require("./routes");

app.use("/api", indexRouter);

app.listen(port, () => {
  console.log(port, 'Welcome Steam Search Service');
});   