const express = require("express");
const app = express();
const routes = require("./routes");
const ejs = require("ejs");
const path = require("path");
const { error, error404 } = require("./middlewares/error/error");
require("dotenv").config();
const env = process.env;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);

app.use(express.static(__dirname + "public"));
app.use("/images", express.static(__dirname + '/images'));


app.get("/", function (req, res) {
  res.render("index");
});
app.use("/", routes);
// ddddddddddddddd
app.use(error404);
app.use(error);

app.listen(env.PORT, () => {
  console.log(env.PORT, "Welcome Steam Search Service");
});
