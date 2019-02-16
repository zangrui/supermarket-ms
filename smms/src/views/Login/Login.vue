<template>
  <div class="login">
    <!-- 登录表单容器 -->
    <div class="login-wrapper">
      <!-- 登录标题 -->
      <h1 class="title">
        <i class="el-icon-menu"></i>
        华联超市后台管理系统
      </h1>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="70px"
        class="loginForm"
        hide-required-asterisk
      >
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="loginForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 粒子效果组件 -->
    <vue-particles
      color="#fff"
      :particleOpacity="0.8"
      :particlesNumber="120"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.5"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
    ></vue-particles>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    // 包含特殊字符的函数
    const checkSpecificKey = str => {
      var specialKey =
        "[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";
      for (var i = 0; i < str.length; i++) {
        if (specialKey.indexOf(str.substr(i, 1)) != -1) {
          return false;
        }
      }
      return true;
    };
    //验证账号函数
    const username = (rule, value, callback) => {
      if (!checkSpecificKey(value)) {
        callback(new Error("用户名不能包含特殊字符"));
      }
      callback();
    };
    //验证密码函数
    const pass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!checkSpecificKey(value)) {
        callback(new Error("密码不能包含特殊字符"));
      } else {
        if (this.loginForm.checkPass !== "") {
          this.$refs.loginForm.validateField("checkPass");
        }
        callback();
      }
    };
    //确认密码验证函数
    const checkPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.loginForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        checkPass: ""
      },
      rules: {
        username: [
          { validator: username, trigger: "blur" },
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 6, message: "账号长度在 3 - 6 位", trigger: "blur" }
        ],
        password: [
          { required: true, validator: pass, trigger: "blur" },
          { min: 3, max: 6, message: "密码长度在 3 - 6 位", trigger: "blur" }
        ],
        checkPass: [{ required: true, validator: checkPwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("登录成功!");
          // let params = {
          //   username: this.loginForm.username,
          //   password: this.loginForm.password
          // };
          // 直接跳转到后端主页
          this.$router.push("/");
        } else {
          alert("登录失败!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less">
.login {
  height: 100%;
  background: #2d3a4b;
  background: url(../../assets/bg.jpg) no-repeat;
  .login-wrapper {
    width: 400px;
    height: 290px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #ffffff;
    // 垂直水平居中
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    padding: 20px 20px 16px;
    .title {
      margin: 0 0 20px;
      font-size: 20px;
      height: 30px;
      line-height: 30px;
    }
    .el-form {
      .el-form-item {
        .el-form-item__label {
          color: #ffffff;
        }
      }
    }
  }
}
</style>
