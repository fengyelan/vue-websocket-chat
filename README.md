# vue-websocket-chat

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



#####本项目技术######
vue+websocket+mint-ui

##########待解决的问题########
把汉字转化为拼音的问题-----解决


如何启动服务器端
在server 目录下面：
使用pm2启动
➜  server pm2 start index.js

pm2的几个常用命令
停止应用:
pm2 stop index.js
重启应用:
pm2 restart index.js
查看运行状况
pm2 list
查看日志
pm2 log

如何启动前端：
在根目录下面
npm run start



