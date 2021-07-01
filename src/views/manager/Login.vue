<template>
  <particles :bgImage="bgImage">
    <div class="login-container">
      <div class="title-container">
        <h1 class="title">CURIOUSNESS</h1>
        <h1 class="title">管理端用户登录</h1>
      </div>
      <div class="form-container">
        <el-form ref="information" :model="user" :rules="rules">
          <el-form-item prop="name">
            <el-input v-model="user.name" placeholder="用户名" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="user.password"
              show-password
              placeholder="密码"
            />
          </el-form-item>
          <el-form-item>
            <el-row :gutter="36">
              <el-col :span="16">
                <el-form-item prop="captcha">
                  <el-input v-model="user.captcha" placeholder="验证码" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <captcha />
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
      <div class="operate-container"></div>
      <div class="button-container">
        <div class="button-group">
          <el-button type="primary" round @click="handlerLogin">登录</el-button>
        </div>
      </div>
    </div>
  </particles>
</template>

<script>
import Particles from "../../components/Particles.vue";
import Captcha from "../../components/Captcha.vue";
import rules from "../../tools/rules/user/login.js";
export default {
  name: "ManagerLogin",
  data() {
    return {
      user: {
        id: "",
        password: "",
        captcha: "",
        name: "",
      },
      bgImage: require("../../assets/manager/login-bg.jpg"),
      rules: rules,
    };
  },
  methods: {
    handlerLogin() {
      var that = this;
      this.$refs.information.validate((valid) => {
        console.log("valid: ", valid);
      });
      this.$axios
        .get("/User/administrator_login", {
          params: {
            user: this.user,
          },
        })
        .then((res) => {
          alert(res.data);
          that.$router.push("/user/tourists");
        });
    },
  },
  components: {
    Particles,
    Captcha,
  },
};
</script>

<style scoped>
.login-container {
  background-color: #e5f0ea;
  border: 1px solid #ece7ef;
  border-radius: 3px;
  padding: 14px 20px;
  box-shadow: 0 0 8px #cfe1e1;
}
.login-container .title-container {
  text-align: center;
  padding: 14px 0;
  color: #085eba;
}
.login-container .title-container .title {
  letter-spacing: 2px;
  font-size: 36px;
  font-weight: initial;
  font-family: "comic sans ms";
}
.button-group {
  display: flex;
  justify-content: space-around;
}
.button-group::after,
.button-group::before {
  content: none;
}
</style>
