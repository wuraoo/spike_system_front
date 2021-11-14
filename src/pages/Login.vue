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
        <el-button type="danger" @click="cancelForm">关闭</el-button>
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
          else if(this.user.password === ""){
              this.$message('密码不能为空')
          }else{
                let data = {"nickname": this.user.nickname, password: this.user.password}
                // 携带cookie
                axios.defaults.withCredentials=true;
                // 发送ajax请求
                axios.post('http://localhost:8001/spike_system/user/login',data).then(
                    res =>{
                        console.log(res.data)
                        // 根据返回的状态码判断是否成功：20000表示成功
                        if(res.data.code == 20000){
                            this.$message('登录成功')
                            // 成功之后触发事件，将右上角显示用户名称
                            this.$bus.$emit("showUserName",res.data.data.user.nickname)
                            // 查看cookie
                            // console.log(document.cookie.match("token"))

                            // 成功后体跳转页面
                            this.$router.push('/show')
                        }else{
                            this.$message('用户名或密码错误')
                        }
                        
                    },
                    error =>{
                        console.log(error.message)
                        this.$message('请求失败')
                }
            )
          }
      },
      cancelForm(){
          this.$router.go(-1)
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