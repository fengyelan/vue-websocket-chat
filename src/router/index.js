import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import chat from '@/components/chat'
import group from '@/components/group'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },{
      path: '/chat',
      name: 'chat',
      component: chat
    },
    {
      path:'/group',
      component:group
    }
  ]
})



export default router;
