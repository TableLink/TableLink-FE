// src/axios.js
import axios from 'axios';
import store from "./store/store";

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
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.state === 401 && !originalRequest._retry) {
            originalRequest._retry == true;
            await store.dispatch()
        }
    }
)

export default instance;