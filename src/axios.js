// src/axios.js
import axios from 'axios';

// Axios 기본 설정
const instance = axios.create({
  baseURL: 'http://localhost:8080', // BE 서버 주소
  withCredentials: true,
});

// 요청 인터셉터 설정 (토큰 추가)
instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken'); // 토큰을 로컬 스토리지에서 가져옴
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // 헤더에 토큰 추가
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export default instance;