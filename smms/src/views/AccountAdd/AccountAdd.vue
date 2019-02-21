<template>
  <div class="account-add">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加账号</span>
      </div>
      <div class="text item">
        <!-- 添加账号表单 -->
        <el-form
          size="small"
          :model="accountAddForm"
          status-icon
          :rules="rules"
          ref="accountAddForm"
          label-width="100px"
          class="demo-ruleForm"
          hide-required-asterisk
        >
          <!-- 账号 -->
          <el-form-item label="账　　号" prop="username">
            <el-input type="text" v-model="accountAddForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密　　码" prop="password">
            <el-input type="password" v-model="accountAddForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item label="确认密码" prop="checkPwd">
            <el-input type="password" v-model="accountAddForm.checkPwd" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 选中用户组 -->
          <el-form-item label="用户组" prop="userGroup">
            <el-select v-model="accountAddForm.userGroup" placeholder="请选择用户组">
              <el-option label="普通用户" value="普通用户"></el-option>
              <el-option label="高级管理员" value="高级管理员"></el-option>
            </el-select>
          </el-form-item>
          <!-- 登录按钮&重置按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('accountAddForm')">添加</el-button>
            <el-button @click="resetForm('accountAddForm')">重置</el-button>
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
    //验证账号函数
    const username = (rule, value, callback) => {
      if (!checkSpecificKey(value)) {
        callback(new Error("用户名不能包含特殊字符"));
      } else {
        //获取账号
        let username = value;
        //发送ajax传入账号
        this.req
          .get("/account/checkaccount", { username })
          .then(response => {
            //接收数据
            let { error_code, reason } = response.data;
            if (error_code) {
              //错误提示
              callback(new Error(reason));
            } else {
              //正确回调
              callback();
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    };
    //验证密码函数
    const pass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!checkSpecificKey(value)) {
        callback(new Error("密码不能包含特殊字符"));
      } else {
        if (this.accountAddForm.checkPwd !== "") {
          this.$refs.accountAddForm.validateField("checkPwd");
        }
        callback();
      }
    };
    //确认密码验证函数
    const checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.accountAddForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 添加账号表单数据
      accountAddForm: {
        username: "",
        password: "",
        checkPwd: "",
        userGroup: ""
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
        checkPwd: [{ required: true, validator: checkPass, trigger: "blur" }],
        userGroup: [
          { required: true, message: "请选择用户组", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //收集账号数据
          let params = {
            username: this.accountAddForm.username,
            password: this.accountAddForm.password,
            usergroup: this.accountAddForm.userGroup
          };
          //使用axios发送数据给后端
          this.req
            .post("/account/accountadd", params)
            .then(response => {
              //接收响应数据
              let { error_code, reason } = response.data;
              if (error_code === 0) {
                this.$message({
                  //弹出成功提示
                  showClose: true,
                  type: "success",
                  message: reason
                });
                //跳转到账号管理列表
                this.$router.push("/accountmanage");
              } else if (error_code) {
                //弹出失败提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message.error("添加账号失败!");
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
.account-add {
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