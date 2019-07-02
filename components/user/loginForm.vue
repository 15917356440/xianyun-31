<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="ruleForm">
    <!-- 用户名 -->
    <el-form-item prop="username">
      <el-input placeholder="用户名/手机" v-model="ruleForm.username"></el-input>
    </el-form-item>

    <a>忘记密码？</a>

    <!-- 密码 -->
    <el-form-item prop="password">
      <el-input type="password" placeholder="密码" v-model="ruleForm.password"></el-input>
    </el-form-item>

    <!-- 登录按钮 -->
    <el-button type="primary" class="submit" @click="submitForm()">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      // 表单验证规则 必须加prop才会生效
      rules: {
        username: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },

  methods: {
    submitForm() {
      //发送请求前先验证表单数据
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          //登录接口
          /* this.$axios({
            url: "/accounts/login",
            method: "POST",
            data: this.ruleForm
          }).then(res => {
            // console.log(res.data);
            this.$store.commit("user/setUserInfo", res.data);

            this.$message.success("1s后跳转至首页...")

            setTimeout(()=>{
              this.$router.push("/")
            },1000)

          }); */

          // 优化
          this.$store.dispatch("user/login",this.ruleForm).then(v=>{
            this.$message.success("1s后跳转至首页...")

            setTimeout(()=>{
              this.$router.push("/")
            },1000)
          })
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.ruleForm {
  margin: 20px;
  .submit {
    width: 100%;
  }
}
</style>
