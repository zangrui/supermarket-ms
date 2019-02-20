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
          <el-form-item label="会员等级" prop="grade">
            <el-select v-model="memberAddForm.grade" placeholder="选择会员等级">
              <el-option label="普通会员" value="普通会员"></el-option>
              <el-option label="铜牌会员" value="铜牌会员"></el-option>
              <el-option label="金牌会员" value="金牌会员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员积分" prop="integral">
            <el-input type="text" v-model="memberAddForm.integral" autocomplete="off"></el-input>
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
            <el-cascader
              :options="options"
              expand-trigger="hover"
              separator="-"
              v-model="memberAddForm.areaSelection"
              placeholder="请选择城市"
            ></el-cascader>
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
        grade: "",
        integral: "",
        idNum: "",
        status: true,
        phoneNum: "",
        telNum: "",
        email: "",
        areaSelection: [],
        address: "",
        postalCode: ""
      },
      options: [
        {
          value: "四川省",
          label: "四川省",
          children: [
            {
              value: "成都市",
              label: "成都市"
            },
            {
              value: "达州市",
              label: "达州市"
            }
          ]
        },
        {
          value: "重庆市",
          label: "重庆市"
        }
      ],
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        cardNum: [
          { required: true, message: "请输入会员卡卡号", trigger: "blur" }
        ],
        grade: [
          { required: true, message: "请选择会员等级", trigger: "change" }
        ],
        integral: [
          { required: true, message: "请输入会员积分", trigger: "blur" }
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
          { required: true, message: "请选择地区", trigger: "change" }
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
          //收集会员数据
          let params = {
            name: this.memberAddForm.name,
            cardNum: this.memberAddForm.cardNum,
            grade: this.memberAddForm.grade,
            integral: this.memberAddForm.integral,
            idNum: this.memberAddForm.idNum,
            status: this.memberAddForm.status,
            phoneNum: this.memberAddForm.phoneNum,
            telNum: this.memberAddForm.telNum,
            email: this.memberAddForm.email,
            areaSelection: this.memberAddForm.areaSelection.join("-"),
            address: this.memberAddForm.address,
            postalCode: this.memberAddForm.postalCode
          };
          //使用axios发送数据给后端
          this.req
            .post("/member/memberadd", params)
            .then(response => {
              //接收响应数据
              let { error_code, reason } = response.data;
              if (!error_code) {
                this.$message({
                  //弹出成功提示
                  showClose: true,
                  type: "success",
                  message: reason
                });
                //跳转到会员管理列表
                this.$router.push("/membermanage");
              } else {
                //弹出失败提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message.error("添加会员失败!");
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
            .el-select,
            .el-cascader {
              .el-input {
                width: 160px;
              }
            }
          }
        }
      }
    }
  }
}
</style>