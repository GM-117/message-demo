<template>
  <div class="formTabel">
    <Delete></Delete>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 100%"
      fit="true"
    >
      <el-table-column type="selection"> </el-table-column>
      <el-table-column fixed prop="id" label="用户id"> </el-table-column>
      <el-table-column prop="name" label="用户名"> </el-table-column>
      <el-table-column prop="sexy" label="性别"> </el-table-column>
      <el-table-column prop="call" label="电话"> </el-table-column>
      <el-table-column prop="address" label="邮箱"> </el-table-column>
      <el-table-column prop="date" label="创建日期"> </el-table-column>
      <el-table-column prop="date1" label="更新日期"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Delete from "./delete.vue";

export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
  },
  data() {
    return {
      tableData: [
        {
          id: "001",
          name: "王小虎",
          sexy: "男",
          call: "15255669988",
          address: "1111111@qq.com",
          date: "2021-07-27",
          date1: "2021-07-27",
        },
        {
          id: "002",
          name: "王小虎",
          sexy: "男",
          call: "15255669918",
          address: "1111111@qq.com",
          date: "2021-07-27",
          date1: "2021-07-27",
        },
        {
          id: "003",
          name: "王小虎",
          sexy: "男",
          call: "15255669998",
          address: "1111111@qq.com",
          date: "2021-07-27",
          date1: "2021-07-27",
        },
        {
          id: "004",
          name: "王小虎",
          sexy: "女",
          call: "15255662288",
          address: "1111111@qq.com",
          date: "2021-07-27",
          date1: "2021-07-27",
        },
      ],
    };
  },
  components: {
    Delete,
  },
  // methods:{
  //   toggleSelection(rows) {
  //     if (rows) {
  //       rows.forEach(row => {
  //         this.$refs.multipleTable.toggleRowSelection(row);
  //       });
  //     } else {
  //       this.$refs.multipleTable.clearSelection();
  //     }
  //   }
  // }
};
</script>

<!-- <style scoped>
.line{
  text-align: center;
}
</style> -->

