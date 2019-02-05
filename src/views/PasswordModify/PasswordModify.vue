<template>
  <div class="password-modify">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>密码修改</span>
      </div>
      <div class="text item">
        <el-form
          size="small"
          :model="passwordModifyForm"
          status-icon
          :rules="rules"
          ref="passwordModifyForm"
          label-width="100px"
          class="demo-ruleForm"
          hide-required-asterisk
        >
          <!-- 原密码 -->
          <el-form-item label="原密码" prop="oldpwd">
            <el-input type="password" v-model="passwordModifyForm.oldpwd" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 新密码 -->
          <el-form-item label="新密码" prop="nwePwd">
            <el-input type="password" v-model="passwordModifyForm.nwePwd" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 确认新密码 -->
          <el-form-item label="确认新密码" prop="checknwePwd">
            <el-input type="password" v-model="passwordModifyForm.checknwePwd" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 登录按钮&重置按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('passwordModifyForm')">修改</el-button>
            <el-button @click="resetForm('passwordModifyForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
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
    //验证旧密码是否正确
    const checkOldPwd = (rule, value, callback) => {
        callback();
    };
    //验证密码函数
    const pass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!checkSpecificKey(value)) {
        callback(new Error("密码不能包含特殊字符"));
      } else {
        if (this.passwordModifyForm.checkPwd !== "") {
          this.$refs.passwordModifyForm.validateField("checkPwd");
        }
        callback();
      }
    };
    //确认密码验证函数
    const checkPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.passwordModifyForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 添加账号表单数据
      passwordModifyForm: {
        oldpwd: "",
        nwePwd: "",
        checknwePwd: ""
      },
      rules: {
        oldpwd: [
          { required: true, validator: checkOldPwd, trigger: "blur"}
        ],
        nwePwd: [
          { required: true, validator: pass, trigger: "blur" },
          { min: 6, max: 16, message: "密码长度在 6 - 16 位", trigger: "blur" }
        ],
        checknwePwd: [{ required: true, validator: checkPwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("密码修改成功!");
          
          // 直接跳转到登录页面
          this.$router.push("/login");
        } else {
          alert("密码修改失败!");
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
.password-modify {
  .el-card {
    .el-card__header {
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
    .el-card__body {
      .el-form {
        width: 300px;
      }
    }
  }
}
</style>