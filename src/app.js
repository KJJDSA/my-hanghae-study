const express = require("express");
const app = express();
const routes = require("./routes");
const ejs = require("ejs");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);

app.use(express.static(__dirname + "public"));

app.get("/", function (req, res) {
  res.render("index");
});

app.use("/", routes);

app.listen(5000, () => {
  console.log(5000, "Welcome Steam Search Service");
});
