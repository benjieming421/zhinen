<template>
  <div class="container">
    <div class="content-container">
      <div class="head-contianer">
        <div class="steps-container">
          <el-steps align-center :active="stepActive" finish-status="success">
            <el-step title="填写用户信息"></el-step>
            <el-step title="确定用户信息"></el-step>
            <el-step status="finish" title="完成"></el-step>
          </el-steps>
        </div>
        <div class="form-container">
          <el-form
            v-show="stepActive < 2"
            ref="information"
            :model="user"
            :rules="rules"
            label-width="80px"
            label-position="left"
            :disabled="stepActive == 1"
          >
            <el-form-item prop="name" label="用户名">
              <el-input v-model="user.name" placeholder="用户名" />
            </el-form-item>
            <el-form-item prop="password" label="用户密码">
              <el-input
                v-model="user.password"
                show-password
                placeholder="密码"
              />
            </el-form-item>
            <el-form-item prop="rePassword" label="确认密码">
              <el-input
                v-model="user.rePassword"
                show-password
                placeholder="确认密码"
              />
            </el-form-item>
            <el-form-item prop="education" label="学历">
              <el-select
                clearable
                v-model="user.education"
                placeholder="请选择学历"
              >
                <el-option label="专科" value="0"></el-option>
                <el-option label="本科" value="1"></el-option>
                <el-option label="硕士" value="2"></el-option>
                <el-option label="博士" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="phone" label="手机号">
              <el-input v-model="user.phone" placeholder="手机号" />
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
              <el-input v-model="user.email" placeholder="邮箱" />
            </el-form-item>
          </el-form>

          <div class="button-container">
            <div class="button-group">
              <div v-show="stepActive == 0"></div>
              <el-button
                round
                type="primary"
                v-show="stepActive != 0 && stepActive < 2"
                @click="handlerStepsPrev"
                :disabled="false"
              >
                上一步
              </el-button>
              <el-button
                round
                type="primary"
                v-show="stepActive < 1"
                @click="handlerStepsNext"
                :disabled="false"
              >
                下一步
              </el-button>
              <el-button
                round
                type="primary"
                v-show="stepActive == 1"
                @click="handlerSubmitInformation"
              >
                确认信息
              </el-button>
            </div>
          </div>

          <div class="register-container" v-show="stepActive == 2">
            <div>
              <div class="icon-container">
                <i class="el-icon-check"></i>
              </div>
              <hgroup>
                <h2>恭喜你完成注册</h2>
                <h5>欢迎加入我们的学习平台</h5>
              </hgroup>
            </div>

            <div class="operator-container">
              <el-button type="success" round>登 录</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="partion-line">
        <el-divider />
      </div>
      <div class="desc-container">
        <el-button type="primary" v-show="btnis" @click="login_account"
          >登录</el-button
        >
        <br />
        <h1>说明</h1>
        <h2>关于注册</h2>
        <section>本平台是面向所有热爱学习的朋友,注册是免费</section>
        <h2>关于资源</h2>
        <section>本在线学习平台一切视频资源均免费,后续使用也均免费</section>
      </div>
    </div>
  </div>
</template>

<script>
import rule from "../../tools/rules/user/register.js";
export default {
  name: "UserRegister",
  data() {
    return {
      stepActive: 0,
      user: {
        name: "",
        password: "",
        rePassword: "",
        phone: "",
        email: "",
        education: "",
      },
      returnid: null,
      btnis: false,
    };
  },
  computed: {
    rules: function () {
      rule.rePassword = [
        {
          required: true,
          validator: (rule, value, cb) => {
            if (value === this.user.password) {
              cb();
            } else {
              cb(new Error("两次密码不一致"));
            }
          },
        },
      ];
      return rule;
    },
  },
  methods: {
    login_account() {
      var that = this;
      that.$router.push("/user/login");
    },
    handlerSubmitInformation() {
      // TODO: 提交用户注册信息
      this.stepActive++;

      var that = this;
      this.stepActive++;
      this.$axios
        .get("/User/register", {
          params: {
            user: that.user,
          },
        })
        .then((e) => {
          that.returnid = e.data;
          alert("注册成功你的用户名为" + that.user.name + "你的id为" + e.data);
          that.btnis = true;
        });
    },
    handlerStepsPrev() {
      if (this.stepActive > 0) {
        this.stepActive--;
      }
    },
    handlerStepsNext() {
      this.$refs.information.validate((valid) => {
        if (valid) {
          if (this.stepActive + 1 < 4) {
            this.stepActive++;
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: url("../../assets/user/user-register-bg.jpg") 0% 0% / cover
    no-repeat;
  width: 100vw;
  height: 100vh;
}
.container .content-container {
  width: calc(67vw - 40px);
  padding: 40px;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid #f2f2f2;
  border-radius: 5px;
}
.container .form-container {
  padding: 0 30%;
  margin: 50px auto 0px;
}
.container .form-container .button-group {
  display: flex;
  justify-content: space-between;
}
.container .register-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}
.container .register-container .icon-container {
  color: #fff;
  font-size: 70px;
}
/deep/ .el-form-item__label {
  color: #000;
}
/deep/ .el-select {
  width: 100%;
}
</style>
