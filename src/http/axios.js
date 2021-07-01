import axios from "axios";
import config from "./config";
import { Message } from "element-ui";
import store from "../store";

export default options => {
  return new Promise((resolve, reject) => {
    let instance = axios.create({
      headers: config.headers,
      withCredentials: config.withCredentials,
      timeout: config.timeout,
    });
    instance.interceptors.request.use(
      config => {
        // TODO: 在请求时需要 token 等信息携带，放到 config 中即可
        // let token = store.getters.token.access_token;
        // if (token) {
        //   config.headers.token = token;
        // }
        return config;
      },
      err => {
        console.log("request err :", err);
      }
    );
    instance.interceptors.response.use(
      res => {
        // TODO: 自定义后台错误码进行前端统一处理
        let status = res.data.code;
        switch (status) {
          case 200:
            return res.data;
          case 500:
            Message.error(res.data.msg);
            return;
          case 401:
            //TODO: 返回到登陆页面
            break;
          case 404:
            // TODO: 跳转到404
            break;
          case 403:
            break;
        }
      },
      err => {
        console.log("err: ", err);
      }
    );
    instance(options)
      .then(res => {
        resolve(res);
        return false;
      })
      .catch(err => {
        reject(err);
      });
  });
};
