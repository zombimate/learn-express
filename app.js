/* learn-express/app.js */
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();
const password = process.env.PASSWORD || process.env.COOKIE_SECRET;
const port = process.env.PORT || 8888;

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  }));
/* 로그인 미들웨어 */
app.post("/login", (req, res) => {
  let { username, password } = req.body;
  /* 로그인 성공시 */
  if (password === secret) {
    req.session.user = { username };
    res.redirect('/');
  } else {
    res.redirect("/login.html");
  }
});
/* 전처리 미들웨어 */
app.use((req, res, next) => {
  console.log("모든 요청에 다 실행됩니다.");
  if (req.session.user === undefined) {
    res.redirect("login.html");
  } else {
    next();
  }
});
/* 라우트 미들웨어 */
app.get(
  "/",
  (req, res, next) => {
    if (req.session.user) {
      res.sendFile("GET / 요청에서만 실행됩니다");
    } else {
      next();
    }
  },
  (req, res) => {
    throw new Error("에러는 에러처리 미들웨어로 갑니다.");
  }
);
/* 로그인 미들웨어 */
app.post("/login", (req, res) => {
  console(req.body);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.messsage);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}/ 서버 대기중`);
});
