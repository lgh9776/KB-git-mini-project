const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// 정적 파일을 제공하기 위해 express의 static 미들웨어를 사용
app.use(express.static(path.join(__dirname)));

// 루트 경로에 대한 요청이 들어오면 map1.html 파일을 응답으로 보냄
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'map2.html'));
});

// 서버를 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${8080}에서 실행`);
});