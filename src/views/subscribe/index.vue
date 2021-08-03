<template>
  <div class="readSelect">
    <!-- <el-button type="primary" icon="el-icon-search" class="isearch" @click="handle">搜索</el-button> -->
    <!-- type="1"这样赋值是字符串1，:type="0"这样赋值是整型！！利用type对不同使用的组件进行分类 -->
    <Card :firstData="first" v-model="data1" :type="1" :cities="ccityOptions" ref="a" @change="handlePost"></Card>
    <Card :firstData="sec" v-model="data2" :type="2" :cities="ccityOptions1" ref="b" @change="handlePost"></Card>
    <Card :firstData="third" v-model="data3" :type="3" :cities="ccityOptions2" ref="c" @change="handlePost"></Card>
  </div>
</template>

<script>
  import Card from './card.vue'
  import {changeBasicSettings , checkSettings} from "@/api/save"//这里是连接后端传送value的接口

  export default {
    data() {
      return {
        data1: [],//因为没接口，先写死已选定的数据返回的value
        data2: [],
        data3: [],
        first:"基础服务通知",
        sec:"监控服务通知",
        third:"工单服务通知",
        ccityOptions: [
          {
            value: 1,
            name: '新增用户'
          },{
            value: 2,
            name: '修改用户信息'
          },{
            value: 3,
            name: '删除用户'
          },{
            value: 4,
            name: '批量删除用户'
          },{
            value: 5,
            name: '用户服务'
          },{
            value: 6,
            name: '用户计划'
          },{
            value: 7,
            name:'用户来源'
          },{
            value: 8,
            name:'用户请求'
          },{
            value: 9,
            name:'物联网扩展'
          }
        ],
        ccityOptions1: [
          {
            value: 11,
            name: 'CPU预警'
          },{
            value: 12,
            name: '内存预警'
          },{
            value: 13,
            name: '磁盘预警'
          },{
            value: 14,
            name: '微服务健康检测'
          },{
            value: 15,
            name: '微服务离线检测'
          },{
            value: 16,
            name: '微服务上线检测'
          },{
            value: 17,
            name:'微服务异常检测'
          },{
            value: 18,
            name:'微服务检测启动'
          },{
            value: 19,
            name:'磁盘检测启动'
          }
        ],
        ccityOptions2: [
          {
            value: 21,
            name: '工单服务开启'
          },{
            value: 22,
            name: '工单新增'
          },{
            value: 23,
            name: '工单处理'
          },{
            value: 24,
            name: '工单修改'
          },{
            value: 25,
            name: '工单新状态'
          },{
            value: 26,
            name: '工单删除'
          },{
            value: 27,
            name:'工单改变'
          },{
            value: 28,
            name:'工单模块处理'
          },{
            value: 29,
            name:'物联网工单'
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
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData(){
        await checkSettings().then((response) => {
          console.log(response.data.list);
          this.data1 = response.data.Map.basic;
          this.data2 = response.data.Map.moniter;
          this.data3 = response.data.Map.work;
          console.log(this.data1)
          this.listLoading = false;
        });
      },
      async handlePost(obj){
        const user_id=0
        console.log('card data change', obj)
          // todo 发送请求
          
        const res = await changeBasicSettings({basic_service:obj.city.join(","),type: obj.type})//异步等待后端返回result（将已选中的按钮的value传出去）
        this.$message({
          type: 'success',
          message: res.message
        })
        this.fetchData()
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