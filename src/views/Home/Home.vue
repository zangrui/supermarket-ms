<template>
  <div class="home">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>系统信息</span>
      </div>
      <div class="text item">
        <!-- 提示信息 -->
        <el-alert title="商品总数: 500, 已销售总金额: 998.00, 库存商品总价: 9800.00" type="info" show-icon></el-alert>
        <!-- 导入数据 -->
        <el-alert title="导入数据" type="success" show-icon></el-alert>
        <!-- 左右卡片 -->
        <el-row :gutter="20">
          <!-- 左 -->
          <el-col :span="12">
            <!-- 左侧卡片 -->
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>销售排行</span>
              </div>
              <div class="text item">
                <!-- 左侧表格 -->
                <el-table :data="saleData" stripe style="width: 100%">
                  <!-- 商品名称 -->
                  <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                  <!-- 销量 -->
                  <el-table-column prop="saleCount" label="销量"></el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-col>
          <!-- 右 -->
          <el-col :span="12">
            <!-- 右侧卡片 -->
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>缺货的商品</span>
              </div>
              <div class="text item">
                <!-- 右侧表格 -->
                <el-table :data="stockoutData" stripe style="width: 100%">
                  <!-- 商品名称 -->
                  <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                  <!-- 库存 -->
                  <el-table-column prop="inventory" label="库存"></el-table-column>
                  <!-- 操作 -->
                  <el-table-column prop="saleCount" label="操作">
                    <template slot-scope="scope">
                      <el-button type="text" size="small">入库</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 销量排行数据
      saleData: [
        {
          goodsName: "海飞丝",
          saleCount: 10
        },
        {
          goodsName: "霸王",
          saleCount: 80
        },
        {
          goodsName: "蒂花之秀",
          saleCount: 50
        },
        {
          goodsName: "飘柔",
          saleCount: 18
        },
        {
          goodsName: "飘柔",
          saleCount: 18
        }
      ],
      // 缺货商品数据
      stockoutData: [
        {
          goodsName: "娃哈哈",
          inventory: 1
        },
        {
          goodsName: "娃哈哈",
          inventory: 2
        },
        {
          goodsName: "娃哈哈",
          inventory: 5
        },
        {
          goodsName: "娃哈哈",
          inventory: 0
        }
      ]
    };
  }
};
</script>
<style lang="less">
.home {
  .el-card {
    .el-card__header {
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
      color:#333333;
    }
    .el-card__body {
      .item {
        .el-alert {
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>

