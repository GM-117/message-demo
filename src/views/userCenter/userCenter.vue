<template>
  <div class="center">
    <el-card class="person_card">
      <div slot="header" class="clearfix">
        <span>个人信息</span>
      </div>
      <div class="avatar"><img src="../../assets/image.jpg" /></div>
      <div class="detail">
        <div class="detail_col clearfix">
          <span style="float: left; font-size: 15px;font-weight:bolder">登录账号</span>
          <span style="float: right; font-size: 15px">admin</span>
        </div>
        <div class="detail_col clearfix">
          <span style="float: left; font-size: 15px;font-weight:bolder">用户ID</span>
          <span style="float: right; font-size: 15px">AH-001</span>
        </div>
        <div class="detail_col clearfix">
          <span style="float: left; font-size: 15px;font-weight:bolder">用户昵称</span>
          <span style="float: right; font-size: 15px">管理员</span>
        </div>
        <div class="detail_col clearfix">
          <span style="float: left; font-size: 15px;font-weight:bolder">所属部门</span>
          <span style="float: right; font-size: 15px">研发部</span>
        </div>
        <div class="detail_col clearfix">
          <span style="float: left; font-size: 15px;font-weight:bolder">手机号码</span>
          <span style="float: right; font-size: 15px">18885859898</span>
        </div>
      </div>
    </el-card>

    <!-- <el-card>
      <el-table :data="tableData" fit>
        <el-table-column
          label="个人信息"
          align="center"
          class-name="center-col"
        >
          <el-table-column prop="name" label="姓名" align="center">
          </el-table-column>
          <el-table-column prop="province" label="省份" align="center">
          </el-table-column>
          <el-table-column prop="city" label="市区" align="center">
          </el-table-column>
          <el-table-column prop="address" label="地址" align="center">
          </el-table-column>
          <el-table-column prop="zip" label="邮编" align="center">
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-card> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },

        {
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ],
    };
  },
};
</script>

<style>
.center {
  width: 90%;
  margin: 40px auto;
}
.person_card {
  width: 300px;
  height: 500px;
}
.avatar {
  width: 110px;
  margin: 5px auto;
}
.avatar > img {
  width: 100%;
  border-radius: 50%;
}
.detail {
  margin-left: 8px;
  width: 240px;
}
.detail_col {
  height: 50px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f3f4;
}
.center-col {
  font-size: 20px;
  color: #000;
}
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  line-height: 0;
  visibility: hidden;
  clear: both;
}
</style>