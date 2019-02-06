<template>
  <div class="member-add">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加会员</span>
      </div>
      <div class="text item">
        <el-form
          size="small"
          :model="memberAddForm"
          status-icon
          :rules="rules"
          ref="memberAddForm"
          label-width="100px"
          class="demo-ruleForm"
          hide-required-asterisk
        >
          <el-form-item label="真实名字" prop="name">
            <el-input type="text" v-model="memberAddForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="会员卡卡号" prop="cardNum">
            <el-input type="text" v-model="memberAddForm.cardNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户组" prop="userGroup">
            <el-select v-model="memberAddForm.userGroup" placeholder="请选择用户组">
              <el-option label="普通会员" value="普通会员"></el-option>
              <el-option label="铜牌会员" value="铜牌会员"></el-option>
              <el-option label="金牌会员" value="金牌会员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="身份证号" prop="idNum">
            <el-input type="text" v-model="memberAddForm.idNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户状态" prop="status">
            <el-switch v-model="memberAddForm.status"></el-switch>
          </el-form-item>
          <el-form-item label="手机号码" prop="phoneNum">
            <el-input type="text" v-model="memberAddForm.phoneNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="座机号码" prop="telNum">
            <el-input type="text" v-model="memberAddForm.telNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱地址" prop="email">
            <el-input type="text" v-model="memberAddForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地区选择" prop="areaSelection">
            <el-select v-model="memberAddForm.province" placeholder="请选择省份">
              <el-option label="四川" value="四川"></el-option>
              <el-option label="云南省" value="云南省"></el-option>
            </el-select>
            <el-select v-model="memberAddForm.city" placeholder="请选择城市">
              <el-option label="成都市" value="成都市"></el-option>
              <el-option label="达州市" value="达州市"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input type="text" v-model="memberAddForm.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮政编码" prop="postalCode">
            <el-input type="text" v-model="memberAddForm.postalCode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('memberAddForm')">添加</el-button>
            <el-button @click="resetForm('memberAddForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      memberAddForm: {
        name: "",
        cardNum: "",
        userGroup: "",
        idNum: "",
        status: false,
        phoneNum: "",
        telNum: "",
        email: "",
        province: "",
        city: "",
        address: "",
        postalCode: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        cardNum: [
          { required: true, message: "请输入会员卡卡号", trigger: "blur" }
        ],
        userGroup: [
          { required: true, message: "请选择用户组", trigger: "change" }
        ],
        idNum: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
        status: [
          { required: true, message: "请选择用户状态", trigger: "change" }
        ],
        phoneNum: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        telNum: [
          { required: true, message: "请输入座机号码", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        areaSelection: [
          { required: true, message: "请选择地区", trigger: "blur" }
        ],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        postalCode: [
          { required: true, message: "请输入邮政编码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("添加会员成功!");
          // 直接跳转到会员管理
          this.$router.push("/membermanage");
        } else {
          alert("添加会员失败!");
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
.member-add {
  .el-card {
    .el-card__header {
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
    .el-card__body {
      .el-form {
        .el-form-item {
          .el-form-item__content {
            .el-input {
              width: 250px;
            }
            .el-select {
                margin-right: 6px;
              .el-input {
                width: 124px;
              }
            }
          }
        }
      }
    }
  }
}
</style>