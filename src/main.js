import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "normalize.css";
import VueParticles from "vue-particles";
import moment from "moment";
import FullCalendar from "vue-full-calendar";
import axios from 'axios';

Vue.prototype.$axios = axios;
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;

axios.defaults.baseURL = '/api'

Vue.use(ElementUI);
Vue.use(VueParticles);
Vue.use(FullCalendar);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
