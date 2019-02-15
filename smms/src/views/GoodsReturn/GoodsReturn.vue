<template>
  <div class="goods-return">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品退货</span>
      </div>
      <div class="text item">
        <el-form size="small" :model="searchForm" inline class="demo-ruleForm">
          <el-form-item label="订单号">
            <el-input
              type="text"
              v-model="searchForm.orderNum"
              autocomplete="off"
              style="width: 250px"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
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
      searchForm: {
        orderNum: ""
      }
    };
  },
  methods: {
    search() {}
  }
};
</script>
<style lang="less">
.goods-return {
  .el-card {
      .el-card__header {
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
  }
}
</style>