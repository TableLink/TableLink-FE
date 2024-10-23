<template>
    <Header>
        <div class="logo">
            <!-- 로고를 넣을 곳 -->
        </div>
        <div class="auth-buttons">
            <!-- 로그인 및 회원가입 버튼 -->
            <button v-if="!isSignin" @click="goToLogin">로그인</button>
            <button v-if="!isSignin" @click="goToSignup">회원가입</button>
            <!-- 로그아웃 버튼 -->
            <button v-if="isSignin" @click="logoutHandel">로그아웃</button>
            <button v-if="isSignin" @click="userDetail">회원 정보</button>
        </div>
    </Header>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import axios from "@/axios";

export default {
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