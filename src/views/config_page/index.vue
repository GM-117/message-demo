<template>
  <div>
    <el-row style="height: 80%; width: 80%; margin: 50px auto">
      <el-card shadow="always">
        <el-form
          style="margin: 50px auto; width: 600px"
          :model="configForm"
          ref="configForm"
          :rules="rules"
          size="medium "
          label-width="200px"
        >
          <el-form-item label="cpu阈值：" prop="cpuThreshold">
            <el-input
              v-model="configForm.cpuThreshold"
              placeholder="请输入cpu阈值"
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item label="cpu检测时间段(单位秒)：" prop="cpuPeriod">
            <el-input
              v-model.number="configForm.cpuPeriod"
              placeholder="请输入cpu检测时间段"
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item label="内存阈值：" prop="memThreshold">
            <el-input
              v-model="configForm.memThreshold"
              placeholder="请输入内存阈值"
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item label="内存检测时间段(单位秒)：" prop="memPeriod">
            <el-input
              v-model.number="configForm.memPeriod"
              placeholder="请输入内存检测时间段"
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item label="磁盘阈值：" prop="diskThreshold">
            <el-input
              v-model="configForm.diskThreshold"
              placeholder="请输入磁盘阈值"
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item label="磁盘检测时间段(单位秒)：" prop="diskPeriod">
            <el-input
              v-model.number="configForm.diskPeriod"
              placeholder="请输入磁盘检测时间段"
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item label="监控检测刷新间隔(单位秒)：" prop="monRefresh">
            <el-input
              v-model.number="configForm.monRefresh"
              placeholder="请输入监控检测刷新间隔"
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('configForm')"
              :plain="true"
              icon="el-icon-s-claim"
              :loading="loading"
              >保存</el-button
            >
            <el-button
              @click="resetForm('configForm')"
              icon="el-icon-refresh-left"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { postConfig, getConfig } from "@/api/InfoDetail";
export default {
  data() {
    return {
      loading: false,
      configForm: {
        id: 0,
        cpuPeriod: 0,
        cpuThreshold: 0,
        diskPeriod: 0,
        diskThreshold: 0,
        memPeriod: 0,
        memThreshold: 0,
        monRefresh: 0,
      },
      ruleForm: {
        cpuPeriod: null,
        cpuThreshold: null,
        diskPeriod: null,
        diskThreshold: null,
        memPeriod: null,
        memThreshold: null,
        monRefresh: null,
      },
      rules: {
        cpuPeriod: [
          { required: true, message: "请输入大于1的整数" },
          { type: "number", message: "请输入整数" },
          {
            pattern: /^([1-9]|[1-9]\d|1\d\d|2[0-9]\d)$/,
            message: "数值大于1",
            trigger: "blur",
          },
        ],
        cpuThreshold: [
          {
            required: true,
            message: "请输入1-100值可包含两位小数",
          },
          {
            pattern: /^([1-9]|[1-9]\d|1\d\d)$/,
            message: "范围在1-100",
            trigger: "blur",
          },
        ],
        diskPeriod: [
          { required: true, message: "请输入大于1的整数"},
          { type: "number", message: "请输入整数" },
          {
            pattern: /^([1-9]|[1-9]\d|1\d\d|2[0-9]\d)$/,
            message: "数值大于1",
            trigger: "blur",
          },
        ],
        diskThreshold: [
          {
            required: true,
            message: "请输入1-100值可包含两位小数",
          },
          {
            pattern: /^([1-9]|[1-9]\d|1\d\d)$/,
            message: "范围在1-100",
            trigger: "blur",
          },
        ],
        memPeriod: [
          { required: true, message: "请输入大于1的整数"},
          { type: "number", message: "请输入整数" },
          {
            pattern: /^([1-9]|[1-9]\d|1\d\d|2[0-9]\d)$/,
            message: "数值大于1",
            trigger: "blur",
          },
        ],
        memThreshold: [
          {
            required: true,
            message: "请输入1-100值可包含两位小数",
          },
          {
            pattern: /^([1-9]|[1-9]\d|1\d\d)$/,
            message: "范围在1-100",
            trigger: "blur",
          },
        ],
        monRefresh: [
          { required: true, message: "请输入1-60整数"},
          { type: "number", message: "请输入整数" },
          {
            pattern: /^([1-9]|[1-5]\d|6[0-0])$/,
            message: "范围在1-60",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getConfigData();
  },
  methods: {
    getConfigData() {
      getConfig().then((res) => {
        console.log(res.data.sysConfigInfo);
        this.configForm = res.data.sysConfigInfo;
      });
    },
    submitForm(formName) {
      // validate在这里对表单做校验，校验成功才会提交
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          //打印可以看到点击创建按钮之后传入的整个表单数据数组
          console.log(this.configForm);
          this.loading = true;
          postConfig(this.configForm);
          setTimeout(() => {
            this.loading = false;
            // this.$emit('success')//先不发送这个成功消息给后端
            this.$message({
              showClose: true,
              message: "配置成功",
              type: "success",
            });
            // this.close();
          }, 1000);
        } else {
          console.log("error submit!!");
          this.$message({
            showClose: true,
            message: "配置失败，请重试！",
            type: "error",
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$message({
        showClose: true,
        message: "重置完成",
      });
    },
  },
};
</script>
<style scoped>
/* /deep/  */
.el-form-item {
  margin: 30px auto;
}
.el-input {
  width: 200px;
}
</style>