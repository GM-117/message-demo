<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
import Vue from "vue";
import { Notification } from "element-ui";
Vue.prototype.$notify = Notification;

export default {
  name: "AppMain",
  components: {
    Notification,
  },
  watch: {
    NotifyMessage: function () {
      this.startListen();
    },
  },
  data() {
    return {
      NotifyMessage: null,
      ws: null,
    };
  },
  beforeDestroy() {
    this.ws.close();
  },
  created() {
    this.startListen();
  },
  computed: {
    key() {
      return this.$route.path;
    },
  },
  methods: {
    startListen() {
      // const ws = new WebSocket("ws://10.11.47.209:8084//imserver/10")
      // const ws = new WebSocket("ws://10.11.42.203:8083/websocket/admin")
      this.ws = new WebSocket("ws://10.11.47.209:8084//imserver/8");
      this.ws.onopen = function () {
        console.log("websocket获取全局通知已启用");
      };
      this.ws.onmessage = function (e) {
        console.log(e.data);
        var mesObj = JSON.parse(e.data);
        let that = this;
        that.NotifyMessage = mesObj.message;
        console.log(that.NotifyMessage);
        if (that.NotifyMessage) {
          Vue.prototype.$notify({
            title: "通知",
            message: that.NotifyMessage,
            type: "warning",
            // position: 'top-left',
            duration: 10000,
          });
        }
      };
    },
  },
};
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
