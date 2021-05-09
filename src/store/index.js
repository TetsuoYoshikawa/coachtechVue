import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import route from "../router/index";
import router from '../router/index';

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    auth: "",
    user: "",
  },
  mutations: {
    auth(state, payload) {
      state.auth = payload;
    },
    user(state, payload) {
      state.user = payload;
    },
    logout(state, payload) {
      state.auth = payload;
    },
    changeUserData(state, payload) {
      state.user.profile = payload;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      const responseLogin = await axios.post(
        "https://git.heroku.com/agile-waters-38693.git/api/login",
        {
          email: email,
          password: password,
        }
      );
      const responseUser = await axios.get(
        "https://git.heroku.com/agile-waters-38693.git/api/user",
        {
          params: {
            email: email,
          },
        }
      );
      commit('auth', responseLogin.data.auth);
      commit('user', responseUser.data.data[0]);
      router.replase('/home');
    },
    logout({ commit }) {
      axios
        .post('https://git.heroku.com/agile-waters-38693.git', {
          auth: this.state.auth,
        })
        .then((response) => {
          console.log(response);
          commit('logout', response.data.auth);
          router.replace('/');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
