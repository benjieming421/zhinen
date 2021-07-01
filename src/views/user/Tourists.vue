<template>
  <div class="index">

        <h1>欢迎光临用户：{{ username }}</h1>
        <h1>厦门市：海上花园，温馨厦门。</h1>
        <el-link
          type="primary"
          :underline="false"
          class="quit"
          @click="log_out"
          v-show="isxx"
          >退出登录</el-link
        >
        <el-button
          type="primary"
          class="quit"
          v-show="!isxx"
          @click="user_register"
          >用户注册</el-button
        >

  </div>
</template>

<script>

export default {
  name: "Default",
  data() {
    return {
      username: null,
      id: null,
      isxx: true,
    };
  },
  created() {
    var that = this;
    var userdata = localStorage.getItem("userdata");
    if (!userdata) {
      this.username = "游客";
      that.isxx = false;
    }
    userdata = userdata.split(",");
    this.id = userdata[0];
    this.username = userdata[1];
  },
  methods: {
    user_register() {
      var that = this;
      that.$router.push("/user/register");
    },
    log_out() {
      var that = this;
      alert("退出成功");
      that.$router.push("/user/login");
      localStorage.removeItem("userdata");
    },
  },
  components: {

  },
};
</script>
<style scoped>
.index {
  width: 100%;
  height: 500px;
  text-align: center;
  background: url("../../assets/user/user-register-bg.jpg") 0% 0% / cover;
  position: absolute;
}
.quit {
  position: absolute;
  right: 45px;
  top: 20px;
}
.ss {
  width: 150px;
  height: 560px;
  position: absolute;
  z-index: 1000;
  background-color: white;
}
</style>
