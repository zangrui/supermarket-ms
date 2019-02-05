<template>
  <div class="top">
    <div class="title">
      <div class="collapse-btn" @click="collapseChage">
        <i class="el-icon-menu"></i>
      </div>华联超市后台管理系统
    </div>
  </div>
</template>
<script>
import bus from "../bus.js";
export default {
  data() {
    return {
      collapse: false
    };
  },
  methods: {
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
    }
  }
};
</script>
<style lang="less">
.top {
  .title {
    font-size: 20px;
    .collapse-btn {
      float: left;
      padding: 0 20px;
      cursor: pointer;
    }
  }
}
</style>


