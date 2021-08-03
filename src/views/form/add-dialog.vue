<template>
  <el-dialog 
    title="个人信息"
    :visible.sync="dialogVisible"
    width="35%"
    center

    @close="close">
    <el-form :model="form"
             :rules="rules"
             ref="form"
             label-width="100px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender" >
        <el-radio-group v-model="form.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电话" prop="telephone">
        <el-input v-model="form.telephone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.createTime" style="width: 100%"></el-date-picker>
      </el-form-item>
      <el-form-item label="更新时间" prop="updateTime">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.updateTime" style="width: 100%"></el-date-picker>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="loading" @click="handleSubmit" icon="el-icon-check">确 定</el-button>
      <el-button @click="close" icon="el-icon-close">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { saveUser,editUser } from '@/api/user'


  export default {
    data() {
      return {
        dialogVisible: false,
        loading: false,
        form: {
          id:'',
          username: '',
          gender: 1,
          telephone:'',
          email:'',
          createTime:'',
          updateTime:''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          gender: [
            { required: true, message: '请选择性别', trigger: 'blur' }
          ],
          telephone: [
            { required: true, message: '请填写电话', trigger: 'blur' }
          ],
          email:[
            { required: true, message: '请填写邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          createTime:[
            { required: true, message: '请选择日期', trigger: 'blur' }
          ],
          updateTime:[
            { required: true, message: '请选择日期', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      async open(params = {}){
        this.dialogVisible = true
        await this.$nextTick()
        this.isEdit = params.isEdit
        if (params.isEdit) {
          this.queryData(params.data)
        }
      },
      close() {
        this.dialogVisible = false
        this.resetForm()
      },
      resetForm() {
        this.$refs.form.resetFields()
        delete this.form.id
      },
      queryData(data) {
        // 通过JONSparse JSON.stringify方法克隆一份数据--因为数据做了绑定，这里必须要克隆处理
        const cloneData = JSON.parse(JSON.stringify(data))
        console.log(cloneData)
        // 将无效数据转为指定类型的数据
        cloneData.sexy = cloneData.sexy === '男' ? 1 : 0
        // cloneData.name = cloneData.name
        this.form = cloneData
      },
      handleSubmit() {
        const api = !this.isEdit ? saveUser : editUser
        // validate在这里对表单做校验，校验成功才会提交
        this.$refs.form.validate(async (vali) => {
          // const cloneVali = JSON.parse(JSON.stringify(vali))
          if (vali) {
            this.loading = true
            const res = await api(this.form)
            this.loading = false
            this.$emit('success')//这里将success事件传给父组件，父组件再将填入表单的值加到表格中
            this.$message({
              showClose: true,
              message: '恭喜你，保存成功！',
              type: 'success'
            })
            this.close()
          }
        })
      }
    }
  }
</script>

<style scoped>
  .formAdd{
    margin: 20px 10px;
  }
</style>