<template>
  <div class="my_head">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
        <router-link :to="{
          name: 'show'
        }"
        class="login-a">
        主页
      </router-link>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">推荐商品</template>
        <el-menu-item index="2-1">推荐1</el-menu-item>
        <el-menu-item index="2-2">推荐2</el-menu-item>
        <el-menu-item index="2-3">推荐3</el-menu-item>
      </el-submenu>
            <el-menu-item index="1">
        <router-link :to="{
          name: 'spike'
        }"
        class="login-a">
        秒杀商品
      </router-link>
      </el-menu-item>
      <el-menu-item index="4">订单管理</el-menu-item>
      <el-menu-item index="5"><span  class="head-title">秒杀系统测试平台</span></el-menu-item>
        <div class="login-btn">
          <router-link 
          :to="{
            name:'login',
          }" 
          class="el-icon-s-custom login-a">
          {{name}}
          </router-link>
        </div>
    </el-menu>
  </div>
</template>

<script>
    export default {
    name: "Head",
    data() {
        return {
            activeIndex2: "1",
            name: '登录'
        };
    },
    methods: {

    },
    mounted() {
      // 为登录绑定事件（登陆成功之后调用，显示用户名）
      this.$bus.$on('showUserName',(username)=>{
        this.name = username
      })
    },
    };
</script>

<style>
.my_head {
    height: 40px;
  line-height: 40px;
  text-align: center;
}
.login-btn{
    font-size: 17px;
    position: absolute;
    top: 10px;
    right: 30px;
}
.login-a{
    background-color: #545c64;
    text-decoration:none;
}
.head-title{
  margin-left: 400px;
  font-size: 40px;
}
</style>