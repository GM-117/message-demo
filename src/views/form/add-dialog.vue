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
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sexy" >
        <el-radio-group v-model="form.sexy">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电话" prop="call">
        <el-input v-model="form.call"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="mail">
        <el-input v-model="form.mail"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="firstDate">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.firstDate" style="width: 100%"></el-date-picker>
      </el-form-item>
      <el-form-item label="更新时间" prop="updateDate">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.updateDate" style="width: 100%"></el-date-picker>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="loading" @click="handleSubmit" icon="el-icon-check">确 定</el-button>
      <el-button @click="close" icon="el-icon-close">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        loading: false,
        form: {
          name: '',
          sexy: 1,
          call:'',
          mail:'',
          firstDate:'',
          updateDate:''
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          sexy: [
            { required: true, message: '请选择性别', trigger: 'blur' }
          ],
          call: [
            { required: true, message: '请填写电话', trigger: 'blur' }
          ],
          mail:[
            { required: true, message: '请填写邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          firstDate:[
            { required: true, message: '请选择日期', trigger: 'blur' }
          ],
          updateDate:[
            { required: true, message: '请选择日期', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      async open(params = {}){
        this.dialogVisible = true
        await this.$nextTick()
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
        // 通过JONSparse JSON.stringify方法克隆一份数据
        const cloneData = JSON.parse(JSON.stringify(data))
        console.log(cloneData)
        // 将无效数据转为指定类型的数据
        cloneData.sexy = cloneData.sexy === '男' ? 1 : 0
        // cloneData.name = cloneData.name
        this.form = cloneData
      },
      handleSubmit() {
        // validate在这里对表单做校验，校验成功才会提交
        this.$refs.form.validate((vali) => {
          if (vali) {
            console.log(this.form)
            this.loading = true
            setTimeout(() => {
              this.loading = false
              this.$emit('success')
              this.close()
            }, 2000)
          } else{
            console.log('error submit!!');
            return false;
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