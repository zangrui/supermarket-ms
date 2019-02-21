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
          ref="goodsList"
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
          <el-table-column prop="promotion" label="是否促销"></el-table-column>
          <el-table-column prop="marketPrice" label="市场价(元)"></el-table-column>
          <el-table-column prop="goodsNum" label="库存" width="80px"></el-table-column>
          <el-table-column label="库存总额(元)">
            <template
              slot-scope="scope"
            >{{ getStockTotal(scope.row.goodsNum, scope.row.salePrice) }}</template>
          </el-table-column>
          <el-table-column label="销售总额(元)">
            <template
              slot-scope="scope"
            >{{ getSalesTotal(scope.row.goodsNum, scope.row.salePrice) }}</template>
          </el-table-column>
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
        <el-dialog title="商品修改" :visible.sync="flag" width="520px">
          <el-form
            size="small"
            :model="goodsEditForm"
            status-icon
            :rules="rules"
            ref="goodsEditForm"
            label-width="100px"
            hide-required-asterisk
          >
            <el-form-item label="所属分类" prop="cateName">
              <el-select v-model="goodsEditForm.cateName" placeholder="选择分类">
                <el-option label="电子类" value="电子类"></el-option>
                <el-option label="食品类" value="食品类"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品条形码" prop="barCode">
              <el-input
                type="text"
                v-model="goodsEditForm.barCode"
                autocomplete="off"
                style="width: 250px;margin-right:20px"
              ></el-input>
              <el-button type="primary" @click="getBarCode(2)">生成条形码</el-button>
            </el-form-item>
            <el-form-item label="商品名称" prop="goodsName">
              <el-input
                type="text"
                v-model="goodsEditForm.goodsName"
                autocomplete="off"
                style="width: 250px"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品售价" prop="salePrice">
              <el-input type="text" v-model="goodsEditForm.salePrice" autocomplete="off"></el-input>&nbsp;元
              <div style="height:16px;line-height:16px;font-size:12px;color:#aaa">默认市场价为售价的1.2倍</div>
            </el-form-item>
            <el-form-item label="市场价" prop="marketPrice">
              <el-input type="text" v-model="goodsEditForm.marketPrice" autocomplete="off"></el-input>&nbsp;元
            </el-form-item>
            <el-form-item label="是否促销" prop="promotion">
              <el-switch v-model="goodsEditForm.promotion"></el-switch>
            </el-form-item>
            <el-form-item label="入库数量" prop="goodsNum">
              <el-input type="text" v-model="goodsEditForm.goodsNum" autocomplete="off"></el-input>
              <div style="height:16px;line-height:16px;font-size:12px;color:#aaa">计重商品单位为千克</div>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="flag = false,goodsEditForm.resetFields()">取 消</el-button>
            <el-button size="small" type="primary" @click="saveEdit('goodsEditForm')">确 定</el-button>
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
        cateName: "",
        keyWord: ""
      },
      tableData: [],
      flag: false, //修改模态框的显示隐藏
      editId: "",
      selecteGoods: [], //被选中的商品数据
      currentPage: 1,
      total: 0,
      pageSize: 3,
      goodsEditForm: {
        cateName: "",
        barCode: "",
        goodsName: "",
        promotion: "",
        salePrice: "",
        marketPrice: "",
        goodsNum: ""
      },
      rules: {
        cateName: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        barCode: [
          { required: true, message: "条形码不能为空", trigger: "blur" },
          { min: 13, max: 13, message: "条形码长度为 13 位", trigger: "blur" }
        ],
        goodsName: [
          { required: true, message: "商品名称不能为空", trigger: "blur" }
        ],
        salePrice: [
          { required: true, message: "商品售价不能为空", trigger: "blur" }
        ],
        promotion: [
          { required: true, message: "请选择是否促销", trigger: "change" }
        ],
        marketPrice: [
          { required: true, message: "市场价不能为空", trigger: "blur" }
        ],
        goodsNum: [
          { required: true, message: "入库数量不能为空", trigger: "blur" }
        ]
      }
    };
  },
  //生命周期钩子函数 自动触发
  created() {
    this.getGoodsListByPage();
  },
  methods: {
    //按照分页显示商品数据函数
    getGoodsListByPage() {
      //收集当前页码和每页显示条数
      let params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        cateName: this.searchForm.cateName, // 查询分类名
        keyWord: this.searchForm.keyWord // 查询关键字
      };
      //发送ajax 传入当前页码和每页显示条数
      this.req
        .get("/goods/goodslistbypage", params)
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
            this.getGoodsListByPage();
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
      this.getGoodsListByPage();
    },
    //当前页码改变触发的函数
    handleCurrentChange(val) {
      //保存当前页码
      this.currentPage = val;
      //调用分页函数
      this.getGoodsListByPage();
    },
    //单选框的选中状态改变触发的函数 val就是选中的数据 是一个数组
    handleSelectionChange(val) {
      //保存被选中的商品数据
      this.selecteGoods = val;
    },
    //批量删除
    batchDelete() {
      //判断是否有选中
      if (!this.selecteGoods.length) {
        this.$message.error("请选择后再操作！");
        return;
      }
      //收集需要删除商品的id
      let selectedIdArr = this.selecteGoods.map(v => v.id);
      //提示框
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //发送ajax 传入需要删除商品的id
          this.req
            .get("/goods/batchdelete", { selectedId: selectedIdArr })
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
                //请求商品数据(刷新)
                this.getGoodsListByPage();
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
      this.$refs.goodsList.clearSelection();
    },
    //修改商品函数
    handleEdit(id) {
      //保存要修改商品的id
      this.editId = id;
      //发送ajax 传入id
      this.req
        .get("/goods/goodsedit", { id })
        .then(response => {
          //回填表单
          this.goodsEditForm = response.data[0];
          // 显示模态框
          this.flag = true;
          //重置表单
          this.$refs.goodsEditForm.resetFields();
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
            cateName: this.goodsEditForm.cateName,
            barCode: this.goodsEditForm.barCode,
            goodsName: this.goodsEditForm.goodsName,
            salePrice: this.goodsEditForm.salePrice,
            promotion: this.goodsEditForm.promotion,
            marketPrice: this.goodsEditForm.marketPrice,
            goodsNum: this.goodsEditForm.goodsNum,
            id: this.editId
          };
          //使用axios发送修改后的数据
          this.req
            .post("/goods/goodssaveedit", params)
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
                this.getGoodsListByPage();
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
    //删除商品函数
    handleDelete(id) {
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //发送ajax 传入id
          this.req
            .get("/goods/goodsdel", { id })
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
                //请求商品数据(刷新)
                this.getGoodsListByPage();
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
    //计算销售总额
    getSalesTotal(goodsNum, salePrice) {
      return goodsNum * salePrice;
    },
    //计算库存总额
    getStockTotal(goodsNum, salePrice) {
      return goodsNum * salePrice;
    },
    //生成条形码函数
    getBarCode(n) {
      var rnd = "";
      for (var i = 0; i < n; i++) rnd += Math.floor(Math.random() * 10);
      this.goodsEditForm.barCode = "69119892625" + rnd;
      //触发条形码验证
      this.$refs.goodsEditForm.validateField("barCode");
    },
    // 查询
    search() {
      // 调用分页函数
      this.getGoodsListByPage();
    }
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
      .el-dialog {
        .el-dialog__body {
          padding: 20px 20px 10px;
          .el-form {
            .el-form-item {
              .el-form-item__content {
                .el-input {
                  width: 150px;
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