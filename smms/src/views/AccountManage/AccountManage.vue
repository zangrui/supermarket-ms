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
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="username" label="账号"></el-table-column>
          <el-table-column prop="usergroup" label="用户组"></el-table-column>
          <el-table-column label="创建日期">
            <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.row.id)">
                <i class="el-icon-edit"></i> 编辑
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
                <i class="el-icon-delete"></i> 删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 模态框 -->
        <el-dialog title="账号修改" :visible.sync="flag" width="500px">
          <!-- 添加账号表单 -->
          <el-form
            size="small"
            :model="editForm"
            status-icon
            :rules="rules"
            label-width="90px"
            hide-required-asterisk
          >
            <!-- 账号 -->
            <el-form-item label="账号" prop="username">
              <el-input type="text" v-model="editForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 选中用户组 -->
            <el-form-item label="选择用户组" prop="userGroup">
              <el-select v-model="editForm.usergroup" placeholder="请选择用户组">
                <el-option label="普通用户" value="普通用户"></el-option>
                <el-option label="高级管理员" value="高级管理员"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>
<script>
//引入qs模块
import qs from "qs";
//引入moment模块
import moment from "moment";
export default {
  data() {
    // 包含特殊字符的函数
    const checkSpecificKey = str => {
      var specialKey =
        "[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";
      for (var i = 0; i < str.length; i++) {
        if (specialKey.indexOf(str.substr(i, 1)) != -1) {
          return false;
        }
      }
      return true;
    };
    //验证账号函数
    const username = (rule, value, callback) => {
      if (!checkSpecificKey(value)) {
        callback(new Error("用户名不能包含特殊字符"));
      }
      callback();
    };
    return {
      tableData: [],
      flag:false,
      editId:"",
      editForm: {
        username: "",
        usergroup: ""
      },
      rules: {
        username: [
          { validator: username, trigger: "blur" },
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 5, message: "账号长度在 3 - 5 位", trigger: "blur" }
        ],
        userGroup: [
          { required: true, message: "请选择用户组", trigger: "change" }
        ]
      }
    };
  },
  //生命周期钩子函数 自动触发
  created() {
    this.getAccountList();
  },
  methods: {
    //请求账号数据函数
    getAccountList() {
      this.axios
        .get("http://127.0.0.1:3000/account/accountlist")
        .then(response => {
          //把接收的数据赋值给tabledata
          this.tableData = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //修改账号函数
    handleEdit(id) {
      //保存要修改账号的id
      this.editId = id;
      //发送ajax 传入id
      this.axios.get(`http://127.0.0.1:3000/account/accountedit?id=${id}`)
        .then(response => {
          //回填表单
          this.editForm = response.data[0];
        })
        .catch(err => {
          console.log(err);
        });
      // 显示模态框
      this.flag = true;
    },
    //保存修改函数
    saveEdit() {

    },
    //删除账号函数
    handleDelete(id) {
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //发送ajax 传入id
          this.axios
            .get(`http://127.0.0.1:3000/account/accountdel?id=${id}`)
            .then(response => {
              //接收响应数据
              let { error_code, reason } = response.data;
              if (!error_code) {
                //弹出成功提示
                this.$message({
                  showClose: true,
                  type: "success",
                  message: reason
                });
                //请求账号数据(刷新)
                this.getAccountList();
              } else {
                //弹出失败提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  //过滤器
  filters: {
    //过滤时间的函数
    filterCtime(ctime) {
      return moment(ctime).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
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