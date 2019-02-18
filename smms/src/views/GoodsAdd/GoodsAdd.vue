<template>
  <div class="goods-add">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加商品</span>
      </div>
      <div class="text item">
        <el-form
          size="small"
          :model="goodsAddForm"
          status-icon
          :rules="rules"
          ref="goodsAddForm"
          label-width="100px"
          class="demo-ruleForm"
          hide-required-asterisk
        >
          <el-form-item label="所属分类" prop="cateName">
            <el-select v-model="goodsAddForm.cateName" placeholder="选择分类">
              <el-option label="电子类" value="电子类"></el-option>
              <el-option label="食品类" value="食品类"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品条形码" prop="barCode">
            <el-input
              type="text"
              v-model="goodsAddForm.barCode"
              autocomplete="off"
              style="width: 250px;margin-right:20px"
            ></el-input>
            <el-button type="primary" @click="getBarCode(2)">生成条形码</el-button>
          </el-form-item>
          <el-form-item label="商品名称" prop="goodsName">
            <el-input
              type="text"
              v-model="goodsAddForm.goodsName"
              autocomplete="off"
              style="width: 250px"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品售价" prop="salePrice">
            <el-input type="text" v-model="goodsAddForm.salePrice" autocomplete="off"></el-input>&nbsp;元
            <div style="height:16px;line-height:16px;font-size:12px;color:#aaa">默认市场价为售价的1.2倍</div>
          </el-form-item>
          <el-form-item label="市场价" prop="marketPrice">
            <el-input type="text" v-model="goodsAddForm.marketPrice" autocomplete="off"></el-input>&nbsp;元
          </el-form-item>
          <el-form-item label="商品进价" prop="costPrice">
            <el-input type="text" v-model="goodsAddForm.costPrice" autocomplete="off"></el-input>&nbsp;元
          </el-form-item>
          <el-form-item label="入库数量" prop="goodsNum">
            <el-input type="text" v-model="goodsAddForm.goodsNum" autocomplete="off"></el-input>
            <div style="height:16px;line-height:16px;font-size:12px;color:#aaa">计重商品单位为千克</div>
          </el-form-item>
          <el-form-item label="商品重量" prop="goodsWeight">
            <el-input type="text" v-model="goodsAddForm.goodsWeight" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品单位" prop="goodsUnit">
            <el-select v-model="goodsAddForm.goodsUnit" placeholder="选择单位">
              <el-option label="个" value="个"></el-option>
              <el-option label="件" value="件"></el-option>
              <el-option label="盒" value="盒"></el-option>
              <el-option label="斤" value="斤"></el-option>
              <el-option label="袋" value="袋"></el-option>
              <el-option label="瓶" value="瓶"></el-option>
              <el-option label="箱" value="箱"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员优惠" prop="discount">
            <el-radio-group v-model="goodsAddForm.discount">
              <el-radio label="享受"></el-radio>
              <el-radio label="不享受"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否促销" prop="promotion">
            <el-switch v-model="goodsAddForm.promotion"></el-switch>
          </el-form-item>
          <el-form-item label="商品简介" prop="goodsDesc">
            <el-input type="textarea" v-model="goodsAddForm.goodsDesc" style="width:250px"></el-input>
            <div style="height:16px;line-height:16px;font-size:12px;color:#aaa">不超过200个汉字</div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('goodsAddForm')">添加</el-button>
            <el-button @click="resetForm('goodsAddForm')">重置</el-button>
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
      goodsAddForm: {
        cateName: "",
        barCode: "",
        goodsName: "",
        salePrice: "",
        marketPrice: "",
        costPrice: "",
        goodsNum: "",
        goodsWeight: "",
        goodsUnit: "",
        discount: "不享受",
        promotion: false,
        goodsDesc: ""
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
        marketPrice: [
          { required: true, message: "市场价不能为空", trigger: "blur" }
        ],
        costPrice: [
          { required: true, message: "商品进价不能为空", trigger: "blur" }
        ],
        goodsNum: [
          { required: true, message: "入库数量不能为空", trigger: "blur" }
        ],
        goodsWeight: [
          { required: true, message: "商品重量不能为空", trigger: "blur" }
        ],
        goodsUnit: [
          { required: true, message: "请选择商品单位", trigger: "change" }
        ],
        discount: [
          { required: true, message: "请选择是否优惠", trigger: "blur" }
        ],
        promotion: [
          { required: true, message: "请选择是否促销", trigger: "change" }
        ],
        goodsDesc: [
          { required: true, message: "商品简介不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //生成条形码函数
    getBarCode(n) {
      var rnd = "";
      for (var i = 0; i < n; i++) rnd += Math.floor(Math.random() * 10);
      this.goodsAddForm.barCode = "69119892625" + rnd;
      //触发条形码验证
      this.$refs.goodsAddForm.validateField("barCode");
    },
    //表单提交函数
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //收集商品数据
          let params = {
            cateName: this.goodsAddForm.cateName,
            barCode: this.goodsAddForm.barCode,
            goodsName: this.goodsAddForm.goodsName,
            salePrice: this.goodsAddForm.salePrice,
            marketPrice: this.goodsAddForm.marketPrice,
            costPrice: this.goodsAddForm.costPrice,
            goodsNum: this.goodsAddForm.goodsNum,
            goodsWeight: this.goodsAddForm.goodsWeight,
            goodsUnit: this.goodsAddForm.goodsUnit,
            discount: this.goodsAddForm.discount,
            promotion: this.goodsAddForm.promotion,
            goodsDesc: this.goodsAddForm.goodsDesc
          };
          //使用ajax发送商品数据
          this.req
            .post("/goods/goodsadd", params)
            .then(response => {
              //接收响应数据
              let { error_code, reason } = response.data;
              if (!error_code) {
                this.$message({
                  //弹出成功提示
                  showClose: true,
                  type: "success",
                  message: reason
                });
                // 直接跳转到商品管理
                this.$router.push("/goodsmanage");
              } else {
                //弹出失败提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message.error("添加商品失败!");
          return false;
        }
      });
    },
    //表单重置函数
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less">
.goods-add {
  .el-card {
    .el-card__header {
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
    .el-card__body {
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
</style>