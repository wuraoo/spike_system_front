// 引入vue
import Vue from 'vue'
import App from './App.vue'
// 引入vue的路由插件
import VueRouter from 'vue-router'
// 引入路由器
// import router from './router'
// 引入elementui插件
import ElementUI from 'element-ui';
// 引入完整样式
import 'element-ui/lib/theme-chalk/index.css';

// 应用element插件
Vue.use(ElementUI)
// 应用路由插件
Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // router: router
}).$mount('#app')
