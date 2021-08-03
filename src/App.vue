<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import Vue from "vue";
// import { Notification } from "element-ui";
// Vue.prototype.$notify = Notification;

export default {
  name: "App",
  // components: {
  //   Notification,
  // },
  // watch: {
  //   NotifyMessage: function () {
  //     this.startListen();
  //   },
  // },
  // data() {
  //   return {
  //     NotifyMessage: null,
  //   };
  // },
  // created() {
  //   this.startListen();
  // },
  // methods: {
  //   startListen() {
  //     // const ws = new WebSocket("ws://10.11.47.209:8084//imserver/10")
  //     // const ws = new WebSocket("ws://10.11.42.203:8083/websocket/admin")
  //     const ws = new WebSocket("ws://10.11.47.209:8084//imserver/10");
  //     ws.onopen = function () {
  //       console.log("websocket获取全局通知已启用");
  //     };
  //     ws.onmessage = function (e) {
  //       console.log(e.data);
  //       var mesObj = JSON.parse(e.data);
  //       let that = this;
  //       that.NotifyMessage = mesObj.message;
  //       console.log(that.NotifyMessage);
  //       if (that.NotifyMessage) {
  //         Vue.prototype.$notify({
  //           title: "通知",
  //           message: that.NotifyMessage,
  //           type: "warning",
  //           // position: 'top-left',
  //           duration: 10000
  //         });
  //       }
  //     };
  //   },
  // },

  // watch: {
  //   $route(to) {
  //     if (!to.meta.isHomePage) {
  //       ws.close()
  //     } else {
  //       this.startListen()
  //     }
  //   }
  // },
  // methods: {
  //   startListen() {
  //     if (!this.ws) {
  //       this.ws = new WebSocket("ws://10.11.42.203:8083/websocket/admin");
  //     }

  //     ws.onmessage = function(evt) {
  //       this.$notify({
  //         title: '提示',
  //         message: "全局通知",
  //         duration: 0
  //       })
  //     }
  //   }
  // },
};
</script>
