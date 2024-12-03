// src/axios.js
import axios from 'axios';
import store from "./store/store";
import {useCookies} from "vue3-cookies";

// Axios 기본 설정
const instance = axios.create({
    baseURL: 'http://localhost:8080', // BE 서버 주소
    withCredentials: true,
});

// 요청 인터셉터 설정 (토큰 추가)
instance.interceptors.request.use(
    (config) => {
        const token = store.getters.accessToken;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // 헤더에 토큰 추가
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = useCookies().cookies.get('refreshToken');
                if (!refreshToken) {
                    throw new Error('RefreshToken이 존재하지 않습니다.');
                }

                const response = await axios.post('/api/user/refresh', { refreshToken });

                const { accessToken } = response.data.result || {};
                if (!accessToken) {
                    throw new Error('AccessToken 갱신 실패');
                }

                // 쿠키에 갱신된 AccessToken 저장
                useCookies().cookies.set('accessToken', accessToken, { secure: true, sameSite: 'Strict' });

                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                return axios(originalRequest);
            } catch (err) {
                console.error('토큰 갱신 실패:', err);
                throw err;
            }
        }
        return Promise.reject(error);
    }
);

export default instance;