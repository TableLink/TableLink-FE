import {createStore} from "vuex";

export default createStore({
  state: {
    isSignin: localStorage.getItem("accessToken") != null,
    user: null,
  },
  mutations: {
    SET_SIGNIN_STATE(state, payload) {
      state.isSignin = payload.isSignin;
      state.user = payload.user;
    },
    LOGOUT(state) {
      state.isSignin = false;
      state.user = null;
    },
  },
  actions: {
    login({commit}, {user, token}) {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      commit('SET_SIGNIN_STATE', {isSignin: true, user});
    },
    logout({commit}) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      commit('LOGOUT', {isSignin: false});
    },
    checkLoginStatus({ commit }) {
      const token = localStorage.getItem('accessToken');
      const user = JSON.parse(localStorage.getItem('user'));
      if (token) {
        commit('SET_SIGNIN_STATE', { isSignin: true, user }); // user 정보가 있다면 여기서 설정
      } else {
        commit('LOGOUT');
      }
    },
  },
  getters: {
    isSignin: (state) => state.isSignin,
    user: (state) => state.user,
  }
})