const VertifyPhone = (rule, value, cb) => {
  if (/^1[34578]\d{9}$/.test(value)) {
    cb();
  }
  cb(new Error("手机号格式有误"));
};

export { VertifyPhone };
