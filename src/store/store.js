import { createStore } from "vuex";
import axios from "@/axios";

export default createStore({
    state: {
        accessToken: null, // accessToken 메모리에서 관리
        isSignin: false,   // 로그인 상태
        user: null,        // 사용자 정보
        isAdmin: false,    // 관리자 여부
    },
    mutations: {
        SET_SIGNIN_STATE(state, { accessToken, user }) {
            state.accessToken = accessToken;
            state.isSignin = true;
            state.user = user;
            state.isAdmin = user?.role === "ADMIN";
        },
        LOGOUT(state) {
            state.accessToken = null;
            state.isSignin = false;
            state.user = null;
            state.isAdmin = false;
        },
        SET_ACCESS_TOKEN(state, accessToken) {
            state.accessToken = accessToken;
        },
    },
    actions: {
        async login({ commit }, { username, password }) {
            try {
                // 로그인 API 호출
                const response = await axios.post("/api/user/signin", {
                    username,
                    password,
                });

                // 디버깅: 서버 응답 출력
                console.log("API 응답 데이터:", response.data);

                const { accessToken, role, nickname } = response.data.result || {};

                if (!accessToken || !role || !nickname) {
                    throw new Error("토큰 또는 사용자 정보가 누락되었습니다.");
                }

                console.log(accessToken)
                const user = {role, nickname};
                // Vuex 상태 업데이트 (메모리에 저장)
                commit('SET_SIGNIN_STATE', { isSignin: true, user, accessToken });
            } catch (error) {
                console.error("로그인 실패:", error);
                throw error;
            }
        },
        async logout({ commit }) {
            try {
                // 로그아웃 API 호출 (선택 사항)
                await axios.post("/api/user/logout");

                // 상태 초기화
                commit("LOGOUT");
            } catch (error) {
                console.error("로그아웃 실패:", error);
            }
        },
        async refreshAccessToken() {
            try {
                const response = await axios.post('/api/user/refresh', {}, { withCredentials: true });
                const { accessToken } = response.data.result;
                this.$store.commit('SET_ACCESS_TOKEN', accessToken); // Vuex에 저장
                console.log("새 accessToken:", accessToken);
            } catch (error) {
                console.error("액세스 토큰 재발급 실패:", error);
            }
        },
        /*async checkLoginStatus({ commit }) {
            try {
                // 쿠키를 이용해 refreshToken 검증 및 accessToken 재발급
                const response = await axios.get("/api/user/refresh");

                const { accessToken, user } = response.data.result;

                if (!accessToken || !user) {
                    throw new Error("토큰 또는 사용자 정보가 누락되었습니다.");
                }

                // 상태에 저장
                commit("SET_SIGNIN_STATE", { accessToken, user });
                console.log("로그인 성공:", { isSignin: true, user, accessToken });
            } catch (error) {
                console.error("로그인 상태 확인 실패:", error);
                commit("LOGOUT");
            }
        },*/
    },
    getters: {
        accessToken: (state) => state.accessToken,
        isSignin: (state) => state.isSignin,
        user: (state) => state.user,
        isAdmin: (state) => state.isAdmin,
    },
});