// 该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
// 引入組件
import Login from "../pages/Login.vue"
import Show from '../pages/Show.vue'
import Error_Page from '../pages/Error.vue'

// 创建一个路由器
const router = new VueRouter({
    // 以及路由
    routes: [
        {
            // 路由到登录界面（点击登录按钮，在Main中显示）
            name: 'login',
            path: '/login',
            component: Login,
            meta: {title: '登录'}
        },
        {
            name: 'show',
            path: '/show',
            component: Show
        },
        {
            name: 'error-page',
            path: '/error',
            component: Error_Page
        }
    ]
})

export default router