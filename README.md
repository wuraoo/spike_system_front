# 秒杀系统前端开发

该项目主要配合后台的秒杀项目搭建的前端项目，主要为了练习Vue，所以只做功能不做样式。

## 一、项目搭建

### 1.1 创建cli

1. 创建文件夹spike_sys_front

2. 进文件夹，使用cmd输入

   ````shell
   vue create spike_sys_front
   ````

3. 使用vs-code打开该文件夹。

### 1.2 引入基本组件

> 引入路由插件：

1. 在终端中安装vue-router

   ````shell
   npm install vue-router
   ````

2. 创建路由文件

   在src文件夹下创建router文件夹，在里面创建index.js

3. 在main.js中引入相关插件和配置

   `````js
   // 引入vue的路由插件
   import VueRouter from 'vue-router'
   // 引入路由器
   import router from './router'
   // 应用路由插件
   Vue.use(VueRouter)
   `````

> 引入axios插件

1. 在终端中安装axios

   ````shell
   npm install axios
   ````

2. 在需要使用的组件中导入

> 引入Element组件

1. 安装Element-ui

   `````shell
    cnpm install element-ui --save
   `````

2. 导入插件（这里使用全局导入）

   ````js
   // 引入elementui插件
   import ElementUI from 'element-ui';
   // 引入完整样式
   import 'element-ui/lib/theme-chalk/index.css';
   // 应用element插件
   Vue.use(ElementUI)
   ````

### 1.3 创建目录结构(src)

```shell
src
 |___components
 |       |_______Home(整个页面)
 |       |_______Head(头部导航栏)
 |       |_______Aside(侧边栏)
 |       |_______Main(中间主体)
 |      
 |___router
 |      |______index.js
 |
 |___pages(路由组件)
 |     |_______Login(登录组件)
 |     |_______路由组件2
 |
 |___assets（静态资源）
 |
 |___App.vue
 |
 |___main.js
```

## 二、功能实现

### 2.1 登录界面

> 登陆界面设计思想：点击右上角登录按钮，触发路由——在Main界面激活Login组件，显示登录界面；输入信息后将表单数据使用axios提交到后台。