<template>
  <div class="c-chat">
    <header>
      <mt-header fixed :title="'chat room('+$store.state.allUserCnt+')'"></mt-header>
      <router-link to="/group" tag="div" class="group">
        <img src="../assets/imgs/group.png">
      </router-link>
    </header>
    <section>
      <ul>
        <li v-for="item in $store.state.allMsgInfo">
          <mt-cell :value="item.username+':'+item.msg"></mt-cell>
        </li>
      </ul>
    </section>
    <footer>
      <div class="input-area">
        <mt-field placeholder="请输入信息" v-model="info"></mt-field>
      </div>
      <div class="btn">
        <mt-button size="small" type="primary" @click="send">send</mt-button>
      </div>
    </footer>
  </div>
</template>
<script>
import { Header } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';
import { Cell } from 'mint-ui';
import { Button } from 'mint-ui';
import { Field } from 'mint-ui';
import { Toast } from 'mint-ui';

import CHAT from '../api/chat'


export default {
  data() {
    return {
      info: ""
    }
  },
  components: {
    Header,
    InfiniteScroll,
    Cell,
    Field,
    Toast
  },
  methods: {
    send() {
      let uuid = localStorage.getItem('uuid'),
        username = localStorage.getItem('username'),
        msg = this.info;
      if(!uuid){
        this.$router.push({ path: '/' });
        return;
        
      }
      if (!msg.trim()) {
        Toast('输入信息为空');
        return;
      }

      CHAT.sendMsg(msg);
      this.info="";
    }
  },
  mounted() {
    if (!localStorage.getItem('username')) {
      this.$router.push({ path: '/' })
    }

    CHAT.init();
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.c-chat{
  position:relative;
}
header{

  .group{
    position: fixed;
    top: 1%;
    right: 5%;
    z-index: 2;
    width: 30px;
    height: 30px;
    img{
      width:100%;
    }
  }
}
section{
  padding:15% 0;
}
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0,0,0,0.1);

 

  .input-area {
    display: inline-block;
    vertical-align: middle;
    width: 80%;
  }
  .btn {
    display: inline-block;
    vertical-align: middle;
  }
}

</style>
