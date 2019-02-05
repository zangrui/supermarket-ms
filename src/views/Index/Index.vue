<template>
  <div class="index">
    <el-container>
      <el-header height="70px">
          <!-- 头部组件 -->
            <Top></Top>
      </el-header>
      <el-container>
          <!-- 导航组件 -->
          <Nav></Nav>
        <el-container>
          <el-main>
              <!-- 路由出口 -->
              <router-view />
          </el-main>
          <el-footer height="46px">
              <!-- 尾部组件 -->
                <Bottom></Bottom>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
//引入导航组件
import Nav from '@/components/Nav/Nav.vue'
// 引入头部组件
import Top from '@/components/Top/Top.vue'
// 引入尾部组件
import Bottom from '@/components/Bottom/Bottom.vue'
export default {
    components:{
        //注册组件
        Nav,
        Top,
        Bottom
    }
};
</script>
<style lang="less">
.index {
  height: 100%;
  .el-container {
    height: 100%;
    .el-header {
      line-height: 70px;
      padding: 0;
      background-color: #242f42;
      color: #ffffff;
    }
    .el-container{
        .el-footer{
          line-height: 45px;
        }
      }
  }
}
</style>

