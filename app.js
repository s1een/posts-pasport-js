require("./auth/auth");
require("dotenv").config();
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const cors = require("cors");
const connection = require("./db");
const cookieParser = require("cookie-parser");
const expressHbs = require("express-handlebars");
const router = require("./router/index");
const postRouter = require("./router/postRouter");
const authRouter = require("./router/authRouter");
const app = express();
const PORT = 5000;

// middleware
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

// routers
app.use("/api", router);
app.use("/posts", postRouter);
app.use("/auth", authRouter);
app.get("/", (req, res) => {
  res.render("home.hbs");
});
app.get("*", (req, res) => {
  res.status(404).render("error.hbs");
});

app.listen(PORT, () => {
  try {
    connection.connect((error) => {
      if (error) {
        return console.log("Error connecting to database!", error);
      } else {
        return console.log("Connected to DB!");
      }
    });
    console.log(`Server Started on port: ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
