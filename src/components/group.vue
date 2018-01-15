<template>
  <div class="c-group">
    <header>
      <mt-header fixed title="通讯录">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
    </header>
    <section>
      <mt-index-list>
        <mt-index-section v-for="(list,key) in $store.getters.sortedUserList" :index="key" :key="key">
          
          <mt-cell v-for="(item,index) in list" :title="item" :key="index"></mt-cell>
       
        </mt-index-section>

      </mt-index-list>
    </section>
    <footer>
      <mt-button type="danger" size="large" @click="delete_info()">删除并退出</mt-button>
    </footer>
  </div>
</template>
<script>
import { Header, IndexList, IndexSection } from 'mint-ui';


import CHAT from '../api/chat'

export default {
  data() {
    return {

    }
  },
  components: {
    Header,
    IndexList,
    IndexSection

  },
  methods: {
    delete_info(){
      CHAT.delete();
      this.$router.push({ path: '/' });
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
section{
  padding:15% 0 15%;
}
footer{
  position: fixed;
    bottom: 0;
    width: 80%;
    left: 50%;
    transform:translateX(-50%);
}

</style>
