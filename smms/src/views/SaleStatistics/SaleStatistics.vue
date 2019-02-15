<template>
<div class="sale-statistics">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>销售统计</span>
      </div>
      <div class="text item">
        <el-form size="small" :model="searchForm" inline class="demo-ruleForm">
            <el-form-item label="时间">
                <el-date-picker type="date" placeholder="开始时间" v-model="searchForm.startTime" style="width: 130px"></el-date-picker>
                <big>-</big>
                <el-date-picker type="date" placeholder="结束时间" v-model="searchForm.endTime" style="width: 130px"></el-date-picker>
            </el-form-item>
            <el-form-item >
                <el-select v-model="searchForm.statistics" style="width: 100px">
                    <el-option label="销售统计" value="销售统计"></el-option>
                    <el-option label="进货统计" value="进货统计"></el-option>
                </el-select>
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
        startTime: "",
        endTime:"",
        statistics: "销售统计"
      }
    };
  },
  methods: {
    search() {},
  }   
}
</script>
<style lang="less">

</style>