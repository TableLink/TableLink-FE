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
      localStorage.setItem('accessToken', token)
      commit('SET_SIGNIN_STATE', {isSignin: true, user});
    },
    logout({commit}) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      commit('LOGOUT', {isSignin: false});
    },
    checkLoginStatus({ commit }) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        commit('SET_SIGNIN_STATE', { isSignin: true, user: null }); // user 정보가 있다면 여기서 설정
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