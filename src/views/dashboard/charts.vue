<template>
  <div class="chart">
    <el-card class="box-card">
      <h1>1小时趋势变化</h1>
      <div ref="lineChart" style="height: 350px"></div>
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
    cpuUsage: {
      type: Array,
      default: () => {
        return [];
      },
    },
    memoryUsage: {
      type: Array,
      default: () => {
        return [];
      },
    },
    diskUsage: {
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
    this.initLineChart();
  },
  methods: {
    initLineChart() {
      this.myChart = echarts.init(this.$refs.lineChart);
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
        legend:{
          right: 10,
          data:[{
            name:'CPU使用量',
            textStyle:{fontWeight: 'bold'}
          },{
            name:'内存使用量',
            textStyle:{fontWeight: 'bold'}
          },{
            name:'磁盘使用量',
            textStyle:{fontWeight: 'bold'}
          }]
        },
        series: [
          {
            name: "CPU使用量",
            data: this.cpuUsage,
            type: "line",
            smooth: true,
          },
          {
            name:"内存使用量",
            data: this.memoryUsage,
            type: "line",
            smooth: true,
          },
          {
            name:"磁盘使用量",
            data: this.diskUsage,
            type: "line",
            smooth: true,
          }
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
  float: left;
  margin: 20px 0;
}
</style>