<template>
  <div class="goods-outstock">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品出库</span>
      </div>
      <div class="text item">
        <el-form
          size="small"
          :model="goodsOutStockForm"
          status-icon
          :rules="rules"
          ref="goodsOutStockForm"
          label-width="100px"
          class="demo-ruleForm"
          hide-required-asterisk
        >
          <el-form-item label="商品条形码" prop="barCode">
            <el-input
              type="text"
              v-model="goodsOutStockForm.barCode"
              autocomplete="off"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="num">
            <el-input type="text" v-model="goodsOutStockForm.num" autocomplete="off" style="width: 100px"></el-input> 
            <span style="height:16px;line-height:16px;font-size:12px;color:#aaa"> 计重商品单位为千克</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('goodsOutStockForm')">加入订单</el-button>
            <el-button @click="resetForm('goodsOutStockForm')">重新出库</el-button>
          </el-form-item>

            <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            stripe
            @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                <el-table-column prop="num" label="数量"></el-table-column>
                <el-table-column prop="unitPrice" label="单价(元)"></el-table-column>
                <el-table-column prop="totalPrice" label="总价(元)"></el-table-column>
                <el-table-column prop="discountTotalPrice" label="优惠总价(元)"></el-table-column>
            </el-table>

          <el-form-item label="会员卡号">
            <el-input
              type="text"
              v-model="goodsOutStockForm.membershipNum"
              autocomplete="off"
              style="width: 300px"
              placeholder="填写会员卡号"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">确认提交</el-button>
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
      goodsOutStockForm: {
        barCode: "",
        num: "",
        membershipNum:""
      },
      rules: {
        barCode: [
          { required: true, message: "条形码不能为空", trigger: "blur" }
        ],
        num: [{ required: true, message: "数量不能为空", trigger: "blur" }]
      },
      tableData: [
        {
          goodsName: "优乐美",
          num: "5",
          unitPrice: "3.50",
          totalPrice: "17.50",
          discountTotalPrice:"15.00"
        },
        {
          goodsName: "优乐美",
          num: "5",
          unitPrice: "3.50",
          totalPrice: "17.50",
          discountTotalPrice:"15.00"
        },
        {
          goodsName: "优乐美",
          num: "5",
          unitPrice: "3.50",
          totalPrice: "17.50",
          discountTotalPrice:"15.00"
        }
      ]
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("商品出库成功!");
        } else {
          alert("商品出库失败!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submit (){},
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
<style lang="less">
.goods-outstock {
  .el-card {
      .el-card__header {
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
    .el-card__body {
      .el-form{
          .el-table {
            margin-bottom: 20px;
          }
      }
    }
  }
}
</style>