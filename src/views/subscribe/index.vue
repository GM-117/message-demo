<template>
  <div class="readSelect">
    <!-- <el-button type="primary" icon="el-icon-search" class="isearch" @click="handle">搜索</el-button> -->
    <Card :firstData="first" v-model="data1" :cities="ccityOptions" ref="a" @change="handlePost"></Card>
    <Card :firstData="sec" v-model="data2" :cities="ccityOptions1" ref="b" @change="handlePost"></Card>
    <Card :firstData="third" v-model="data3" :cities="ccityOptions2" ref="c" @change="handlePost"></Card>
    
  </div>
</template>

<script>
  import Card from './card.vue'
  import { save } from '@/api/subscription'//这里是连接后端传送value的接口

  export default {
    data() {
      return {
        data1: [1,2,3],//因为没接口，先写死已选定的数据返回的value
        data2: [10,12,13],
        data3: [19,20,21],
        first:"基础服务通知",
        sec:"监控服务通知",
        third:"工单服务通知",
        ccityOptions: [
          {
            value: 1,
            name: '主机健康服务'
          },{
            value: 2,
            name: 'CPU核心处理器'
          },{
            value: 3,
            name: 'RAM外置内存'
          },{
            value: 4,
            name: '服务器集成'
          },{
            value: 5,
            name: '客户端服务'
          },{
            value: 6,
            name: '未来计划'
          },{
            value: 7,
            name:'西部牛仔'
          },{
            value: 8,
            name:'中心服务'
          },{
            value: 9,
            name:'物联网旁支'
          }
        ],
        ccityOptions1: [
          {
            value: 10,
            name: '主机健康服务1'
          },{
            value: 11,
            name: 'CPU核心处理器1'
          },{
            value: 12,
            name: 'RAM外置内存1'
          },{
            value: 13,
            name: '服务器集成1'
          },{
            value: 14,
            name: '客户端服务1'
          },{
            value: 15,
            name: '未来计划1'
          },{
            value: 16,
            name:'西部牛仔1'
          },{
            value: 17,
            name:'中心服务1'
          },{
            value: 18,
            name:'物联网旁支1'
          }
        ],
        ccityOptions2: [
          {
            value: 19,
            name: '主机健康服务2'
          },{
            value: 20,
            name: 'CPU核心处理器2'
          },{
            value: 21,
            name: 'RAM外置内存2'
          },{
            value: 22,
            name: '服务器集成2'
          },{
            value: 23,
            name: '客户端服务2'
          },{
            value: 24,
            name: '未来计划2'
          },{
            value: 25,
            name:'西部牛仔2'
          },{
            value: 26,
            name:'中心服务2'
          },{
            value: 27,
            name:'物联网旁支2'
          }
        ]
        // ccityOptions:['主机健康服务', 'CPU核心处理器', 'RAM外置内存', '服务器集成','客户端服务','未来计划','西部牛仔','中心服务'],
        // ccityOptions1:['主机健康服务1', 'CPU核心处理器1', 'RAM外置内存1', '服务器集成1','客户端服务1','未来计划1','西部牛仔1','中心服务1'],
        // ccityOptions2:['主机健康服务2', 'CPU核心处理器2', 'RAM外置内存2', '服务器集成2','客户端服务2','未来计划2','西部牛仔2','中心服务2']
      }
    },
    components: {
      Card
    },
    methods: {
      async handlePost(val){
        console.log('card data change', val)
          // todo 发送请求
        const result = await save({ city: val })//异步等待后端返回result（将已选中的按钮的value传出去）
        this.$message({
          type: 'success',
          message: result.message
        })
      }
    },
  }
</script>

<style scoped>
  .isearch {
    padding: 12px;
    margin: 50px;
  }
</style>