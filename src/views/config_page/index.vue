<template>
  <div>
    <el-row :gutter="12" style="height: 80%;width: 80%;margin:50px auto;">
      <!-- <el-col :span="11"> -->
        <el-card shadow="always">
          <el-form style="margin:50px auto;width: 500px;margin-top: 50px;" :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="cpu阈值：" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入cpu阈值">
              </el-input>
            </el-form-item>
            <el-form-item label="内存阈值：" prop="region">
              <el-input v-model="ruleForm.region" placeholder="请输入内存阈值">
              </el-input>
            </el-form-item>
            <el-form-item label="磁盘阈值：" prop="resolve">
              <el-input v-model="ruleForm.resolve" placeholder="请输入磁盘阈值">
              </el-input>
            </el-form-item>
            <el-form-item label="受理人：" prop="person">
              <el-input v-model="ruleForm.person">
              </el-input>
            </el-form-item>
            <el-form-item  label="优先级：" prop="priority">
              <el-input v-model="ruleForm.priority">
              </el-input>
            </el-form-item>
            <el-form-item label="详情：" prop="desc">
              <el-input v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" :plain="true" icon="el-icon-s-claim">保存</el-button>
              <el-button @click="resetForm('ruleForm')" icon="el-icon-refresh-left">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      <!-- </el-col> -->
    </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          resolve: '',
          person: '',
          priority:'',
          desc: ''
        },
        // rules: {
        //   name: [
        //     { required: true, message: '请输入主题', trigger: 'blur' },
        //   ],
        //   region: [
        //     { required: true, message: '请选择标签', trigger: 'change' }
        //   ],
        //   resolve: [
        //     { required: true, message: '请选择处理动作', trigger: 'change' }
        //   ],
        //   person:[
        //     { required: true, message: '请选择受理人', trigger: 'change' }
        //   ],
        //   priority:[
        //     { required: true, message: '请至少选择一个优先级', trigger: 'change' }
        //   ],
        //   desc:[
        //     { required: true, message: '请输入内容', trigger: 'blur' },
        //   ]
        // }
      }
    },
    methods: {
      submitForm(formName) {
        // validate在这里对表单做校验，校验成功才会提交
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            //打印可以看到点击创建按钮之后传入的整个表单数据数组
            console.log(this.formName)
            this.loading = true
            setTimeout(() => {
              this.loading = false
              // this.$emit('success')//先不发送这个成功消息给后端
              this.$message({
                showClose: true,
                message: '恭喜你，添加成功！',
                type: 'success'
              });
              this.close()
            }, 1000)
          } else {
            console.log('error submit!!');
            this.$message({
              showClose: true,
              message: '添加失败，请重试！',
              type: 'error'
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$message({
          showClose: true,
          message: '重置完成'
        });
      }
    }
  }
</script>
<style scoped>
  /* /deep/  */
  .el-form-item {
    margin-bottom: 50px;
  }
</style>