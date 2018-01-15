import io from 'socket.io-client';

import store from '../vuex/store.js'

import { getInitialLetter} from '../assets/common/pinyinTransform.js'

const CHAT = {
  username: '',
  uuid: '',

  socket: null,
  init: () => {
    this.username = localStorage.getItem('username'),
    this.uuid = localStorage.getItem('uuid');

    this.socket = io.connect('http://10.235.155.250:8888');

    if (this.uuid && this.username) {
  

      //通知服务器有用户登录进来了
      this.socket.emit('login', {
        uuid: this.uuid,
        username: this.username,
        initial: getInitialLetter(this.username)
      });
    }

    //收到服务器的用户登录广播信息
    this.socket.on('login', function(data) {

      console.log("from server:");
      console.log(data);

      store.dispatch('changeAllUserInfo', data.onLineUsers);
      store.dispatch('changeUserCnt', data.onLineCnt);
      store.dispatch('changeMsgInfo', data.allMsgInfo);

    });



  },

  sendMsg: (msg) => {
    this.username = localStorage.getItem('username'),
      this.uuid = localStorage.getItem('uuid');

    this.socket = io.connect('http://10.235.155.250:8888');

    //通知服务器有用户发送消息了
    this.socket.emit('sendMsg', {
      uuid: this.uuid,
      username: this.username,
      msg: msg
    });

    //收到服务器广播的用户发送信息
    this.socket.on('sendMsg', function(data) {

      console.log("from server:");
      console.log(data);

      store.dispatch('changeAllUserInfo', data.onLineUsers);
      store.dispatch('changeUserCnt', data.onLineCnt);
      store.dispatch('changeMsgInfo', data.allMsgInfo);

    });
  },

  delete: () => {
    this.username = localStorage.getItem('username');
    this.uuid = localStorage.getItem('uuid');

    //通知服务器有用户退出登录了
    this.socket.emit('delete', {
      uuid: this.uuid,
      username: this.username,

    });

    //收到服务器广播的用户退出信息
    this.socket.on('delete', function(data) {

      console.log("from server:");
      console.log(data);

      store.dispatch('changeAllUserInfo', data.onLineUsers);
      store.dispatch('changeUserCnt', data.onLineCnt);
      store.dispatch('changeMsgInfo', data.allMsgInfo);

    });

    localStorage.removeItem('username');
    localStorage.removeItem('uuid');
  }

}

export default CHAT;
