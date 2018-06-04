// var app = require('express')();
const express = require('express');
const app = express();

// const http = require('http').Server(app);
const http = require('http');
const server = http.Server(app);

// const io = require('socket.io')(server);
const socketio = require('socket.io');
const io = socketio.listen(server);

//環境変数 リモートサーバのポート番号を保持しています。
const PORT = process.env.PORT || 3000;


app.get(`/`, (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//socket処理を記載する ソケットを通してサーバとクライアントの連携部分を受け持つ クライアントからのアクションを受付ける窓口になる部分
//socket はクライアントからアクションがあった時にサーバが受け取るもの  これでクライアントを特定し、個別にメッセージを送ったりする事が可能
//connectionは接続時
io.on('connection', (socket) => {
  console.log('a user connected');

  //socket処理　個別の要件を受け付けるイベントハンドラ　
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    //emit　→ 自分を含む全員にメッセージを送信する
    io.emit('chat message', msg);
  });

});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});




