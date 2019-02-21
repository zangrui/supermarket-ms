<template>
  <div class="notfound">
    <div class="notfound-wrapper">
      <!-- 登录标题 -->
      <h1 class="title">
        4 0 4 . . .
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
   return{}
  }
};
</script>

<style lang="less">
.notfound {
  height: 100%;
  background: url(../../assets/bg.jpg) no-repeat;
  overflow: hidden;
  .notfound-wrapper {
    width: 500px;
    height: 350px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #ffffff;
    margin: 100px auto;
    padding: 0 40px;
    .title {
      height: 350px;
      line-height: 350px;
      text-indent: 80px;
      font-size: 80px;
    }
  }
}
</style>
