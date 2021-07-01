<template>
  <el-container>
    <el-aside width="200px">
      <!-- <Menu /> -->
    </el-aside>
    <el-container>
      <el-header class="header-container" style="margin-bottom: 20px">
        <div class="title-container"></div>
        <div class="information-container">
          <el-dropdown>
            <span class="el-dropdown-link">
              <!-- {{ user.name }} -->
              manager
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="modify" @click="change_password"
                >修改密码</el-dropdown-item
              >
              <el-dropdown-item command="logout" @click="log_out"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <router-view style="padding-left: 20px" />
    </el-container>
  </el-container>
</template>
<script>
// import Menu from "../components/Menu.vue";
export default {
  name: "Home",
  data() {
    return {
      dialog: false,
      model: {
        phone: "",
        passwd: "",
      },
    };
  },
  methods: {
    change_password() {
      var that = this;
      that.$router.push("/user/forgotpwd");
    },
    log_out() {
      var that = this;
      alert("退出成功");
      that.$router.push("/user/login");
      localStorage.removeItem("userdata");
    },
  },
  components: {
    // Menu
  },
};
</script>

<style scoped>
.header-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
