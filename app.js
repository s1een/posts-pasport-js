const express = require("express");
const router = require("./router/index");
const postRouter = require("./router/postRouter");
const authRouter = require("./router/authRouter");

const connection = require("./db");
const path = require("path");
const hbs = require("hbs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressHbs = require("express-handlebars");
require("./auth/auth");
const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.engine(
  "hbs",
  expressHbs.engine({
    layoutsDir: "views/layouts",
    defaultLayout: "layout",
    extname: "hbs",
    helpers: {
      list: function (array) {
        let result = "";
        for (let i = 0; i < array.length; i++) {
          result += `<li><a href='/posts/${array[i].id}'>${array[i].title}</a></li>`;
        }
        return new hbs.SafeString(`<ul>${result}</ul>`);
      },
    },
  })
);

app.use("/api", router);
app.use("/posts", postRouter);
app.use("/auth", authRouter);
app.get("/", (req, res) => {
  res.render("home.hbs");
});

app.listen(PORT, () => {
  connection.connect((error) => {
    if (error) {
      return console.log("Ошибка подключения к БД!", error);
    } else {
      return console.log("Подлючение успешно!");
    }
  });
  console.log(`Server Started on port: ${PORT}`);
});
