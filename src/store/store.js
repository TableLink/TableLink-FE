import {createStore} from 'vuex';
import axios from '@/axios';
import {useCookies} from 'vue3-cookies';

const {cookies} = useCookies();

export default createStore({
    state: {
        accessToken: null,  // accessToken 메모리에서 관리
        isSignin: false,    // 로그인 상태
        user: null,         // 사용자 정보
        isAdmin: false,     // 관리자 여부
    },
    mutations: {
        SET_SIGNIN_STATE(state, {accessToken, user}) {
            state.accessToken = accessToken;
            state.isSignin = true;
            state.user = user;
            state.isAdmin = user?.role === 'ADMIN';
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
        async login({commit}, {username, password}) {
            try {
                const response = await axios.post('/api/user/signin', {
                    username,
                    password,
                });

                const {
                    accessToken,
                    refreshToken,
                    role,
                    nickname
                } = response.data.result || {};
                const user = {role, nickname};

                // 쿠키에 토큰 저장
                cookies.set('refreshToken', refreshToken, {
                    expires: '1d',
                    path: '/',
                    domain: 'localhost:8080',  // 쿠키를 설정할 도메인
                    sameSite: 'None',
                    secure: false, // HTTPS 사용 시
                });
                cookies.set('accessToken', accessToken, {
                    expires: '30m',
                    path: '/',
                    domain: 'localhost:8080',  // 쿠키를 설정할 도메인
                    sameSite: 'None',
                    secure: false, // HTTPS 사용 시
                });

                // Vuex 상태 업데이트 (메모리에 저장)
                commit('SET_SIGNIN_STATE', {accessToken, user});

            } catch (error) {
                console.error('로그인 실패:', error.message || error);
                if (error.response) {
                    console.error('서버 응답 오류:', error.response.data);
                } else if (error.request) {
                    console.error('요청 실패:', error.request);
                }
                throw error;
            }
        },
        async logout({commit}) {
            const refreshToken = cookies.get('refreshToken');
            if (refreshToken) {
                try {
                    // 로그아웃 API 호출 (선택 사항)
                    await axios.post('/api/user/logout');
                    cookies.remove('refreshToken');
                    cookies.remove('accessToken');
                    // 상태 초기화
                    commit('LOGOUT');
                } catch (error) {
                    console.error('로그아웃 실패:', error);
                }
            } else {
                commit('LOGOUT');
            }
        },

        async restoreLoginState({commit}) {
            const accessToken = cookies.get('accessToken');
            console.log(accessToken)
            if (accessToken) {
                try {
                    // 액세스 토큰이 쿠키에 있으면 사용자 정보 불러오기
                    await commit('SET_ACCESS_TOKEN', accessToken);
                    await this.$store.dispatch('fetchUserInfo');

                } catch
                    (error) {
                    console.error('로그인 상태 복원 실패:', error);
                    this.$store.dispatch('logout');
                }
            }
        },

        async fetchUserInfo({commit}) {
            try {
                const accessToken = cookies.get('accessToken');
                if (!accessToken) {
                    throw new Error('AccessToken이 존재하지 않습니다.');
                }

                const response = await axios.get('/api/user', {
                    headers: {Authorization: `Bearer ${accessToken}`},
                });

                const {nickname, role} = response.data;

                console.log(nickname, role)
                // Vuex 상태 업데이트
                commit('SET_SIGNIN_STATE',
                    {accessToken, user: {nickname, role}});
            } catch (error) {
                console.error('사용자 정보 불러오기 실패:', error);
                throw error;
            }
        },

        checkLoginStatus({commit}) {
            // 쿠키에 accessToken이 있으면 로그인 상태로 처리
            const accessToken = cookies.get('accessToken');
            if (accessToken) {
                commit('SET_ACCESS_TOKEN', accessToken);
                commit('SET_SIGNIN_STATE',
                    {accessToken, user: {nickname: null, role: null}});
            } else {
                // 쿠키에 토큰이 없으면 로그아웃 상태로 처리
                commit('LOGOUT');
            }
        },
    },
    getters:
        {
            accessToken: (state) => state.accessToken,
            isSignin:
                (state) => state.isSignin,
            user:
                (state) => state.user,
            isAdmin:
                (state) => state.isAdmin,
        }
    ,
})
;