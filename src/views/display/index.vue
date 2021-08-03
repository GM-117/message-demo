<template>
  <div class="app-container">
    <div class="select_button">
      <el-form size="mini" :inline="true">
        <el-form-item>
          <el-button
            type="primary"
            plain
            icon="el-icon-search"
            @click="Btn_search(formData)"
            >查询</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            plain
            icon="el-icon-refresh-left"
            @click="Btn_reset('formData')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="select_input">
      <el-form
        :inline="true"
        label-width="80px"
        size="mini"
        ref="formData"
      >
      <!-- :model="formData" -->
        <el-form-item prop="wid" label="编号" size="mini">
          <el-input
            v-model="formData.wid"
            placeholder="请输入编号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="topic" label="工单主题">
          <el-input
            v-model="formData.topic"
            placeholder="请输入工单主题"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="acceptor" label="受理人" size="mini">
          <el-input
            v-model="formData.acceptor"
            placeholder="请输入受理人"
            clearable
          ></el-input>
          <!-- <el-select v-model="formData.acceptor" placeholder="请选择">
            <el-option label="admin" value="0"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item prop="wstatus" label="状态" size="mini">
          <el-select v-model="formData.wstatus" placeholder="请选择">
            <el-option label="未处理" value="0"></el-option>
            <el-option label="处理中" value="1"></el-option>
            <el-option label="已完成" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="createName" label="创建人" size="mini">
          <el-select v-model="formData.createName" placeholder="请选择">
            <el-option label="系统管理员" value="系统管理员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="priority" label="优先级" size="mini">
          <el-select v-model="formData.priority" placeholder="请选择">
            <el-option label="高" value="1"></el-option>
            <el-option label="低" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="createMethod" label="创建方式" size="mini">
          <el-select v-model="formData.createMethod" placeholder="请选择">
            <el-option label="自动创建" value="0"></el-option>
            <el-option label="人工创建" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="createTime" label="创建时间" size="mini">
          <el-date-picker
            v-model="formData.createTime"
            type="date"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>

    <div class="operator_button">
      <el-button
        size="small"
        :loading="buttonLoading"
        type="primary"
        @click="jumpToAdd"
        icon="el-icon-plus"
        >添加</el-button
      >
      <el-button
        size="small"
        :loading="buttonLoading"
        type="danger"
        icon="el-icon-close"
        :disabled="multipleSelection.length === 0"
        @click="selectDelete"
        >删除</el-button
      >
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      height="500"
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" class="select"> </el-table-column>
      <el-table-column label="编号" width="95" align="center">
        <template slot-scope="scope">
          {{ scope.row.wid }}
        </template>
      </el-table-column>
      <el-table-column label="处置动作" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ handleTranslate(scope.row.handle)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="工单主题" align="center">
        <template slot-scope="scope">
          {{ scope.row.topic }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="状态"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.wstatus | statusFilter">
            {{wstatusTranslate(scope.row.wstatus)}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="优先级" align="center" width="70">
        <template slot-scope="scope">
          {{ scope.row.priority===1?'高' :'低' }}
        </template>
      </el-table-column>
      <el-table-column label="创建方式" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.createMethod === 1?'人工创建' : '自动创建'}}
        </template>
      </el-table-column>
      <el-table-column label="受理人" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.acceptor }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.createName }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="创建时间"
        width="170"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="创建时间" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column> -->

      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-button @click="handleDetail(scope.row)" type="text" size="small"
            >详情</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="handleDelete(scope.row)"
            style="color: #f56c6c"
            >移除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <detailDialog ref="detailDialog" @success="handleQuery" />
  </div>
</template>

<script>
import { getList, deleteById , deleteLists, getWork} from "@/api/table";
// import {getCpuInfo ,getWebsocket} from "@/api/cpuInfo"
import detailDialog from "./detailDialog.vue";

export default {
  components: {
    detailDialog,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: "success",
        1: "gray",
        2: "danger",
        3: "warning",
        4:"info"
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      formData: {
        wid: "",
        topic: "",
        acceptor: "",
        wstatus: "",
        createName: "",
        priority: "",
        createMethod: "",
        createTime: "",
      },
      list: [],
      listLoading: true,
      buttonLoading: false,
      multipleSelection: [],
    };
  },
  created() {
    this.fetchData();
    // this.getData();
  },
  // mounted() {
  //   this.getList()
  // },
  methods: {
    handleTranslate(num){
      if(num===0){
        return "请处理"
      }else if(num==1){
        return "请审批"
      }else if(num==2){
        return "请审核"
      }else if(num==3){
        return "请补休"
      }else if(num==4){
        return "请查杀"
      }else if(num==5){
        return "请验证"
      }else{
        return "请测试"
      }
    },
    wstatusTranslate(num){
      if(num===0){
        return "未处理"
      }else if(num==1){
        return "处理中"
      }else if(num==2){
        return "已解决"
      }else if(num==3){
        return "已指派"
      }else{
        return "已关闭"
      }
    },
    fetchData() {
      this.listLoading = true;
      getList().then((response) => {
        console.log(response.data.list);
        this.list = response.data.list;
        this.listLoading = false;
      });
    },
    getData() {
      // addUserSettings({user_id:777,work_service:511})
      changeBasicSettings({basic_service:7,user_id:777})
      changeMonitorSettings({monitor_service:7,user_id:777})
      changeWorkSettings({user_id:777, work_service: 7})
      
      getUser().then((res)=>{
        console.log(res)
      })

    },
    jumpToAdd() {
      this.$router.push("/order/add");
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    selectDelete() {
      this.$confirm("是否删除选中内容", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async() => {
        const list=this.multipleSelection.map((item)=>item.wid)
        const res=await deleteLists({list})
        console.log(list)
        this.fetchData()
          // for (let i = this.list.length - 1; i >= 0; i--) {
          //   let Data = this.list[i];
          //   const hasData = this.multipleSelection.find(
          //     (index) => index.id === Data.id
          //   );
          //   // console.log(hasData)
          //   if (hasData) {
          //     this.list.splice(i, 1);
          //   }
          // }
        this.$message({
          type: "success",
          message: res.message
        }).catch(() => {
          console.log("取消成功")
        });
      })
    },
    handleDelete(row) {
      console.log(row);
      this.$confirm("此操作将删除本条内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await deleteById({ wid: row.wid })
        console.log(row.wid)
        this.fetchData()
        this.$message({
          type: "success",
          message: res.message,
        });
      }).catch(() => {
          console.log("取消成功")          
      });
    },
    handleQuery(){
      this.fetchData()
    },
    async Btn_search(data) {
      console.log(data);
      if (data === '') {
          this.getList()
          return
      }
      const res = await getWork(data)
      console.log(res.data.records)
      //当返回的数据是数组的时候，判断返回数组的长度是不是0来弹窗
      if (res.data.records.length === 0) {
          this.$message({
            type: 'error',
            message: "该用户不存在！"
          })
        }else{
          //因为查询单条消息的时候后端返回的是一条数据对象，需要加一个[]转换成数据展示（tableDate是数组类型）
          this.$message({
          type: 'success',
          message: res.message
        })
        this.list =res.data.records
        }
      // if(this.formData.theme == ""){
      //   this.$message({
      //     message: '请查询必选项',
      //     type: 'warning'
      //   });
      // }
    },
    Btn_reset(formName) {
      this.$refs[formName].resetFields();
      this.$message("重置成功");
    },
    handleDetail(data) {
      console.log(data);
      this.$refs["detailDialog"].open({
        data,
        isDetail: true,
      });
    },
  },
};
</script>
<style scoped>
.operator_button {
  margin: 10px 0;
}
.el-input {
  width: 178px;
}
.el-select {
  width: 178px;
}
.select_input {
  width: 95%;
}
.select_button {
  width: 170px;
  float: right;
}
</style>
