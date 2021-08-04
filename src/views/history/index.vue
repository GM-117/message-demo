<template>
  <div>
    <el-row>
      <div class="block">
        <span class="demonstration">请输入查询日期：</span>
        <el-date-picker v-model="date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
          @change="handleDateChange">
        </el-date-picker>
      </div>
      <div class="block1">
        <!-- <el-button type="danger" icon="el-icon-delete" circle @click="deleteAll(tableData)"></el-button>
        <span style="padding: 40px 10px;"> </span> -->
        <el-button type="danger" @click="wdeleteAll" size="small" icon="el-icon-delete el-icon--right"> 一键清空</el-button>
      </div>
      <div class="block2">
        <el-button type="primary" @click="selectAll" size="small" icon="el-icon-search el-icon--right"> 查询所有</el-button>
      </div>
    </el-row>
    <div class="table-box">
      <el-table :data="tableData" style="width: 100%" max-height="500" :fit="true" stripe border v-loading="listLoading">
        <el-table-column prop="message_id" label="消息ID" align="center">
        </el-table-column>
        <el-table-column prop="time" label="推送时间" align="center">
        </el-table-column>
        <el-table-column prop="name" label="消息名称" align="center">
        </el-table-column>
        <el-table-column prop="type" label="消息类型" align="center">
        </el-table-column>
        <el-table-column prop="detail" label="消息详情" align="center">
        </el-table-column>
        <el-table-column label="操作" style="text-align: center;" align="center">
          <template slot-scope="scope">
            <!-- 这里的scope.$index表示该行的表格序号（很重要） -->
            <!-- <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small"> -->
            <el-button @click.native.prevent="deleteRow(scope.row)" type="text" size="small">
            移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script>
  import { getAllMessage ,deleteOne ,getMessageByCondition,deleteAll} from "@/api/history";
  import { formatDateTime } from '@/utils/index.js'
  export default {
    created() {
      this.fetchData();
    },
    methods: {
      selectAll(){
        this.fetchData();
      },
      async fetchData() {
        this.listLoading = true;
        await getAllMessage().then((response) => {
          console.log(response.data.list);
          this.tableData = response.data.list;
          this.tableData.forEach(element => {
            element.time = formatDateTime(element.time)
          });
          this.listLoading = false;
        });
      },
      handleDateChange(val){
        {
          if (!val) {
            this.fetchData()
          } else {
            this.listLoading = true;
            getMessageByCondition({ start_time: this.date }).then((response) => {
              this.tableData = response.data.list;
              this.tableData.forEach(element => {
                element.time = formatDateTime(element.time)
              });
              this.listLoading = false;
            });
          }
        }
        // // TODO 当日期改变时候，将date值通过接口传递给后端
        // const res = getMessageByCondition({start_time : this.date})
        // this.tableData = res.data
        // console.log(this.date)
      },
      deleteRow(rows) {
        console.log(rows);
        this.$confirm("此操作将删除本条内容, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          const res = await deleteOne({message_id: rows.message_id})
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.fetchData()
        }).catch(() => {
          console.log("取消成功")
        });
      },
      // console.log(rows)
      // this.$confirm('此操作将永久删除本条消息, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   rows.splice(index, 1)
      //   this.$message({
      //     type: 'success',
      //     message: '删除成功!'
      //   });
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   });          
      // });
    
    wdeleteAll() {
      this.$confirm('此操作将永久删除所有历史消息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        console.log(this.data)
        const res= await deleteAll({date:this.date})
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.handleDateChange(this.date)
      }).catch(() => {
          console.log("取消成功")
      });
    }
  },
  data() {
    return {
      listLoading:null,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      date: '',
      // tableData:[]
      tableData: []
    }
  }
  }
</script>

<style scoped>
  .table-box {
    padding: 16px !important;
  }

  .block {
    /* float: left; */
    margin: 20px 20px;
  }

  .block1 {
    float: left;
    margin: 20px 20px;
  }
  .block2{
    float: left;
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