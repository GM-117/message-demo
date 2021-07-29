<template>
  <div>
    <el-row>
      <div class="block">
        <span class="demonstration">请输入查询日期：</span>
        <el-date-picker v-model="date"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        @change="handleDateChange"
        >
        </el-date-picker>
      </div>
      <div class="block1">
        <!-- <el-button type="danger" icon="el-icon-delete" circle @click="deleteAll(tableData)"></el-button>
        <span style="padding: 40px 10px;"> </span> -->
        <el-button type="danger" @click="deleteAll" size="small" icon="el-icon-delete el-icon--right"> 一键清空</el-button>
      </div>
    </el-row>
    <div class="table-box">
      <el-table :data="tableData" style="width: 100%" max-height="500" :fit="true">
        <el-table-column fixed prop="date" label="推送时间" >
        </el-table-column>
        <el-table-column prop="name" label="消息名称" >
        </el-table-column>
        <el-table-column prop="type" label="消息类型" >
        </el-table-column>
        <el-table-column prop="content" label="消息详情" >
        </el-table-column>
        <el-table-column fixed="right" label="操作" style="text-align: center;">
          <template slot-scope="scope">
            <!-- 这里的scope.$index表示该行的表格序号（很重要） -->
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      handleDateChange() {
        // TODO 当日期改变时候，将date值通过接口传递给后端
        console.log(this.date)
      },
      deleteRow(index, rows) {
        console.log(rows)
        this.$confirm('此操作将永久删除本条消息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rows.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      deleteAll(rows){
        this.$confirm('此操作将永久删除所有历史消息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData = []
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        date: '',
        tableData: [{
          date: '2021-07-03 10:10',
          name: '王小虎1',
          type:'已处理',
          content:'文本文档的具体内容通知',
        }, {
          date: '2021-07-03 11:00',
          name: '王小虎2',
          type:'已处理',
          content:'文本文档的具体内容通知',
        }, {
          date: '2021-07-03 12:00',
          name: '王小虎3',
          type:'已处理',
          content:'文本文档的具体内容通知',
        }, {
          date: '2021-07-03 13:12',
          name: '王小虎4',
          type:'已处理',
          content:'文本文档的具体内容通知',
        }, {
          date: '2021-07-03 13:22',
          name: '王小虎5',
          type:'已处理',
          content:'文本文档的具体内容通知',
        }, {
          date: '2021-07-03 14:02',
          name: '王小虎6',
          type:'已处理',
          content:'文本文档的具体内容通知',
        }, {
          date: '2021-07-03 14:00',
          name: '王小虎7',
          type:'已处理',
          content:'文本文档的具体内容通知',
        }]
      }
    }
  }
</script>

<style scoped>
  .table-box {
    padding: 16px!important;
  }
  .block {
    /* float: left; */
    margin: 20px 20px;
  }
  .block1 {
    /* float: left; */
    margin: 20px 20px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 1400px;
    height: 600px;
    margin: auto;
  }
</style>
<style scoped>
  .table-operator-bar {
    padding: 16px;
  }
</style>