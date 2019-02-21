<template>
  <div class="account-manage">
    <!-- 面板组件 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号管理</span>
      </div>
      <div class="text item">
        <el-table
          ref="accountList"
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
        <!-- 分页 -->
        <el-pagination
          style="margin-top: 20px;text-align: right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 3, 5, 10]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>

        <!-- 批量删除按钮 & 取消选择按钮 -->
        <div>
          <el-button size="small" type="primary" @click="batchDelete">批量删除</el-button>
          <el-button size="small" @click="cancelSelect()">取消选择</el-button>
        </div>

        <!-- 修改模态框 -->
        <el-dialog title="账号修改" :visible.sync="flag" width="400px">
          <el-form
            size="small"
            ref="accountEditForm"
            :model="accountEditForm"
            status-icon
            :rules="rules"
            label-width="100px"
            hide-required-asterisk
          >
            <!-- 账号 -->
            <el-form-item label="账　号" prop="username">
              <el-input
                type="text"
                v-model="accountEditForm.username"
                autocomplete="off"
                style="width:203px"
              ></el-input>
            </el-form-item>
            <!-- 选择用户组 -->
            <el-form-item label="用户组" prop="usergroup">
              <el-select v-model="accountEditForm.usergroup" placeholder="请选择用户组">
                <el-option label="普通用户" value="普通用户"></el-option>
                <el-option label="高级管理员" value="高级管理员"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="flag = false">取 消</el-button>
            <el-button size="small" type="primary" @click="saveEdit('accountEditForm')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>
<script>
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
      } else if (this.username !== value) {
        //判断是否有修改
        //获取账号
        let username = value;
        //发送ajax传入账号
        this.req
          .get("/account/checkaccount", { username })
          .then(response => {
            //接收数据
            let { error_code, reason } = response.data;
            if (error_code) {
              //错误提示
              callback(new Error(reason));
            } else {
              //正确回调
              callback();
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        //正确回调
        callback();
      }
    };
    return {
      tableData: [], //账号数据
      flag: false, //修改模态框的显示隐藏
      editId: "",
      selecteAccount: [], //被选中的账号数据
      currentPage: 1,
      total: 0,
      pageSize: 3,
      username: "",
      usergroup: "",
      accountEditForm: {
        username: "",
        usergroup: ""
      },
      rules: {
        username: [
          { validator: username, trigger: "blur" },
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 6, message: "账号长度在 3 - 6 位", trigger: "blur" }
        ],
        usergroup: [
          { required: true, message: "请选择用户组", trigger: "change" }
        ]
      }
    };
  },
  //生命周期钩子函数 自动触发
  created() {
    this.getAccountListByPage();
  },
  methods: {
    //按照分页显示账号数据函数
    getAccountListByPage() {
      //收集当前页码和每页显示条数
      let params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage
      };
      //发送ajax 传入当前页码和每页显示条数
      this.req
        .get("/account/accountlistbypage", params)
        .then(response => {
          //接收后端返回的数据总条数 total 和 对应页码的数据 data
          let { total, data } = response.data;
          this.total = total;
          this.tableData = data;
          // 如果当前页没有数据 且 排除第一页
          if (!data.length && this.currentPage !== 1) {
            //页码减去1
            this.currentPage -= 1;
            //再调自己
            this.getAccountListByPage();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //每页显示条数改变触发的函数
    handleSizeChange(val) {
      //保存每页显示的条数
      this.pageSize = val;
      //调用分页函数
      this.getAccountListByPage();
    },
    //当前页码改变触发的函数
    handleCurrentChange(val) {
      //保存当前页码
      this.currentPage = val;
      //调用分页函数
      this.getAccountListByPage();
    },
    //单选框的选中状态改变触发的函数 val就是选中的数据 是一个数组
    handleSelectionChange(val) {
      //保存被选中的账号数据
      this.selecteAccount = val;
    },
    //批量删除
    batchDelete() {
      //判断是否有选中
      if (!this.selecteAccount.length) {
        this.$message.error("请选择后再操作！");
        return;
      }
      //收集需要删除账号的id
      let selectedIdArr = this.selecteAccount.map(v => v.id);
      //提示框
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //发送ajax 传入需要删除账号的id
          this.req
            .get("/account/batchdelete", { selectedId: selectedIdArr })
            .then(response => {
              //接收响应数据
              let { error_code, reason } = response.data;
              if (error_code === 0) {
                //弹出成功提示
                this.$message({
                  showClose: true,
                  type: "success",
                  message: reason
                });
                //请求账号数据(刷新)
                this.getAccountListByPage();
              } else if (error_code) {
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
    },
    //取消选中
    cancelSelect() {
      this.$refs.accountList.clearSelection();
    },
    //修改账号函数
    handleEdit(id) {
      //保存要修改账号的id
      this.editId = id;
      //发送ajax 传入id
      this.req
        .get("/account/accountedit", { id })
        .then(response => {
          //保存数据
          this.username = response.data[0].username;
          this.usergroup = response.data[0].usergroup;
          //回填表单
          this.accountEditForm = response.data[0];
          // 显示模态框
          this.flag = true;
          //重置表单
          this.$refs.accountEditForm.resetFields();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //保存修改函数
    saveEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //收集修改后的数据 和原来的id
          let username = this.accountEditForm.username;
          let usergroup = this.accountEditForm.usergroup;
          let params = {
            username: this.accountEditForm.username,
            usergroup: this.accountEditForm.usergroup,
            id: this.editId
          };
          //判断是否有修改
          if (this.username === username && this.usergroup === usergroup) {
            this.$message.error("未做任何修改！");
            // 关闭模态框
            this.flag = false;
            return;
          }
          //使用axios发送修改后的数据
          this.req
            .post("/account/accountsaveedit", params)
            .then(response => {
              //接收响应数据
              let { error_code, reason } = response.data;
              if (error_code === 0) {
                //弹出成功提示
                this.$message({
                  showClose: true,
                  type: "success",
                  message: reason
                });
                //请求账号数据(刷新)
                this.getAccountListByPage();
              } else if (error_code) {
                //弹出失败提示
                this.$message.error(reason);
              }
              // 关闭模态框
              this.flag = false;
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message.error("账号修改失败!");
        }
      });
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
          this.req
            .get("/account/accountdel", { id })
            .then(response => {
              //接收响应数据
              let { error_code, reason } = response.data;
              if (error_code === 0) {
                //弹出成功提示
                this.$message({
                  showClose: true,
                  type: "success",
                  message: reason
                });
                //请求账号数据(刷新)
                this.getAccountListByPage();
              } else if (error_code) {
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
    .el-card__body {
      .el-dialog {
        .el-dialog__body {
          padding: 20px 20px 10px;
        }
      }
    }
  }
}
</style>