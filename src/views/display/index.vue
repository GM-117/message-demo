<template>
  <div class="app-container">
    <div class="select_button">
      <el-form size="mini" :inline="true">
        <el-form-item>
          <el-button
            type="primary"
            plain
            icon="el-icon-search"
            @click="Btn_search"
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
        :model="formData"
        ref="formData"
      >
        <el-form-item prop="id" label="编号" size="mini">
          <el-input
            v-model="formData.id"
            placeholder="请输入编号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="theme" label="工单主题">
          <el-input
            v-model="formData.theme"
            placeholder="请输入工单主题"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="accepted" label="受理人" size="mini">
          <el-select v-model="formData.accepted" placeholder="请选择">
            <el-option label="admin" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="status" label="状态" size="mini">
          <el-select v-model="formData.status" placeholder="请选择">
            <el-option label="未处理" value="0"></el-option>
            <el-option label="处理中" value="1"></el-option>
            <el-option label="已完成" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="founder" label="创建人" size="mini">
          <el-select v-model="formData.founder" placeholder="请选择">
            <el-option label="管理员" value="0"></el-option>
            <el-option label="普通用户" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="priority" label="优先级" size="mini">
          <el-select v-model="formData.priority" placeholder="请选择">
            <el-option label="高" value="0"></el-option>
            <el-option label="中" value="1"></el-option>
            <el-option label="低" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="createWay" label="创建方式" size="mini">
          <el-select v-model="formData.createWay" placeholder="请选择">
            <el-option label="人工创建" value="0"></el-option>
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
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="处置动作" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.action }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工单主题" align="center">
        <template slot-scope="scope">
          {{ scope.row.theme }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="状态"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="优先级" align="center" width="70">
        <template slot-scope="scope">
          {{ scope.row.priority }}
        </template>
      </el-table-column>
      <el-table-column label="创建方式" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.createWay }}
        </template>
      </el-table-column>
      <el-table-column label="受理人" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.accepted }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.founder }}
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
            @click="handleDelete(scope.$index, list)"
            style="color: #f56c6c"
            >移除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <detailDialog ref="detailDialog" @success="handleQuery"/>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import detailDialog from "./detailDialog.vue";

export default {
  components: {
    detailDialog,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        已解决: "success",
        处理中: "gray",
        未处理: "danger",
        指派:"warning",
        已关闭:"info"
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      formData: {
        id: "",
        theme: "",
        accepted: "",
        status: "",
        founder: "",
        priority: "",
        createWay: "",
        createTime: "",
      },
      list: null,
      listLoading: true,
      buttonLoading: false,
      multipleSelection: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      console.log(getList());
      getList().then((response) => {
        console.log(response.data.items);
        this.list = response.data.items;
        this.listLoading = false;
      });
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
        type: "warning",
      })
        .then(() => {
          for (let i = this.list.length - 1; i >= 0; i--) {
            let Data = this.list[i];
            const hasData = this.multipleSelection.find(
              (index) => index.id === Data.id
            );
            // console.log(hasData)
            if (hasData) {
              this.list.splice(i, 1);
            }
          }
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleDelete(index, rows) {
      console.log(rows);
      this.$confirm("此操作将删除本条内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          rows.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleQuery(){
      console.log("index formdata"+this.formData.id)
    },
    Btn_search() {
      console.log(this.formData);
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
