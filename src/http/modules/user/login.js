import axios from "../../axios.js";

// 使用方法 this.axios.UserLogin.login(paramas) 即可
export const login = data => {
  return axios({
    url: "https://www.fastmock.site/mock/2a689aecc4bf0ae6baaaaa98c988fb54/table-0/api/table",
    params: data,
    methods: "GET"
  })
};
