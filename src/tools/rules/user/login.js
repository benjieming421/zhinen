import store from "../../../store/index";

export default {
  name: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur"
    },
    {
      min: 6,
      message: "密码长度不能小于6位",
      trigger: "blur"
    },
    {
      max: 18,
      message: "密码长度不能超过18位",
      trigger: "blur"
    }
  ],
  captcha: [
    {
      required: true,
      message: "验证码不能为空",
      trigger: "blur"
    },
    {
      validator: (rule, value, cb) => {
        let captcha = store.getters.getCaptcha.toUpperCase();
        if (value.toUpperCase() === captcha) {
          cb();
        } else {
          cb(new Error("验证码不正确"));
        }
      }
    }
  ]
};
