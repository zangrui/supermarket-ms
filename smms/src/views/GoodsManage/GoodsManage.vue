<template>
  <div class="goods-manage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品管理</span>
      </div>
      <div class="text item">
        <el-form size="small" :model="searchForm" inline class="demo-ruleForm">
          <el-form-item>
            <el-select v-model="searchForm.cateName" placeholder="选择分类" style="width: 100px">
              <el-option label="全部" value="全部"></el-option>
              <el-option label="电子类" value="电子类"></el-option>
              <el-option label="食品类" value="食品类"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关键字">
            <el-input
              type="text"
              v-model="searchForm.keyWord"
              autocomplete="off"
              placeholder="商品名称/条形码"
              style="width: 250px"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
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
          <el-table-column prop="barCode" label="商品条形码" width="150px"></el-table-column>
          <el-table-column prop="goodsName" label="商品名称"></el-table-column>
          <el-table-column prop="cateName" label="所属分类"></el-table-column>
          <el-table-column prop="salePrice" label="售价(元)"></el-table-column>
          <el-table-column prop="promotionalPrice" label="促销价(元)"></el-table-column>
          <el-table-column prop="marketPrice" label="市场价(元)"></el-table-column>
          <el-table-column prop="stock" label="库存" width="80px"></el-table-column>
          <el-table-column prop="stockTotal" label="库存总额(元)"></el-table-column>
          <el-table-column prop="salesTotal" label="销售总额(元)"></el-table-column>
          <el-table-column label="管理" width="174px">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">
                <i class="el-icon-edit"></i> 编辑
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                <i class="el-icon-delete"></i> 删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {
        cateName: "",
        keyWord: ""
      },
      tableData: [
        {
          barCode: "6911989262549",
          goodsName: "优乐美",
          cateName: "食品类",
          salePrice: "2.00",
          promotionalPrice: "未促销",
          marketPrice: "2.40",
          stock: "5",
          stockTotal: "35.00",
          salesTotal: "40.00"
        },
        {
          barCode: "6911989262549",
          goodsName: "优乐美",
          cateName: "食品类",
          salePrice: "2.00",
          promotionalPrice: "未促销",
          marketPrice: "2.40",
          stock: "5",
          stockTotal: "35.00",
          salesTotal: "40.00"
        },
        {
          barCode: "6911989262549",
          goodsName: "优乐美",
          cateName: "食品类",
          salePrice: "2.00",
          promotionalPrice: "未促销",
          marketPrice: "2.40",
          stock: "5",
          stockTotal: "35.00",
          salesTotal: "40.00"
        },
        {
          barCode: "6911989262549",
          goodsName: "优乐美",
          cateName: "食品类",
          salePrice: "2.00",
          promotionalPrice: "未促销",
          marketPrice: "2.40",
          stock: "5",
          stockTotal: "35.00",
          salesTotal: "40.00"
        },
        {
          barCode: "6911989262549",
          goodsName: "优乐美",
          cateName: "食品类",
          salePrice: "2.00",
          promotionalPrice: "未促销",
          marketPrice: "2.40",
          stock: "5",
          stockTotal: "35.00",
          salesTotal: "40.00"
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
};
</script>
<style lang="less">
.goods-manage {
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