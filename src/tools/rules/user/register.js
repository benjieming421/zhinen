import { VertifyPhone } from "../../validator/vertify.js";

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
  education: [
    {
      required: true,
      message: "请选择学历",
      trigger: "blur"
    }
  ],
  phone: [
    {
      required: true,
      validate: VertifyPhone,
      message: "手机号格式不正确",
      trigger: "blur"
    }
  ],
  email: [
    {
      required: true,
      type: "email",
      message: "邮箱格式不正确",
      trigger: "blur"
    }
  ]
};
