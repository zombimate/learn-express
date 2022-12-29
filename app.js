/* learn-express/app.js */
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
const port = process.env.PORT || 8888;

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));

/* 전처리 미들웨어 */
app.use((req, res, next) => {
  console.log('모든 요청에 다 실행됩니다.')
  next();
});
/* 라우트 미들웨어 */
app.get("/", (req, res, next) => {
  res.sendFile('GET / 요청에서만 실행됩니다');
  next();
}, (req, res) => {
  throw new Error('에러는 에러처리 미들웨어로 갑니다.')
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.messsage);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}/ 서버 대기중`);
});
