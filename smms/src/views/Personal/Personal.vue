<template>
  <div class="personal">
    <!-- 面板组件 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人中心</span>
      </div>
      <div class="el-row content">
        <div class="info el-col-12">
          <h4>账号信息</h4>
          <p>账号: {{userInfo.username}}</p>
          <p>用户组: {{userInfo.usergroup}}</p>
          <p>创建时间: {{userInfo.ctime | filterCtime}}</p>
        </div>
        <div class="el-col-12">
          <h4>头像上传</h4>
          <el-upload
            class="avatar-uploader"
            ref="upload"
            action="http://127.0.0.1:3000/login/upload"
            :data="userInfo"
            :auto-upload="false"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-error="handleAvatarError"
            :on-change="handleAvatarChange"
            :before-upload="beforeAvatarUpload"
          >
            <!-- 图片显示 -->
            <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button @click="saveAvatar" size="small" type="primary" style="margin-top:10px">确定</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import bus from "../../components/bus.js";
import moment from "moment";
export default {
  data() {
    return {
      avatarUrl: "", // 头像地址
      userInfo: {
        // 用户信息
        username: "",
        usergroup: "",
        ctime: ""
      }
    };
  },
  created() {
    // 发送请求获取个人信息
    this.getAccountInfo();
  },
  methods: {
    // 获取账号信息
    getAccountInfo() {
      // 发送请求
      this.req
        .get("/account/accountinfo")
        .then(response => {
          // 接收后端返回的数据
          this.userInfo = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    saveAvatar() {
      //上传头像
      this.$refs.upload.submit();
    },
    handleAvatarChange(file) {
      // 回显图片
      this.avatarUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess() {
      this.$message({
        type: "success",
        message: "上传成功！"
      });
      //组件通信
      bus.$emit("avt");
    },
    handleAvatarError() {
      this.$message.error("上传失败！");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  filters: {
    // 过滤时间
    filterCtime(val) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>
<style lang="less">
.personal {
  .el-card {
    .el-card__header {
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
    .el-card__body {
      .content {
        padding: 20px 40px;
        h4 {
          margin: 0 0 16px;
        }
      }
      .avatar-uploader {
        .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .el-upload:hover {
          border-color: #409eff;
        }
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 150px;
        height: 150px;
        line-height: 150px;
        text-align: center;
      }
      .avatar {
        width: 150px;
        height: 150px;
        display: block;
      }
    }
  }
}
</style>


