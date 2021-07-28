<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{firstData}}</span>
        <el-button style="float: right; padding: 3px 3px; color: #F56C6C;" type="text" @click="handleSave">保存</el-button>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">添加</el-button> -->
      </div>
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in cities" :label="city.value" :key="city.value" :border=true
          style="margin: 10px 70px; width: 50%;">
          {{city.name}}
        </el-checkbox>

      </el-checkbox-group>
    </el-card>

  </div>
</template>

<script>
  export default {
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      firstData: String,
      cities: Array,
      value: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        checkAll: false,
        checkedCities: [],
        isIndeterminate: true
      }
    },
    created() {
      this.checkedCities = [].concat(this.value)
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedCities = val ? this.cities.map((item) => item.value) : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      handleSave() {
        this.$confirm('将保存此次操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('change', this.checkedCities)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消保存'
          });
        });
      }
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 25%;
    height: 700px;
    margin: 30px 60px;
    float: left;
  }
</style>