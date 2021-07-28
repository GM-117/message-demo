<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span
          style="font-weight: bold; color: rgb(102, 102, 102); font-size: 15px"
          >状态</span
        >
      </div>
      <div class="circle_title">
        <div>CPU使用率</div>
        <div>CPU使用率</div>
        <div>CPU使用率</div>
      </div>
      <div class="circle_tips">
        <el-tooltip placement="right">
          <div slot="content">
            第二行<br />第三行多行信息<br />第二行<br />第三行多行信息<br />第二行<br />第三行多行信息<br />第二行<br />第三行多行信息<br />第二行<br />第三行
          </div>
          <el-progress
            class="tips"
            type="circle"
            :percentage="progress1"
            :width="200"
          ></el-progress>
        </el-tooltip>
        <el-tooltip placement="right">
          <div slot="content">多行信息<br />第二行信息</div>
          <el-progress
            class="tips"
            type="circle"
            :percentage="progress2"
            :width="200"
          ></el-progress>
        </el-tooltip>
        <el-tooltip placement="right">
          <div slot="content">多行信息<br />第二行信息</div>
          <el-progress
            class="tips"
            type="circle"
            :percentage="progress3"
            :width="200"
          ></el-progress>
        </el-tooltip>
      </div>
    </el-card>

    <Charts :xchartData="xchartData" :ychartData="ychartData" />
    <OtherCharts :xchartData="xchartData" :ychartData="ychartData" />
    <div class="clearfix"></div>
    <!-- <UserCenter/> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Charts from "./charts.vue";
import OtherCharts from "./otherCharts.vue";
// import UserCenter from './userCenter.vue'

export default {
  name: "Dashboard",
  components: {
    Charts,
    OtherCharts,
    // UserCenter
  },
  data() {
    return {
      progress1: 0,
      progress2: 20,
      progress3: 50,
      xchartData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      ychartData: [300, 932, 901, 934, 1290, 1330, 1320],
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
.circle_tips {
  display: flex;
  justify-content: space-around;
}
.circle_title {
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;
  font-size: 15px;
  font-weight: 500;
  color: #999;
}

.clearfix:after {
  content: "";
  display: block;
  height: 0;
  line-height: 0;
  visibility: hidden;
  clear: both;
}

.box-card {
  width: 100%;
}
</style>
