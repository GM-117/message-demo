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
      <el-table-column fixed prop="uid" label="用户ID" align="center"> </el-table-column>
      <el-table-column prop="username" label="用户名" align="center"> </el-table-column>
      <el-table-column prop="gender" label="性别" align="center">
        <template slot-scope="{row}">
          <div>
            {{ row.gender === 1 ? '男' : '女' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="telephone" label="电话" align="center"> </el-table-column>
      <el-table-column prop="email" label="邮箱" align="center"> </el-table-column>
      <el-table-column prop="createTime" label="创建日期" align="center"> </el-table-column>
      <el-table-column prop="updateTime" label="更新日期" align="center"> </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row)" style="color: #F56C6C;">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-dialog ref="add-dialog" @success="handleQuery"/>
  </div>
</template>

<script>
  import AddDialog from './add-dialog.vue'
  import { queryUserAll, deleteOneUser, deleteAllUser} from '@/api/user'

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
        tableData: [],
      };
    },
    mounted() {
      this.handleQuery()
    },
    methods: {
      async handleQuery() {
        const res = await queryUserAll()
        this.tableData = res.data.data
        console.log(res.data.data)
      },
      // 将选中行的全部数据传入该方法，可以用map高阶函数打印id查看
      handleSelectionChange(val) {
        console.log(val.map((item) => item.id))
        this.multipleSelection = val
        console.log(val)
      },
      handleEdit(data) {
        console.log(data)
        this.$refs['add-dialog'].open({
          data, //将该行数据传入到open方法中
          isEdit: true
        })
      },
      handleDelete(row) {
        console.log(row)
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          //在这里删除选中行的数据并传回给后端剩余的数据数组
          // rows.splice(index, 1)
          // const ids = this.multipleSelection.map((item) => item.id)
          // console.log(ids)
          // TODO 在这个地方调用后端delete接口，删除成后刷新列表
          const res = await deleteOneUser({ uid: row.uid })
          this.handleQuery();
          this.$message({
            type: 'success',
            message: res.message
          })
        })
      },
      selectDelete(){
        this.$confirm('此操作将永久删除选中的用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async() => {
          const ids=this.multipleSelection.map((item)=>item.uid)
          //将数组ids转化成ids=1,2,3
          const res= await deleteAllUser({ids:ids.join(',')})
          this.handleQuery();
          // 假数据时使用的循环删除方法：这里循环整个表格的数据，从最后一行开始取出对应的id与选中的行数据中的id进行对比，遇到相等就在表格中移除
          // for (let index = this.tableData.length - 1; index >= 0; index--) {
          //     const data = this.tableData[index]
          //     const hasData = this.multipleSelection.find((item) => item.id === data.id)
          //     if (hasData) {
          //       this.tableData.splice(index, 1)
          //     }
          // }
          this.$message({
            type: 'success',
            message: res.message
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