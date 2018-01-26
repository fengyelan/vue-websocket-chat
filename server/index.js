//获取主机ip
const os = require('os');
const path = require('path');

function getLocalIps(flagIpv6) {
  var ifaces = os.networkInterfaces();
  var ips = [];
  var func = function(details) {
    if (!flagIpv6 && details.family === 'IPv6') {
      return;
    }
    if (details.address == '127.0.0.1') {
      return;
    }
    ips.push(details.address);
  };
  for (var dev in ifaces) {
    ifaces[dev].forEach(func);
  }
  return ips;
};



var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(8888);


//在线用户
let onLineUsers = {}, //所有在线的用户 
  onLineCnt = 0, //所有在线用户数量
  allMsgInfo = []; //所有的消息，包括用户进入，发消息，用户退出

io.on('connection', function(socket) {

  //监听到客户端用户登录信息
  socket.on('login', function(data) 

    if (!data.uuid) {
      return;
    }

    if (!onLineUsers[data.uuid]) {
      onLineUsers[data.uuid] = data;
      allMsgInfo.unshift({
        username: data.username,
        msg: "进入聊天室"
      });
      onLineCnt++;
    }

    //向所有客户端广播用户加入
    io.emit('login', { allMsgInfo: allMsgInfo, onLineUsers: onLineUsers, onLineCnt: onLineCnt });

  });

  //监听到客户端发送信息
  socket.on('sendMsg', function(data) {

    allMsgInfo.unshift({
      username: data.username,
      msg: data.msg
    });

    //向所有客户端广播用户发送消息
    io.emit('sendMsg', { allMsgInfo: allMsgInfo });

  });

  //监听客户端用户退出登录
  socket.on('delete', function(data) {


    allMsgInfo.unshift({
      username: data.username,
      msg: "退出聊天室"
    });

    onLineCnt--;

    onLineUsers[data.uuid] = undefined;

    //向所有客户端广播用户退出登录
    io.emit('delete', { allMsgInfo: allMsgInfo, onLineUsers: onLineUsers, onLineCnt: onLineCnt});
    

  })


});
