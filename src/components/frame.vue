<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.common-layout {
  width: 100%;
  height: 100vh;
  background-color: aquamarine;

  .el-container {
    height: 100%;

    .el-aside {
      background-color: cadetblue;
    }

    .el-main {
      background-color: chocolate;
    }

    .el-header {
      background-color: chartreuse;
      height: 80px;
    }
  }
}
</style>
