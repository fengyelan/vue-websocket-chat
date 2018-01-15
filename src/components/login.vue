<template>
  <div class="c-login">
    <header>
     
    </header>
    <section>
      <div class="form">
        <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      </div>
      <div class="btn">
        <mt-button type="primary" size="large" @click="login">登录</mt-button>
      </div>
    </section>
    <footer></footer>
  </div>
</template>
<script>
import { Header } from 'mint-ui';
import { Field } from 'mint-ui';
import { Button } from 'mint-ui';
import { Toast } from 'mint-ui';

import CHAT from '../api/chat'

export default {
  name: 'app',
  data() {
    return {
      username: '',
      password:''
    }
  },
  components: {
    Header,
    Field,
    Button,Toast
  },
  methods:{
    getUid(){
      return new Date().getTime() + '' + Math.floor(Math.random()*899+100);
    },
    login(){
      let that = this;
      if(!that.username.trim()){
        Toast('用户名不能为空');
        return;
      }
      if(!that.password.trim()){
        Toast('密码不能为空');
        return;
      }
      if (localStorage) {
        localStorage.setItem('username',that.username.trim());
        localStorage.setItem('password',that.password.trim());
        localStorage.setItem('uuid',this.getUid());
        CHAT.init();
        that.$router.push({ path: 'chat'})

      }
      
    }
  },
  mounted(){
    if (localStorage) {
        let username = localStorage.getItem('username'),
        password = localStorage.getItem('password'),
        uuid = localStorage.getItem('uuid');
        
       
        if(username){

          this.$router.push({ path: 'chat'})
        }

      }
      
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
section {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  transform: translateY(-50%);
}

.btn {
  margin-top: 10%;
}

</style>
