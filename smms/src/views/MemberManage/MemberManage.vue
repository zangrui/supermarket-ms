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
          ref="memberList"
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
          <el-table-column prop="phoneNum" label="手机号"></el-table-column>
          <el-table-column prop="telNum" label="座机号"></el-table-column>
          <el-table-column label="管理" width="174px">
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
        <el-dialog title="会员修改" :visible.sync="flag" width="420px">
          <el-form
            size="small"
            :model="memberEditForm"
            status-icon
            :rules="rules"
            ref="memberEditForm"
            label-width="100px"
            hide-required-asterisk
          >
            <el-form-item label="真实名字" prop="name">
              <el-input type="text" v-model="memberEditForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="会员卡卡号" prop="cardNum">
              <el-input type="text" v-model="memberEditForm.cardNum" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="会员等级" prop="grade">
              <el-select v-model="memberEditForm.grade" placeholder="选择会员等级">
                <el-option label="普通会员" value="普通会员"></el-option>
                <el-option label="铜牌会员" value="铜牌会员"></el-option>
                <el-option label="金牌会员" value="金牌会员"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="会员积分" prop="integral">
              <el-input type="text" v-model="memberEditForm.integral" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phoneNum">
              <el-input type="text" v-model="memberEditForm.phoneNum" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="座机号码" prop="telNum">
              <el-input type="text" v-model="memberEditForm.telNum" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="flag = false">取 消</el-button>
            <el-button size="small" type="primary" @click="saveEdit('memberEditForm')">确 定</el-button>
          </div>
        </el-dialog>
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
      tableData: [],
      flag: false, //修改模态框的显示隐藏
      editId: "",
      selecteMember: [], //被选中的会员数据
      currentPage: 1,
      total: 0,
      pageSize: 3,
      memberEditForm: {
        name: "",
        cardNum: "",
        grade: "",
        integral: "",
        phoneNum: "",
        telNum: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        cardNum: [
          { required: true, message: "请输入会员卡卡号", trigger: "blur" }
        ],
        grade: [
          { required: true, message: "请选择会员等级", trigger: "change" }
        ],
        integral: [
          { required: true, message: "请输入会员积分", trigger: "blur" }
        ],
        phoneNum: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        telNum: [{ required: true, message: "请输入座机号码", trigger: "blur" }]
      }
    };
  },
  //生命周期钩子函数 自动触发
  created() {
    this.getMemberListByPage();
  },
  methods: {
    //查询函数
    search() {},
    //按照分页显示会员数据函数
    getMemberListByPage() {
      //收集当前页码和每页显示条数
      let params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage
      };
      //发送ajax 传入当前页码和每页显示条数
      this.req
        .get("/member/memberlistbypage", params)
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
            this.getMemberListByPage();
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
      this.getMemberListByPage();
    },
    //当前页码改变触发的函数
    handleCurrentChange(val) {
      //保存当前页码
      this.currentPage = val;
      //调用分页函数
      this.getMemberListByPage();
    },
    //单选框的选中状态改变触发的函数 val就是选中的数据 是一个数组
    handleSelectionChange(val) {
      //保存被选中的会员数据
      this.selecteMember = val;
    },
    //批量删除
    batchDelete() {
      //判断是否有选中
      if (!this.selecteMember.length) {
        this.$message.error("请选择后再操作！");
        return;
      }
      //收集需要删除会员的id
      let selectedIdArr = this.selecteMember.map(v => v.id);
      //提示框
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //发送ajax 传入需要删除会员的id
          this.req
            .get("/member/batchdelete", { selectedId: selectedIdArr })
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
                //请求会员数据(刷新)
                this.getMemberListByPage();
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
      this.$refs.memberList.clearSelection();
    },
    //修改会员函数
    handleEdit(id) {
      //保存要修改会员的id
      this.editId = id;
      //发送ajax 传入id
      this.req
        .get("/member/memberedit", { id })
        .then(response => {
          //回填表单
          this.memberEditForm = response.data[0];
          // 显示模态框
          this.flag = true;
          //重置表单
          this.$refs.memberEditForm.resetFields();
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
          let params = {
            name: this.memberEditForm.name,
            cardNum: this.memberEditForm.cardNum,
            grade: this.memberEditForm.grade,
            integral: this.memberEditForm.integral,
            phoneNum: this.memberEditForm.phoneNum,
            telNum: this.memberEditForm.telNum,
            id: this.editId
          };
          //使用axios发送修改后的数据
          this.req
            .post("/member/membersaveedit", params)
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
                //请求会员数据(刷新)
                this.getMemberListByPage();
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
          this.$message.error("修改商品失败!");
        }
      });
    },
    //删除会员函数
    handleDelete(id) {
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //发送ajax 传入id
          this.req
            .get("/member/memberdel", { id })
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
                //请求会员数据(刷新)
                this.getMemberListByPage();
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
      .el-dialog {
        .el-dialog__body {
          padding: 20px 20px 10px;
          .el-form {
            .el-form-item {
              .el-form-item__content {
                .el-input {
                  width: 250px;
                }
                .el-select {
                  .el-input {
                    width: 160px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>