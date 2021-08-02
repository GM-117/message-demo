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
        <div>内存使用率</div>
        <div>根磁盘使用率</div>
      </div>
      <div class="circle_tips">
        <el-tooltip placement="right">
          <div slot="content">
            CPU数量：{{this.progressCPUdetail.cpuNum}}<br />
            CPU数量：{{this.progressCPUdetail.cpuNum}}<br />
            CPU数量：{{this.progressCPUdetail.cpuNum}}<br />
            CPU数量：{{this.progressCPUdetail.cpuNum}}<br />
            CPU数量：{{this.progressCPUdetail.cpuNum}}<br />
            CPU数量：{{this.progressCPUdetail.cpuNum}}<br />
          </div>
          <el-progress
            class="tips"
            type="circle"
            :percentage="progressCPU"
            :color="customColorMethod"
            :width="200"
          ></el-progress>
        </el-tooltip>
        <el-tooltip placement="right">
          <div slot="content">
            内存：{{this.progressMEMORYdetail.free}}<br />
            内存：{{this.progressMEMORYdetail.free}}<br />
            内存：{{this.progressMEMORYdetail.free}}<br />
          </div>
          <el-progress
            class="tips"
            type="circle"
            :percentage="progressMEMORY"
            :color="customColorMethod"
            :width="200"
          ></el-progress>
        </el-tooltip>
        <el-tooltip placement="right">
          <div slot="content">
            磁盘：{{this.progressDISKdetail.dirPath}}<br />
            磁盘：{{this.progressDISKdetail.dirPath}}<br />
            磁盘：{{this.progressDISKdetail.dirPath}}<br />
            磁盘：{{this.progressDISKdetail.dirPath}}<br />
            磁盘：{{this.progressDISKdetail.dirPath}}<br />
            磁盘：{{this.progressDISKdetail.dirPath}}<br />
          </div>
          <el-progress
            class="tips"
            type="circle"
            :percentage="progressDISK"
            :color="customColorMethod"
            :width="200"
          ></el-progress>
        </el-tooltip>
      </div>
    </el-card>

    <Charts :xchartData="xchartData" :ychartData="ychartData" />
    <OtherCharts :xchartData="xchartData" :ychartData="ychartData" />
    <div class="clearfix"></div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import Charts from "./charts.vue";
import OtherCharts from "./otherCharts.vue";

export default {
  name: "Dashboard",
  components: {
    Charts,
    OtherCharts,
  },
  data() {
    return {
      progressCPU: 0,
      progressMEMORY: 0,
      progressDISK: 0,
      progressCPUdetail: {
        cpuNum: 0,
        freeRatio: 0,
        sysRatio: 0,
        total: 0,
        userRatio: 0,
        waitRatio: 0,
      },
      progressMEMORYdetail: {
        free: 0,
        total: 0,
        used: 0,
      },
      progressDISKdetail: {
        dirPath: "NaN",
        dirType: "NaN",
        free: "NaN",
        sysType: "NaN",
        total: "NaN",
        usage: 0,
        used: "NaN",
      },
      xchartData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      ychartData: [300, 932, 901, 934, 1290, 1330, 1320],
    };
  },
  watch: {},
  created() {
    this.getWebsocket();
  },
  computed: {
    ...mapGetters(["name"]),
  },
  methods: {
    getWebsocket() {
      let that = this;
      const ws = new WebSocket("ws://192.168.125.123:18083/websocket/1");
      ws.onopen = () => {
        console.log("websocket 连接成功");
      };
      ws.onmessage = function (e) {
        // console.log(e.data);
        var mesObj = JSON.parse(e.data);
        that.progressCPUdetail = mesObj.cpuInfo;
        that.progressMEMORYdetail = mesObj.memInfo;
        that.progressDISKdetail = mesObj.diskInfos[0]
        that.progressCPU = that.progressCPUdetail.totalRatio;
        that.progressMEMORY = that.progressMEMORYdetail.usage;
        that.progressDISK = that.progressDISKdetail.usage * 100;
        
      };
      ws.onerror = function (err) {
        console.log(err);
      };
    },
    customColorMethod(percentage) {
      if (percentage < 30) {
        return "#2ecc71";
      } else if (percentage < 60) {
        return "#e67e22";
      } else {
        return "#e74c3c";
      }
    },
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
