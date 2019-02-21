<template>
  <div class="nav">
    <el-menu
      background-color="#32415780"
      text-color="#bfcbd9"
      :default-active="this.$route.path"
      class="sidebar-el-menu"
      :collapse="collapse"
      router
      unique-opened
    >
      <template v-for="(nav,index) in navMenu">
        <!-- 有子菜单 -->
        <el-submenu v-if="nav.subs && nav.subs.length" :index="index+''" :key="index">
          <template slot="title">
            <i :class="nav.icon"></i>
            <span slot="title">{{ nav.title }}</span>
          </template>
          <el-menu-item
            v-for="(subNav,index) in nav.subs"
            :index="subNav.index"
            :key="index"
          >{{ subNav.title }}</el-menu-item>
        </el-submenu>
        <!-- 没有子菜单 -->
        <el-menu-item v-else :index="nav.index" :key="index">
          <i :class="nav.icon"></i>
          <span slot="title">{{ nav.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
import bus from "../bus.js";
export default {
  data() {
    return {
      collapse: false,
      navMenu: []
    };
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
    //发送ajax获取菜单信息
    this.req
      .get("/account/role")
      .then(response => {
        //将接受到的导航数据赋值给navMenu
        this.navMenu = response.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="less">
.nav {
  .sidebar-el-menu {
    height: 100%;
    border: none;
    .el-menu-item {
      background-color: transparent !important;
    }
    .el-menu-item:hover {
      background-color: #324157 !important;
    }
    .el-submenu {
      .el-submenu__title,
      .el-menu {
        background-color: transparent !important;
        .el-menu-item {
          background-color: transparent !important;
        }
      }
      .el-submenu__title:hover,
      .el-menu .el-menu-item:hover {
        background-color: #324157 !important;
      }
    }
  }
  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 200px;
  }
}
.el-menu--vertical {
  .el-menu--popup {
    padding: 0;
    .el-menu-item {
      background-color: transparent !important;
    }
  }
}
.el-menu--vertical {
  .el-menu--popup {
    .el-menu-item:hover {
      background-color: #324157 !important;
    }
  }
}
</style>


