<template>
  <div class="center">
    <el-card class="person_card">
      <div slot="header" class="clearfix">
        <span>个人信息</span>
      </div>
      <!-- <div class="avatar"><img src="../../assets/image.jpg" /></div> -->
      <div class="box-center">
        <cimage  :height="'100px'" :width="'100px'" :hoverable="false">
          <div>Hello Admin</div>
        </cimage>
      </div>
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
      <div class="user-skills user-bio-section" style="padding:50px 10px;">
        <div class="user-bio-section-header"><i class="el-icon-edit"></i>Skills</span></div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <span>Vue</span>
            <el-progress :percentage="70" />
          </div>
          <div class="progress-item">
            <span>JavaScript</span>
            <el-progress :percentage="18" />
          </div>
          <div class="progress-item">
            <span>Css</span>
            <el-progress :percentage="12" />
          </div>
          <div class="progress-item">
            <span>ESLint</span>
            <el-progress :percentage="100" status="success" />
          </div>
        </div>
      </div>
    </el-card>
    <div class="present">
      <!-- <el-carousel :interval="4000" type="card" height="200px"> -->
      <el-carousel type="card"  height="300px" :interval="4000"  style="width:1000px">
        <el-carousel-item v-for="item in imgList" :key="item.name">
          <img :src="item.src" style="height:100%;width:100%;" alt="图片丢失了" :title="item.title" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="todo">
      <!-- <el-row :gutter="20">
        <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 10}" style="margin-bottom:60px;"> -->
          <todolist />
        <!-- </el-col>
      </el-row> -->
    </div>
  </div>
  
</template>

<script>
import todolist from './todolist'
import cimage from './cimage'


export default {
  components:{
    todolist,
    cimage
  },
  
  data() {
    return {
      imgList: [
        {
          name: "lj",
          src: require("@/assets/lj.png"),
          title: "这是lj.png"
        },
        {
          name: "logo",
          src: require("@/assets/logo.png"),
          title: "这是logo.png"
        },
        {
          name: "bg",
          src: require("@/assets/bg.png"),
          title: "这是bg.png"
        },
        {
          name: "sadmas",
          src: require("@/assets/sadmas.png"),
          title: "这是sadmas.png"
        }
      ]
    };
  }
};
</script>

<style scoped>
.center {
  position: relative;
  width: 90%;
  margin: 40px auto;
}

.person_card {
  width: 300px;
  height: 700px;
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
  height: 40px;
  padding: 25px 10px;
  border-bottom: 2px solid #f0f3f4;
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

.present{
  width: 300px;
  height: 100px;
  position: absolute;
  top: 5px;
  left: 400px;
  /* float: right; */
}
.todo{
  width: 900px;
  height: 350px;
  position: absolute;
  top: 350px;
  left: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  
  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;
  }
    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  
  .box-center {
    margin: 0 auto;
    display: table;
  }
</style>