<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span
          style="font-weight: bold; color: rgb(102, 102, 102); font-size: 18px"
          >状态</span
        >
      </div>
      <div class="circle_tips">
        <el-tooltip placement="top">
          <div slot="content">
            CPU核心数：{{ this.progressCPUdetail.cpuNum }}<br />
            CPU字节数：{{ this.progressCPUdetail.total }}Bytes<br />
            CPU系统使用率：{{ this.progressCPUdetail.sysRatio }}%<br />
            CPU用户使用率：{{ this.progressCPUdetail.userRatio }}%<br />
            CPU当前等待率：{{ this.progressCPUdetail.waitRatio }}%<br />
            CPU当前空闲率：{{ this.progressCPUdetail.freeRatio }}%<br />
          </div>
          <el-progress
            class="tips"
            type="circle"
            :percentage="progressCPU"
            :color="customCpuColorMethod"
            :width="160"
          ></el-progress>
        </el-tooltip>
        <el-tooltip placement="top">
          <div slot="content">
            内存总量：{{ this.progressMEMORYdetail.total }}<br />
            已用内存：{{ this.progressMEMORYdetail.used }}<br />
            剩余内存：{{ this.progressMEMORYdetail.free }}<br />
          </div>
          <el-progress
            class="tips"
            type="circle"
            :percentage="progressMEMORY"
            :color="customMemoryColorMethod"
            :width="160"
          ></el-progress>
        </el-tooltip>
        <el-tooltip placement="top">
          <div slot="content">
            磁盘路径：{{ this.progressDISKdetail.dirPath }}<br />
            磁盘类型：{{ this.progressDISKdetail.sysType }}<br />
            磁盘文件类型：{{ this.progressDISKdetail.dirType }}<br />
            磁盘总大小：{{ this.progressDISKdetail.total }}<br />
            磁盘剩余：{{ this.progressDISKdetail.free }}<br />
            磁盘已经使用量：{{ this.progressDISKdetail.used }}<br />
          </div>
          <el-progress
            class="tips"
            type="circle"
            :percentage="progressDISK"
            :color="customDiskColorMethod"
            :width="160"
          ></el-progress>
        </el-tooltip>
      </div>
      <div class="circle_title">
        <div style="width: 160px; display: flex; justify-content: center">
          <span>CPU使用率</span>
        </div>
        <div style="width: 160px; display: flex; justify-content: center">
          <span>内存使用率</span>
        </div>
        <div style="width: 160px; display: flex; justify-content: center">
          <span>根磁盘使用率</span>
        </div>
      </div>
    </el-card>
    <el-card class="boxInfo-card">
      <div slot="header" class="clearfix">
        <span
          style="font-weight: bold; color: rgb(102, 102, 102); font-size: 18px"
          >服务器信息</span
        >
      </div>
      <div class="detailInfo">
        <span>服务器名称：{{ this.sysInfo.computerName }}</span
        ><br />
        <span>服务器IP地址：{{ this.sysInfo.computerIp }}</span
        ><br />
        <span>操作系统：{{ this.sysInfo.osName }}</span
        ><br />
        <span>系统架构：{{ this.sysInfo.osArch }}</span
        ><br />
        <span>项目路径：{{ this.sysInfo.userDir }}</span>
      </div>
    </el-card>

    <Charts
      :xchartData="xchartData1"
      :cpuUsage="cpuUsage1"
      :memoryUsage="memoryUsage1"
      :diskUsage="diskUsage1"
    />
    <OtherCharts
      :xchartData="xchartData24"
      :cpuUsage="cpuUsage24"
      :memoryUsage="memoryUsage24"
      :diskUsage="diskUsage24"
    />
    <div class="clearfix"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Charts from "./charts.vue";
import OtherCharts from "./otherCharts.vue";
import { getSysInfo , get01DateSysInfo , get24DateSysInfo} from "@/api/InfoDetail";

export default {
  name: "Dashboard",
  components: {
    Charts,
    OtherCharts,
  },
  data() {
    return {
      ws: null,
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
      threshold: {
        cpuPeriod: 1,
        cpuThreshold: 80.0,
        createTime: 1627886945000,
        diskPeriod: 1,
        diskThreshold: 80.0,
        id: 1,
        memPeriod: 1,
        memThreshold: 80.0,
        monRefresh: 30,
        updateTime: 1627897240000,
      },
      sysInfo: {
        computerName: "NaN",
        computerIp: "*.*.*.*",
        osName: "NaN",
        osArch: "NaN",
        userDir: "NaN",
      },
      xchartData1: [],
      cpuUsage1: [],
      memoryUsage1: [],
      diskUsage1: [],

      xchartData24: [],
      cpuUsage24: [],
      memoryUsage24: [],
      diskUsage24: []
    };
  },
  created() {
    this.getWebsocket();
    this.getInfo();
    this.get01SysInfo();
    this.get24SysInfo()
  },
  beforeDestroy() {
    this.ws.close();
  },
  computed: {
    ...mapGetters(["name"]),
  },
  methods: {
    getInfo() {
      getSysInfo().then((res) => {
        // console.log(res.data);
        this.sysInfo = res.data.sysInfo;
      });
    },
    get01SysInfo(){
      this.xchartData1 = [];
      this.cpuUsage1 = [];
      this.memoryUsage1 = [];
      this.diskUsage1 = [];
      get01DateSysInfo().then((res)=>{
        // console.log(res.data.monUsages)
        var monUsages1 = res.data.monUsages;
        for(let i = monUsages1.length - 1; i > 0; i--){
          this.xchartData1.push(monUsages1[i].createTime);
          this.cpuUsage1.push(monUsages1[i].cpuUsage);
          this.memoryUsage1.push(monUsages1[i].memoryUsage)
          this.diskUsage1.push(monUsages1[i].diskUsage)
        }
      });
    },
    get24SysInfo(){
      this.xchartData24 = [];
      this.cpuUsage24 = [];
      this.memoryUsage24 = [];
      this.diskUsage24 = [];
      get24DateSysInfo().then((res)=>{
        // console.log(res.data.monUsages)
        var monUsages24 = res.data.monUsages;
        for(let i = monUsages24.length - 1; i > 0; i--){
          this.xchartData24.push(monUsages24[i].createTime);
          this.cpuUsage24.push(monUsages24[i].cpuUsage);
          this.memoryUsage24.push(monUsages24[i].memoryUsage)
          this.diskUsage24.push(monUsages24[i].diskUsage)
        }
      });
    },
    getWebsocket() {
      this.ws = new WebSocket("ws://10.11.42.203:8088/ws?uid=admin");
      this.ws.onopen = () => {
        console.log("websocket系统信息连接成功");
      };
      this.ws.onmessage = (e) => {
        // console.log(e.data);
        var mesObj = JSON.parse(e.data);
        this.progressCPUdetail = mesObj.cpuInfo;
        this.progressMEMORYdetail = mesObj.memInfo;
        this.progressDISKdetail = mesObj.diskInfos[0];
        this.threshold = mesObj.threshold;
        this.progressCPU = this.progressCPUdetail.totalRatio;
        this.progressMEMORY = this.progressMEMORYdetail.usage;
        this.progressDISK = Math.floor(this.progressDISKdetail.usage * 100 * 100) / 100;
      };
      this.ws.onerror = function (err) {
        console.log(err);
      };
    },
    customCpuColorMethod(percentage) {
      if (percentage > this.threshold.cpuThreshold) {
        return "#e74c3c";
      } else {
        return "#2ecc71";
      }
    },
    customMemoryColorMethod(percentage) {
      if (percentage > this.threshold.memThreshold) {
        return "#e74c3c";
      } else {
        return "#2ecc71";
      }
    },
    customDiskColorMethod(percentage) {
      if (percentage > this.threshold.diskThreshold) {
        return "#e74c3c";
      } else {
        return "#2ecc71";
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
  margin-top: 16px;
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
  width: 75%;
  height: 300px;
  float: left;
}
.boxInfo-card {
  width: 25%;
  height: 300px;
  float: right;
  background-color: #f1f2f6;
  // margin-left: 5px;
}
.detailInfo {
  line-height: 35px;
  font-size: 15px;
  color: #999;
}
</style>
