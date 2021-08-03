<template>
  <div class="dialog-container">
    <el-dialog
      title="工单详情"
      :visible.sync="dialogVisible"
      @close="close"
      width="700px"
    >
      <el-button class="editBtn" type="text" @click="Btn_Edit">编辑</el-button>
      <el-form
        class="styleform"
        :model="form"
        ref="form"
        size="small"
        label-width="80px"
      >
        <el-form-item label="编号" prop="wid">
          <el-input v-model="form.wid" :disabled="disableControl" maxlength="18" show-word-limit></el-input>
        </el-form-item>

        <el-form-item label="处置动作" prop="handle">
          <el-select v-model="form.handle" :disabled="disableControl">
            <!-- 当传给表单的数据是整型时，用v-bind变成整型 -->
              <el-option label="请处理" :value="0"></el-option>
              <el-option label="请审批" :value="1"></el-option>
              <el-option label="请审核" :value="2"></el-option>
              <el-option label="请补休" :value="3"></el-option>
              <el-option label="请查杀" :value="4"></el-option>
              <el-option label="请验证" :value="5"></el-option>
              <el-option label="请测试" :value="6"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="工单主题" prop="topic">
          <el-input v-model="form.topic" :disabled="disableControl"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="wstatus">
          <el-select v-model="form.wstatus" :disabled="disableControl">
            <el-option label="未处理" :value="0"></el-option>
            <el-option label="处理中" :value="1"></el-option>
            <el-option label="已解决" :value="2"></el-option>
            <el-option label="已指派" :value="3"></el-option>
            <el-option label="已关闭" :value="4"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="优先级" prop="priority">
          <el-select v-model="form.priority" :disabled="disableControl">
            <el-option label="低" :value="0"></el-option>
            <el-option label="高" :value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="创建方式" prop="createMethod">
          <el-select v-model="form.createMethod" :disabled="disableControl">
            <el-option label="人工创建" :value="0"></el-option>
            <el-option label="自动创建" :value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="受理人" prop="acceptor">
          <el-input v-model="form.acceptor" :disabled="disableControl"></el-input>
        </el-form-item>

        <el-form-item label="创建人" prop="createName">
          <el-select v-model="form.createName" :disabled="disableControl">
            <el-option label="系统管理员" value="系统管理员"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="创建时间" prop="createTime">
          <el-input v-model="form.createTime" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" :disabled="true">
        <el-button size="small" @click="close">取 消</el-button>
        <el-button size="small" @click="Btn_confirm()" type="primary"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { updateWorkInfo ,getList} from "@/api/table";
export default {
  data() {
    return {
      dialogVisible: false,
      disableControl: true,
      form: {
        wid: "",
        handle: "",
        topic: "",
        wstatus: "",
        priority: "",
        createMethod: "",
        acceptor: "",
        createName: "",
        createTime: "",
      },
    };
  },
  methods: {
    // convert(value){
    //   switch(value){
    //     case 0:
    //       return '低'
    //     case 1:
    //       return '高'
    //   }
    // },
    // convert1(value){
    //   switch(value){
    //     case 0:
    //       return '人工创建'
    //     case 1:
    //       return '自动创建'
    //   }
    // },
    fetchData() {
      this.listLoading = true;
      getList().then((response) => {
        console.log(response.data.list);
        this.list = response.data.list;
        this.listLoading = false;
      });
    },
    open(params = {}) {
      this.dialogVisible = true;
      // console.log(params.data)
      // await this.$nextTick()
      if (params.isDetail) {
        const data = Object.assign({}, params.data);
        console.log(data)
        // data.handle = this.handleTranslate(data.handle)
        // data.priority = this.convert(data.priority)
        // data.wstatus = this.wstatusTranslate(data.wstatus)
        // data.createMethod = this.convert1(data.createMethod)
        this.form = data
        // const data = Object.assign({}, params.data);
        // // const cloneData = JSON.parse(JSON.stringify(params.data))
        // console.log(data);
        // this.form = data;
      }
    },
    Btn_Edit() {
      console.log(this.form);
      this.disableControl = false;
    },
    close() {
      this.dialogVisible = false;
      this.disableControl = true;
      // this.$refs.form.resetFields();
    },
    Btn_confirm() {
      this.$refs.form.validate(async (vali) => {
        // console.log(vali)
        if (vali) {
          const res =await updateWorkInfo(this.form)
          // getList()//有问题
          this.$message({
            showClose: true,
            message: '恭喜你，修改成功！',
            type: 'success'
          })
          console.log(this.form);
          this.dialogVisible = false;
          this.$emit('success')
        }else {
            console.log('error submit!!');
            return false;
          }
      })
    },
    // handleTranslate(num){
    //   if(num===0){
    //     return "请处理"
    //   }else if(num==1){
    //     return "请审批"
    //   }else if(num==2){
    //     return "请审核"
    //   }else if(num==3){
    //     return "请补休"
    //   }else if(num==4){
    //     return "请查杀"
    //   }else if(num==5){
    //     return "请验证"
    //   }else{
    //     return "请测试"
    //   }
    // },
    // wstatusTranslate(num){
    //   if(num===0){
    //     return "未处理"
    //   }else if(num==1){
    //     return "处理中"
    //   }else if(num==2){
    //     return "已解决"
    //   }else if(num==3){
    //     return "已指派"
    //   }else{
    //     return "已关闭"
    //   }
    // }
  }
};
</script>

<style scoped>
.dialog-container {
  position: relative;
}
.el-form {
  margin: 0 auto;
}
.el-input {
  width: 200px;
}
.styleform {
  width: 300px;
  margin: 0 auto;
}
.editBtn {
  position: absolute;
  top: 12px;
  left: 110px;
}
</style>