<template>
    <Header id="header">
        <div class="logo">
            <h2><a href="/">로고</a></h2>
        </div>
        <div class="auth-buttons">
            <!-- 로그인 x 헤더 -->
            <button v-if="!isSignin" @click="goToLogin">로그인</button>
            <button v-if="!isSignin" @click="goToSignup">회원가입</button>
            <!-- 로그인 헤더 -->
            <p v-if="isSignin">환영합니다, {{ user ? user.username : '사용자' }}!</p>
            <button v-if="isSignin" @click="logoutHandel">로그아웃</button>
            <button v-if="isSignin" @click="userDetail">회원 정보</button>
        </div>
    </Header>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import axios from "@/axios";

export default {
    name: 'MainHeader',
    computed: {
        ...mapGetters(['isSignin', 'user']),
    },
    methods: {
        ...mapActions(['logout']),
        async logoutHandel() {
            try {
                await axios.post('/api/user/logout');
                await this.logout()
            } catch (error) {
                console.error('로그아웃 실패');
            }
        },
        goToLogin() {
            this.$router.push('/signin'); // 로그인 페이지로 이동
        },
        goToSignup() {
            this.$router.push('/signup'); // 회원가입 페이지로 이동
        },
        userDetail() {
            this.$router.push('/detail')
        }
    }
};
</script>