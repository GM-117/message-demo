<template>
  <div>
    <el-row :gutter="12" style="height: 80%;width: 80%;margin:50px auto;">
      <!-- <el-col :span="11"> -->
        <el-card shadow="always">
          <el-form style="margin: 0 auto;width: 520px;margin-top: 50px;height: 800px;" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="主题：" prop="topic">
              <el-input v-model="ruleForm.topic"></el-input>
            </el-form-item>
            <el-form-item label="创建人：" prop="createName">
              <el-select v-model="ruleForm.createName" placeholder="请选择活动区域">
                <el-option label="系统管理员" value="系统管理员"></el-option>
                <el-option label="普通用户" value="普通用户"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="处理动作：" prop="handle">
              <el-select v-model="ruleForm.handle" placeholder="请选择处理动作">
                <el-option label="请处理" value="0"></el-option>
                <el-option label="请审批" value="1"></el-option>
                <el-option label="请审核" value="2"></el-option>
                <el-option label="请补休" value="3"></el-option>
                <el-option label="请查杀" value="4"></el-option>
                <el-option label="请验证" value="5"></el-option>
                <el-option label="请测试" value="6"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="受理人：" prop="acceptor">
                <!-- <el-input v-model="ruleForm.acceptor"></el-input> -->
                <el-select v-model="ruleForm.acceptor" placeholder="请选择受理人">
                  <el-option label="王超" value="王超"></el-option>
                  <el-option label="高萌" value="高萌"></el-option>
                  <el-option label="谢明利" value="谢明利"></el-option>
                  <el-option label="万振弘" value="万振弘"></el-option>
                  <el-option label="陈前程" value="陈前程"></el-option>
                  <el-option label="秦心玥" value="秦心玥"></el-option>
                  <el-option label="景亦辰" value="景亦辰"></el-option>
                </el-select>
              </el-form-item>
            </el-form-item>
            <el-form-item label="优先级：" prop="priority">
              <el-radio-group v-model="ruleForm.priority">
                <!-- 单选框传值是用label进行的，和下拉框的value传值不一样 -->
                <el-radio label="0" >低级</el-radio>
                <el-radio label="1" >高级</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="详情：" prop="wdescribe">
              <el-input type="textarea" v-model="ruleForm.wdescribe"></el-input>
            </el-form-item>
            <el-card shadow="never" class="file">
              <!-- 上传文件后，调用action连接后端文档上传地址，当文件上传成功之后接收到后端返回的response，里面的success为true再触发:on-success的钩子函数 -->
              <el-upload class="upload-demo" action="http://10.11.47.209:8084/workservice/ossfile" :on-success="handleSuccess"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-card>
            <el-form-item style="margin-top: 50px;">
              <el-button type="primary" @click="submitForm" :plain="true" icon="el-icon-s-claim">立即添加</el-button>
              <el-button @click="resetForm('ruleForm')" icon="el-icon-refresh-left">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      <!-- </el-col> -->
    </el-row>
  </div>
</template>

<script>
  import {createWork } from "@/api/table";

  export default {
    data() {
      return {
        fileList: [],
        ruleForm: {
          topic: '',
          createName: '',
          handle: '',
          acceptor: '',
          priority:'',
          wdescribe: '',
          oosUrl:''
        },
        rules: {
          topic: [
            { required: true, message: '请输入主题', trigger: 'blur' },
            { min: 3,  message: '长度至少3个字符', trigger: 'blur' }
          ],
          createName: [
            { required: true, message: '请输入创建人', trigger: 'change' }
          ],
          handle: [
            { required: true, message: '请选择处理动作', trigger: 'change' }
          ],
          acceptor:[
            { required: true, message: '请选择受理人', trigger: 'change' }
          ],
          priority:[
            { required: true, message: '请至少选择一个优先级', trigger: 'change' }
          ],
          wdescribe:[
            { required: true, message: '请输入内容', trigger: 'blur' },
            { min: 3,  message: '长度至少3个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 该函数将接收到后端返回的response存为res,再将res里面的data里面的url绑定到表单的存文件的字段上
      handleSuccess(res, file, fileList) {
        console.log(res,this.file,this.fileList)
        // this.fileList = fileList.slice(-3);
        this.ruleForm.oosUrl=res.data.url
      },
      jumpToAdd() {
        this.$router.push("/order/display");
      },
      submitForm() {
        // validate在这里对表单做校验，校验成功才会提交
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            //打印可以看到点击创建按钮之后传入的整个表单数据数组
            console.log(this.ruleForm)
            const res = createWork(this.ruleForm)

              // this.$emit('success')//先不发送这个成功消息给后端
              this.$message({
                // showClose: true,
                message: '恭喜你，添加成功！',
                type: 'success'
              });
              this.jumpToAdd();
          } 
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$message({
          // showClose: true,
          message: '重置成功'
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
  .file{
    margin: auto;
  }
</style>
