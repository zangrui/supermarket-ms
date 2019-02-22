<template>
  <div class="top el-row">
    <div class="title el-col-19">
      <div class="collapse-btn" @click="collapseChage">
        <i class="el-icon-menu"></i>
      </div>
      <span>华联超市后台管理系统</span>
    </div>
    <div class="top-right el-col-5 el-row">
      <el-col :span="12" style="min-width:140px">
        <span>欢迎您！</span>
        <el-dropdown @command="handleCommand" trigger="click">
          <!-- 用户名 -->
          <span class="username el-dropdown-link">
            {{ username }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <!-- 下拉菜单 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personal">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <div class="avatar el-col-12" @click="$router.push('/personal')">
        <img :src="avatarUrl" alt width="100%" height="100%">
      </div>
    </div>
  </div>
</template>
<script>
import bus from "../bus.js";
export default {
  data() {
    return {
      usernam: "",
      avatarUrl: "",
      collapse: false
    };
  },
  created() {
    // 显示当前登录的用户
    this.username = window.sessionStorage.getItem("username");
    // 获取头像
    this.getAvatar();
    bus.$on("avt", () => {
      // 获取头像
      this.getAvatar();
    });
  },
  methods: {
    //导航折叠
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
    },
    handleCommand(command) {
      // 如果点击的是退出
      if (command === "logout") {
        // 清除token
        window.sessionStorage.removeItem('token');
        // 弹出提示
        this.$message({
          type: "success",
          message: "退出成功！"
        });
        // 跳转到登录页面
        this.$router.push("/login");
      } else if (command === "personal") {
        // 跳转到个人中心
        this.$router.push("/personal");
      }
    },
    // 获取头像信息
    getAvatar() {
      let username = this.username;
      this.req
        .get("/account/getavatar", { username })
        .then(response => {
          this.avatarUrl = "http://127.0.0.1:3000" + response.data[0].imgurl;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less">
.top {
  .title {
    font-size: 20px;
    .collapse-btn {
      display: inline-block;
      width: 64px;
      text-align: center;
      cursor: pointer;
    }
  }
  .top-right {
    .el-dropdown {
      .username {
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        .el-icon--right {
          margin: 0;
        }
      }
    }
    .avatar {
      width: 60px;
      height: 60px;
      cursor: pointer;
      margin-top: 5px;
      img {
        border-radius: 50%;
      }
    }
  }
}
</style>


