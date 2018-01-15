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

// router.beforeEach((to, from, next) => {
// 	// if(to.path==="/"){
// 	// 	return;
// 	// }
// 	// next();
//     //if(to.path!="/"){
//     	console.log(to,from);
// 	  	if (localStorage) {
// 	        let username = localStorage.getItem('username');
// 	        let password = localStorage.getItem('password');
	        
// 	        // if(!(username && password)){
// 	        //   router.push({ path: 'chat', query: { username: username }})
// 	        // }

// 	    }
//     //}
// })

export default router;
