<template>
  <div class="classify-add">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加分类</span>
      </div>
      <div class="text item">
        <el-form
          size="small"
          :model="classifyAddForm"
          status-icon
          :rules="rules"
          ref="classifyAddForm"
          label-width="100px"
          class="demo-ruleForm"
          hide-required-asterisk
        >
          <el-form-item label="所属分类" prop="classify">
            <el-select v-model="classifyAddForm.classify" placeholder="请选择分类" style="width: 120px">
              <el-option label="顶级分类" value="顶级分类"></el-option>
              <el-option label="二级分类" value="二级分类"></el-option>
              <el-option label="三级分类" value="三级分类"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类名称" prop="classifyName">
            <el-input
              type="text"
              v-model="classifyAddForm.classifyName"
              autocomplete="off"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-switch v-model="classifyAddForm.status"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('classifyAddForm')">添加</el-button>
            <el-button @click="resetForm('classifyAddForm')">重置</el-button>
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
      classifyAddForm: {
        classify: "",
        classifyName: "",
        status: false
      },
      rules: {
        classify: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        classifyName: [
          { required: true, message: "分类名称不能为空", trigger: "blur" }
        ],
        state: [{ required: true, message: "请选择状态", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("添加分类成功!");
          // 直接跳转到分类管理
          this.$router.push("/classifymanage");
        } else {
          alert("添加分类失败!");
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
.classify-add {
  .el-card {
    .el-card__header {
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
  }
}
</style>