<template>
  <div class="member-manage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>会员管理</span>
      </div>
      <div class="text item">
        <el-form size="small" :model="searchForm" inline class="demo-ruleForm">
          <el-form-item label="搜索">
            <el-input
              type="text"
              v-model="searchForm.search"
              autocomplete="off"
              placeholder="会员卡/会员名/电话/手机"
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
          <el-table-column prop="cardNum" label="会员卡卡号"></el-table-column>
          <el-table-column prop="name" label="会员姓名"></el-table-column>
          <el-table-column prop="grade" label="会员等级"></el-table-column>
          <el-table-column prop="integral" label="会员积分"></el-table-column>
          <el-table-column prop="discount" label="折扣"></el-table-column>
          <el-table-column prop="phoneNum" label="手机号"></el-table-column>
          <el-table-column prop="telNum" label="座机号"></el-table-column>
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
        search: ""
      },
      tableData: [
        {
          cardNum: "6911989262",
          name: "李寻欢",
          grade: "铜牌会员",
          integral: "218",
          discount: "50%",
          phoneNum: "15910001000",
          telNum: "4008220666"
        },
        {
          cardNum: "6911989262",
          name: "李寻欢",
          grade: "铜牌会员",
          integral: "218",
          discount: "50%",
          phoneNum: "15910001000",
          telNum: "4008220666"
        },
        {
          cardNum: "6911989262",
          name: "李寻欢",
          grade: "铜牌会员",
          integral: "218",
          discount: "50%",
          phoneNum: "15910001000",
          telNum: "4008220666"
        },
        {
          cardNum: "6911989262",
          name: "李寻欢",
          grade: "铜牌会员",
          integral: "218",
          discount: "50%",
          phoneNum: "15910001000",
          telNum: "4008220666"
        },
        {
          cardNum: "6911989262",
          name: "李寻欢",
          grade: "铜牌会员",
          integral: "218",
          discount: "50%",
          phoneNum: "15910001000",
          telNum: "4008220666"
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
.member-manage {
  .el-card {
    .el-card__header {
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
    .el-card__body {
      .el-pagination {
        margin-top: 20px;
      }
    }
  }
}
</style>