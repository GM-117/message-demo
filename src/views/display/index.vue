<template>
  <div class="app-container">
    <div class="select_button">
      <el-form size="mini" :inline="true">
        <el-form-item>
          <el-button type="primary" @click="B_search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="B_reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="select_input">
      <el-form :inline="true" label-width="80px" size="mini">
        <el-form-item label="工单主题">
          <el-input v-model="formData.theme" placeholder="请输入工单主题" clearable></el-input>
        </el-form-item>
        <el-form-item label="编号" size="mini">
          <el-input v-model="formData.id" placeholder="请输入编号" clearable></el-input>
        </el-form-item>
        <el-form-item label="受理人" size="mini">
          <el-select v-model="formData.accepted" placeholder="请选择">
            <el-option label="admin" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" size="mini">
          <el-select v-model="formData.status.value" placeholder="请选择">
            <el-option label="未处理" value="0"></el-option>
            <el-option label="处理中" value="1"></el-option>
            <el-option label="已完成" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建人" size="mini">
          <el-select v-model="formData.founder.value" placeholder="请选择">
            <el-option label="管理员" value="0"></el-option>
            <el-option label="用户" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="优先级" size="mini">
          <el-select v-model="formData.priority.value" placeholder="请选择">
            <el-option label="高" value="0"></el-option>
            <el-option label="中" value="1"></el-option>
            <el-option label="低" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建方式" size="mini">
          <el-select v-model="formData.createWay" placeholder="请选择">
            <el-option label="自动创建" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间" size="mini">
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
      <el-button size="small" :loading="buttonLoading" type="primary"
        >新建</el-button
      >
      <el-button size="small" :loading="buttonLoading" type="danger"
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
    >
      <el-table-column type="selection" class="select"> </el-table-column>
      <el-table-column label="编号" width="95" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="处置动作" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工单主题" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
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
      <el-table-column label="受理人" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="创建时间"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="创建时间" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column> -->
      <el-table-column label="创建方式" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="80">
        <template>
          <el-button type="text" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from "@/api/table";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      formData: {
        theme: "",
        id: "",
        accepted: "",
        status: {
          value: "",
        },
        founder: {
          value: "",
        },
        priority: {
          value: "",
        },
        createWay: "",
        createTime:""
      },
      list: null,
      listLoading: true,
      buttonLoading: false,
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
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    B_search() {
      console.log("search");
      console.log(this.formData);
    },
    B_reset() {
      console.log("reset");
    },
  },
};
</script>
<style scoped>
.operator_button {
  margin-bottom: 10px;
}
.el-input {
  width: 178px;
}
.select_input {
  width: 95%;
}
.select_button {
  width: 150px;
  float: right;
}
</style>
