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
      NotifyName: null
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
      this.ws = new WebSocket("ws://10.11.41.15:8085/webSocket");
      this.ws.onopen = function () {
        console.log("websocket获取全局通知已启用");
      };
      this.ws.onmessage = function (e) {
        console.log(e.data);
        var mesObj = JSON.parse(e.data);
        let that = this;
        that.NotifyMessage = mesObj.detail;
        that.NotifyName = mesObj.name;
        console.log(that.NotifyMessage);
        if (that.NotifyMessage) {
          Vue.prototype.$notify({
            title: that.NotifyName,
            message: that.NotifyMessage,
            type: "warning",
            // position: 'top-left',
            duration: 5000,
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
.el-notification__content {
  text-align: inherit;
  word-break: break-all;
}
</style>
