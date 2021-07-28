<template>
  <div class="chart">
    <el-card class="box-card">
      <h1>OTHER CHARTS DEMO</h1>
      <div ref="otherChart" style="height: 350px"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  components: {
    echarts,
  },
  props: {
    xchartData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    ychartData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      myChart: null,
      option: {},
    };
  },
  mounted() {
    this.initOtherChart();
  },
  methods: {
    initOtherChart() {
      this.myChart = echarts.init(this.$refs.otherChart);
      this.option = {
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: this.xchartData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.ychartData,
            type: "line",
            smooth: true,
          },
        ],
      };
      this.myChart && this.myChart.setOption(this.option);
    },
  },
};
</script>

<style scoped>
.chart {
  width: 49%;
  height: 450px;
  float: right;
  margin: 20px 0;
}
</style>