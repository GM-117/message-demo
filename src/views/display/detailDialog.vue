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
        <el-form-item label="编号" prop="id">
          <el-input v-model="form.id" :disabled="disableControl" maxlength="18" show-word-limit></el-input>
        </el-form-item>

        <el-form-item label="处置动作" prop="action">
          <el-select v-model="form.action" :disabled="disableControl">
            <el-option label="请处理" value="0"></el-option>
            <el-option label="请审批" value="1"></el-option>
            <el-option label="请审核" value="2"></el-option>
            <el-option label="请测试" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="工单主题" prop="theme">
          <el-input v-model="form.theme" :disabled="disableControl"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" :disabled="disableControl">
            <el-option label="未处理" value="0"></el-option>
            <el-option label="处理中" value="1"></el-option>
            <el-option label="已完成" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="优先级" prop="priority">
          <el-select v-model="form.priority" :disabled="disableControl">
            <el-option label="高" value="0"></el-option>
            <el-option label="中" value="1"></el-option>
            <el-option label="低" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="创建方式" prop="createWay">
          <el-select v-model="form.createWay" :disabled="disableControl">
            <el-option label="人工创建" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="受理人" prop="accepted">
          <el-select v-model="form.accepted" :disabled="disableControl">
            <el-option label="admin" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="创建人" prop="founder">
          <el-select v-model="form.founder" :disabled="disableControl">
            <el-option label="管理员" value="0"></el-option>
            <el-option label="普通用户" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="创建时间" prop="createTime">
          <el-input v-model="form.createTime" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" :disabled="true">
        <el-button size="small" @click="close">取 消</el-button>
        <el-button size="small" @click="Btn_confirm" type="primary"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      disableControl: true,
      form: {
        id: "",
        action: "",
        theme: "",
        status: "",
        priority: "",
        createWay: "",
        accepted: "",
        founder: "",
        createTime: "",
      },
    };
  },
  methods: {
    open(params = {}) {
      this.dialogVisible = true;
      // console.log(params.data)
      // await this.$nextTick()

      if (params.isDetail) {
        const data = Object.assign({}, params.data);
        // const cloneData = JSON.parse(JSON.stringify(params.data))
        console.log(data);
        this.form = data;
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
      console.log(this.form);
      this.dialogVisible = false;
    },
  },
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