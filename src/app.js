const express = require("express");
const app = express();
const routes = require("./routes");
const ejs = require("ejs");
const path = require("path");
const { error, error404 } = require("./middlewares/error/error");
require("events").EventEmitter.prototype._maxListeners = 15;
require("dotenv").config();
const env = process.env;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);

// app.use(express.static(__dirname + "public"));
app.use("/images", express.static(__dirname + "/images"));

app.get("/", function (req, res) {
  res.render("index");
});
app.use("/", routes);

app.use(error404);
app.use(error);

app.listen(Number(env.PORT), () => {
  console.log(Number(env.PORT), "Welcome Steam Search Service");
});
// app.listen(Number(env.PORT) + 1, () => {
//   console.log(Number(env.PORT) + 1, "Welcome Steam Search Service");
// });
// app.listen(Number(env.PORT) + 2, () => {
//   console.log(Number(env.PORT) + 2, "Welcome Steam Search Service");
// });
