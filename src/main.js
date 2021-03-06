// 引入vue
import Vue from 'vue'
import App from './App.vue'
// 引入vue的路由插件
import VueRouter from 'vue-router'
// 引入路由器
import router from './router'
// 引入elementui插件
import ElementUI from 'element-ui';
// 引入完整样式
import 'element-ui/lib/theme-chalk/index.css';
// 引入vueCookie
import VueCookies from "vue-cookies";


// 应用element插件
Vue.use(ElementUI)
// 应用路由插件
Vue.use(VueRouter)
// 应用vue插件
Vue.use(VueCookies);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router,
  beforeCreate() {
    // 绑定事件总线
    Vue.prototype.$bus = this
},
}).$mount('#app')
