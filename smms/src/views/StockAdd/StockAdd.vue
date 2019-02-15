<template>
  <div class="stock-add">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加库存</span>
      </div>
      <div class="text item">
        <el-form
          size="small"
          :model="stockAddForm"
          status-icon
          :rules="rules"
          ref="stockAddForm"
          label-width="100px"
          class="demo-ruleForm"
          hide-required-asterisk
        >
          <el-form-item label="商品条形码" prop="barCode">
            <el-input
              type="text"
              v-model="stockAddForm.barCode"
              autocomplete="off"
              style="width: 250px"
            ></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="num">
            <el-input type="text" v-model="stockAddForm.num" autocomplete="off"></el-input>
            <div style="height:16px;line-height:16px;font-size:12px;color:#aaa">计重商品单位为千克</div>
          </el-form-item>
          <el-form-item label="进价" prop="costPrice">
            <el-input type="text" v-model="stockAddForm.costPrice" autocomplete="off"></el-input> 元
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('stockAddForm')">入库</el-button>
            <el-button @click="resetForm('stockAddForm')">重置</el-button>
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
      stockAddForm: {
        barCode: "",
        num: "",
        costPrice: ""
      },
      rules: {
        barCode: [
          { required: true, message: "条形码不能为空", trigger: "blur" }
        ],
        num: [{ required: true, message: "数量不能为空", trigger: "blur" }],
        costPrice: [
          { required: true, message: "进价不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("添加库存成功!");
          // 直接跳转到商品管理
          this.$router.push("/stockmanage");
        } else {
          alert("添加库存失败!");
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
.stock-add {
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
              width: 150px;
            }
          }
        }
      }
    }
  }
}
</style>