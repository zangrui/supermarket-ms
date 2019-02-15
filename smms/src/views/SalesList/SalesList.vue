<template>
<div class="sales-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>销售列表</span>
      </div>
      <div class="text item">
        <el-form size="small" :model="searchForm" inline class="demo-ruleForm">
            <el-col :span="24">
                <el-form-item label="　时间">
                    <el-date-picker type="date" placeholder="开始时间" v-model="searchForm.startTime" style="width: 130px"></el-date-picker>
                    <big>-</big>
                    <el-date-picker type="date" placeholder="结束时间" v-model="searchForm.endTime" style="width: 130px"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="关键字">
                    <el-input
                    type="text"
                    v-model="searchForm.keyWord"
                    autocomplete="off"
                    placeholder="商品名称/订单号/客户名字/会员卡号"
                    style="width: 300px"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
            </el-col>
        </el-form>

        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          stripe
          @selection-change="handleSelectionChange"
        >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="orderNum" label="订单号"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
        <el-table-column prop="num" label="数量"></el-table-column>
        <el-table-column prop="actualPrice" label="实际售价"></el-table-column>
        <el-table-column prop="discount" label="优惠(促销/会员)"></el-table-column>
        <el-table-column prop="refund" label="退款"></el-table-column>
        <el-table-column prop="salesTime" label="销售时间"></el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
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
        keyWord: ""
      },
      tableData: [
        {
          orderNum: "02171514583337",
          goodsName: "海飞丝洗发水",
          num: "3",
          actualPrice: "24",
          discount: "2.00元/无",
          refund: "无退款",
          salesTime: "2019-02-03"
        },
        {
          orderNum: "02171514583337",
          goodsName: "海飞丝洗发水",
          num: "3",
          actualPrice: "24",
          discount: "2.00元/无",
          refund: "无退款",
          salesTime: "2019-02-03"
        },
        {
          orderNum: "02171514583337",
          goodsName: "海飞丝洗发水",
          num: "3",
          actualPrice: "24",
          discount: "2.00元/无",
          refund: "无退款",
          salesTime: "2019-02-03"
        },
        {
          orderNum: "02171514583337",
          goodsName: "海飞丝洗发水",
          num: "3",
          actualPrice: "24",
          discount: "2.00元/无",
          refund: "无退款",
          salesTime: "2019-02-03"
        },
        {
          orderNum: "02171514583337",
          goodsName: "海飞丝洗发水",
          num: "3",
          actualPrice: "24",
          discount: "2.00元/无",
          refund: "无退款",
          salesTime: "2019-02-03"
        }
      ]
    };
  },
  methods: {
    search() {},
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit() {},
    handleDelete() {}
  } 
}
</script>
<style lang="less">
.sales-list {
  .el-card {
      .el-card__header {
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
    .el-card__body {
      .el-pagination{
          margin-top: 20px;
      }
    }
  }
}
</style>