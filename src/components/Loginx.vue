<template>
  <div class="index">
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click="change_password">修改密码</el-dropdown-item>
        <el-dropdown-item @click="log_out">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: "Loginx",
  data() {
    return {
      username: null,
      id: null,
    };
  },
  methods: {
    log_out() {
      var that = this;
      alert("退出成功");
      that.$router.push("/user/login");
      localStorage.removeItem("userdata");
    },
    change_password() {
      var that = this;
      that.$router.push("/user/register");
    },
  },
  created() {
    var that = this;
    var userdata = localStorage.getItem("userdata");
    if (!userdata) {
      alert("请先登录");
      var that = this;
      that.$router.push("/user/login");
    }
    userdata = userdata.split(",");
    this.id = userdata[0];
    this.username = userdata[1];
  },
};
</script>
<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.index {
  text-align: right;
  margin: 15px;
}
</style>