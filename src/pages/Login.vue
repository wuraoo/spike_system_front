<template>
  <div class="login-box">
    <el-form
      status-icon
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item  prop="nickname" label-width="auto">
        <el-input
          placeholder="请输入用户名"
          type="text"
          v-model="user.nickname"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item  prop="password" label-width="auto">
        <el-input
          placeholder="请输入密码"
          type="password"
          v-model="user.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label-width="auto">
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Login",
  data() {
    return {
      user: {
        nickname: "",
        password: "",
      },
    };
  },
  methods: {
      submitForm(){
          if(this.user.nickname === ""){
              this.$message('用户名不能为空');
          }
          if(this.user.password === ""){
              this.$message('密码不能为空')
          }
          let data = {"nickname": this.user.nickname, password: this.user.password}
          // 发送ajax请求
          axios.post('http://localhost:8001/spike_system/user/login',data).then(
                res =>{
                    console.log(res.data)
                },
                error =>{
                    console.log(error.message)
                }
            )
      }
  },
};
</script>

<style>
.login-box {
  position: absolute;
  top: 30%;
  left: 30%;
  height: 200px;
  width: 500px;
  background-color: white;
  text-align: center;
}
</style>