<template>
  <div class="my_aside">
    <el-row class="tac">
      <el-col :span="12" style="width:100%;">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-monitor"></i>
              <span>数码电子</span>
            </template>
            <el-menu-item-group>
              <template slot="title">手机</template>
              <el-menu-item index="1-1">小米</el-menu-item>
              <el-menu-item index="1-2">Apple</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="电脑">
              <el-menu-item index="1-3">华硕</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">无人机</template>
              <el-menu-item index="1-4-1">大疆</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">家居日用</span>
          </el-menu-item>
          <el-menu-item index="3" >
            <i class="el-icon-coordinate"></i>
            <span slot="title">生活娱乐</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-present"></i>
            <span slot="title">服装出行</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {};
  },
      methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
};
</script>

<style>
.my_aside {
  height: 100%;
  width: 15%;
  background-color: #545c64;
}
</style>