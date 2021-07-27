<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <el-tooltip placement="right" class="tips">
      <div slot="content">多行信息<br/>第二行信息</div>
      <el-progress type="circle" :percentage="progress1" :width=200 ></el-progress>
    </el-tooltip>
    <el-tooltip placement="right" class="tips">
      <div slot="content">多行信息<br/>第二行信息</div>
      <el-progress type="circle" :percentage="progress2" :width=200 ></el-progress>
    </el-tooltip>
    <el-tooltip placement="right" class="tips">
      <div slot="content">多行信息<br/>第二行信息</div>
      <el-progress type="circle" :percentage="progress3" :width=200></el-progress>
    </el-tooltip>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  data() {
    return {
      progress1: 0,
      progress2: 20,
      progress3: 50,
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },

};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.tips{
  margin: 10px 50px;
}
</style>
