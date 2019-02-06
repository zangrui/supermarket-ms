<template>
  <el-menu
    background-color="#324157"
    text-color="#bfcbd9"
    :default-active="this.$route.path"
    class="sidebar-el-menu"
    :collapse="collapse"
    router
    unique-opened
  >
    <template v-for="item in items">
      <!-- 有子菜单 -->
      <template v-if="item.subs">
        <el-submenu :index="item.index" :key="item.index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </template>
          <template v-for="subItem in item.subs">
            <el-menu-item :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
          </template>
        </el-submenu>
      </template>
      <!-- 没有子菜单 -->
      <template v-else>
        <el-menu-item :index="item.index" :key="item.index">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>
</el-menu>
</template>
<script>
import bus from "../bus.js";
export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: "el-icon-setting",
          index: "1",
          title: "系统管理",
          subs: [
            {
              index: "/",
              title: "系统信息"
            }
          ]
        },
        {
          icon: "el-icon-smms-zhanghaoguanli",
          index: "2",
          title: "账号管理",
          subs: [
            {
              index: "/accountmanage",
              title: "账号管理"
            },
            {
              index: "/accountadd",
              title: "添加账号"
            },
            {
              index: "/passwordmodify",
              title: "密码修改"
            }
          ]
        },
        {
          icon: "el-icon-goods",
          index: "3",
          title: "商品管理",
          subs: [
            {
              index: "/goodsmanage",
              title: "商品管理"
            },
            {
              index: "/goodsadd",
              title: "添加商品"
            }
          ]
        },
        {
          icon: "el-icon-smms-jinhuo",
          index: "4",
          title: "进货管理",
          subs: [
            {
              index: "/stockmanage",
              title: "库存管理"
            },
            {
              index: "/stockadd",
              title: "添加库存"
            }
          ]
        },
        {
          icon: "el-icon-smms-chuhuo",
          index: "5",
          title: "出货管理",
          subs: [
            {
              index: "/saleslist",
              title: "销售列表"
            },
            {
              index: "/goodsoutstock",
              title: "商品出库"
            },
            {
              index: "/goodsreturn",
              title: "商品退货"
            }
          ]
        },
        {
          icon: "el-icon-smms-tongji",
          index: "6",
          title: "统计管理",
          subs: [
            {
              index: "/salestatistics",
              title: "销售统计"
            }
          ]
        },
        {
          icon: "el-icon-menu",
          index: "7",
          title: "分类管理",
          subs: [
            {
              index: "/classifymanage",
              title: "分类管理"
            },
            {
              index: "/classifyadd",
              title: "添加分类"
            }
          ]
        },
        {
          icon: "el-icon-smms-huiyuanguanli",
          index: "8",
          title: "会员管理",
          subs: [
            {
              index: "/membermanage",
              title: "会员管理"
            },
            {
              index: "/memberadd",
              title: "添加会员"
            }
          ]
        }
      ]
    };
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  }
};
</script>
<style lang="less">
.el-menu {
  border: none;
  height: 100%;
}
</style>


