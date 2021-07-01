import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    captcha: ""
  },
  getters: {
    getCaptcha: state => {
      return state.captcha;
    }
  },
  mutations: {
    pushCaptcha(state, value) {
      state.captcha = value;
    }
  },
  actions: {},
  modules: {}
});
