<template>
  <div id="app">
    <!-- 路由出口 -->
    <router-view/>
  </div>
</template>
<script>
export default {
  mounted() {
    //此方法刷新页面时也会执行
    window.addEventListener("beforeunload", () => {
      localStorage.removeItem("token");
    });
  }
};
</script>

<style lang="less">
</style>
