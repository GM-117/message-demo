<template>
  <div class="formTable">
    <div class="select-bar">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formInline.user" placeholder="用户id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="selectSubmit" size="small" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-operator-bar">
      <el-button @click="handleAdd" type="primary" size="small" icon="el-icon-plus">添加</el-button>
      <el-button @click="selectDelete" type="danger" :disabled="multipleSelection.length === 0" size="small" icon="el-icon-close">删除</el-button>
    </div>
    <!-- 下面监听的selection-change方法是固定写法，当选择改变就触发方法 -->
    <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width: 950%;margin: auto;" :fit="true" stripe
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" class="select" > </el-table-column>
      <el-table-column fixed prop="id" label="用户id" align="center"> </el-table-column>
      <el-table-column prop="name" label="用户名" align="center"> </el-table-column>
      <el-table-column prop="sexy" label="性别" align="center"> </el-table-column>
      <el-table-column prop="call" label="电话" align="center"> </el-table-column>
      <el-table-column prop="mail" label="邮箱" align="center"> </el-table-column>
      <el-table-column prop="firstDate" label="创建日期" align="center"> </el-table-column>
      <el-table-column prop="updateDate" label="更新日期" align="center"> </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.$index,tableData)" style="color: #F56C6C;">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-dialog ref="add-dialog" @success="handleQuery" />
  </div>
</template>

<script>
  import AddDialog from './add-dialog.vue'

  export default {
    components: {
      AddDialog
    },
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        multipleSelection: [],
        tableData: [
          {
            id: "001",
            name: "王小虎1",
            sexy: "男",
            call: "15255669988",
            mail: "1111111@qq.com",
            firstDate: "2021-07-27",
            updateDate: "2021-07-27",
          },
          {
            id: "002",
            name: "王小虎2",
            sexy: "女",
            call: "15255669918",
            mail: "1111111@qq.com",
            firstDate: "2021-07-27",
            updateDate: "2021-07-27",
          },
          {
            id: "003",
            name: "王小虎3",
            sexy: "女",
            call: "15255669998",
            mail: "1111111@qq.com",
            firstDate: "2021-07-27",
            updateDate: "2021-07-27",
          },
          {
            id: "004",
            name: "王小虎4",
            sexy: "男",
            call: "15255662288",
            mail: "1111111@qq.com",
            firstDate: "2021-07-27",
            updateDate: "2021-07-27",
          },
        ],
      };
    },
    methods: {
      // 将选中行的全部数据传入该方法，可以用map高阶函数打印id查看
      handleSelectionChange(val) {
        console.log(val.map((item) => item.id))
        this.multipleSelection = val
      },
      handleQuery() {
        this.tableData.unshift({
          id: "0040",
          name: "王小虎add",
          sexy: "男",
          call: "15255662288",
          mail: "1111111@qq.com",
          firstDate: "2021-07-27",
          updateDate: "2021-07-27",
        })
      },
      handleEdit(data) {
        console.log(data)
        this.$refs['add-dialog'].open({
          data, //将该行数据传入到open方法中
          isEdit: true
        })
      },
      handleDelete(index,rows) {
        console.log(rows)
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //在这里删除选中行的数据并传回给后端剩余的数据数组
          rows.splice(index, 1)
          // const ids = this.multipleSelection.map((item) => item.id)
          // console.log(ids)
          console.log(rows)
          // TODO 在这个地方调用后端delete接口，删除成后刷新列表
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      selectDelete(){
        this.$confirm('此操作将永久删除选中的用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            // 这里循环整个表格的数据，从最后一行开始取出对应的id与选中的行数据中的id进行对比，遇到相等就在表格中移除
          for (let index = this.tableData.length - 1; index >= 0; index--) {
              const data = this.tableData[index]
              const hasData = this.multipleSelection.find((item) => item.id === data.id)
              if (hasData) {
                this.tableData.splice(index, 1)
              }
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })

        
      },
      handleAdd() {
        this.$refs['add-dialog'].open()
      },
      selectSubmit() {
        console.log('submit!');
      }
      //   toggleSelection(rows) {
      //     if (rows) {
      //       rows.forEach(row => {
      //         this.$refs.multipleTable.toggleRowSelection(row);
      //       });
      //     } else {
      //       this.$refs.multipleTable.clearSelection();
      //     }
      //   }
    }
  };
</script>
<style scoped>
  .formTable {
    padding: 16px;
  }
  .table-operator-bar {
    padding: 16px 0;
  }
  
</style>