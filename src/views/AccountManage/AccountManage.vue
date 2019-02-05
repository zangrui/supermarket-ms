<template>
<div class="account-manage">
    <!-- 面板组件 -->
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>账号管理</span>
        </div>
        <div class="text item">
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                stripe
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="账号">
                </el-table-column>
                <el-table-column
                    prop="usergroup"
                    label="用户组">
                </el-table-column>
                <el-table-column
                    prop="cdate"
                    label="创建日期">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.$index, scope.row)">
                            <i class="el-icon-edit"></i> 编辑
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">
                            <i class="el-icon-delete"></i> 删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-card>
</div>
</template>
<script>
export default {
data() {
    return {
      tableData: [
        {
          username: "李寻欢",
          usergroup: "超级管理员",
          cdate: "2019-01-30"
        },
        {
          username: "admin",
          usergroup: "普通用户",
          cdate: "2019-01-30"
        },
        {
          username: "赵子龙",
          usergroup: "超级管理员",
          cdate: "2019-01-30"
        },
        {
          username: "guest",
          usergroup: "普通用户",
          cdate: "2019-02-03"
        },
        {
          username: "guest",
          usergroup: "普通用户",
          cdate: "2019-02-02"
        },
        {
          username: "guest",
          usergroup: "普通用户",
          cdate: "2019-02-01"
        }
      ]
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit() {},
    handleDelete() {}
  }
}
</script>
<style lang="less">
.account-manage {
  .el-card {
    .el-card__header {
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
  }
}
</style>