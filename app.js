/* learn-express/app.js */
const express = require("express");

const app = express();
const post = process.env.PORT || 8081;

app.get("/", (req, res) => {
  res.sendFile('Hello, Express');
});

app.listen(port, () => {
  console.log(`http://localhost:${port}/ 서버 대기중`);
});
