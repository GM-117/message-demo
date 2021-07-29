<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
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
  //       this.ws = new WebSocket("wss://echo.websocket.org");
  //     }

  //     ws.onmessage = function(evt) {
  //       this.$notify({
  //         title: '提示',
  //         message: evt.data,
  //         duration: 0
  //       })
  //     }   
  //   }
  // },
}
</script>
