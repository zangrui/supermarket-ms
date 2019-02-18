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
          <el-form-item label="原密码" prop="oldPwd">
            <el-input type="password" v-model="passwordModifyForm.oldPwd" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 新密码 -->
          <el-form-item label="新密码" prop="nwePwd">
            <el-input type="password" v-model="passwordModifyForm.newPwd" autocomplete="off"></el-input>
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
      //获取当前登录账号
      let username = window.localStorage.getItem("username");
      //发送ajax传入用户输入旧密码和用户名
      this.req
        .get("/account/checkOldPwd", { oldPwd: value, username: username })
        .then(response => {
          //接收数据
          let { error_code, reason } = response.data;
          if (error_code) {
            //错误提示
            callback(new Error(reason));
          } else {
            callback();
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
    //验证新密码函数
    const pass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (!checkSpecificKey(value)) {
        callback(new Error("密码不能包含特殊字符"));
      } else if (value === this.passwordModifyForm.oldPwd) {
        callback(new Error("新密码不能和旧密码相同"));
      } else {
        if (this.passwordModifyForm.checknwePwd !== "") {
          this.$refs.passwordModifyForm.validateField("checknwePwd");
        }
        callback();
      }
    };
    //确认新密码验证函数
    const checkPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.passwordModifyForm.nwePwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 添加账号表单数据
      passwordModifyForm: {
        oldPwd: "",
        newPwd: "",
        checknwePwd: ""
      },
      rules: {
        oldPwd: [{ required: true, validator: checkOldPwd, trigger: "blur" }],
        nwePwd: [
          { required: true, validator: pass, trigger: "blur" },
          { min: 3, max: 6, message: "密码长度在 3 - 6 位", trigger: "blur" }
        ],
        checknwePwd: [{ required: true, validator: checkPwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //收集参数
          let params = {
            username: window.localStorage.getItem("username"),
            oldPwd: this.passwordModifyForm.oldpwd,
            newPwd: this.passwordModifyForm.newPwd
          };
          //发送ajax
          this.req
            .post("/account/savenewpwd", params)
            .then(response => {
              //接收数据
              let { error_code, reason } = response.data;
              if (!error_code) {
                //清除token
                window.localStorage.removeItem("token");
                //弹出成功的提示
                this.$message({
                  showClose: true,
                  type: "success",
                  message: reason
                });
                // 跳转到登录页面
                this.$router.push("/login");
              } else {
                //弹出失败提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message.error("密码修改失败!");
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