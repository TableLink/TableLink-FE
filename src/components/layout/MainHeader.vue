<template>
    <Header id="header">
        <div class="logo">
            <h2><router-link to="/">로고</router-link></h2>
        </div>
        <div class="auth-buttons">
            <button v-if="!isSignin" @click="goToLogin">로그인</button>
            <button v-if="!isSignin" @click="goToSignup">회원가입</button>
            <p v-if="isSignin">환영합니다, {{ user?.nickname }}님!</p>
            <button v-if="isSignin && isAdmin" @click="goToDashboard">관리자 대시보드</button>
            <button v-if="isSignin" @click="logoutHandel">로그아웃</button>
            <button v-if="isSignin" @click="userDetail">회원 정보</button>
        </div>
    </Header>
    <nav id="category">
        <ul class="cat-nav">
            <li v-for="board in boards" :key="board.id">
                <router-link :to="{ name: 'PostList', params: { boardId: board.id } }">
                    {{ board.boardName }}
                </router-link>
            </li>
        </ul>
    </nav>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import axios from '@/axios';

export default {
    name: 'MainHeader',
    data() {
        return {
            boards: [],
        };
    },
    computed: {
        ...mapGetters(['isSignin', 'user', 'isAdmin']),
    },
    methods: {
        ...mapActions(['logout']),
        async fetchBoards() {
            try {
                const response = await axios.get('/api/board/list');
                this.boards = response.data.result;
            } catch (error) {
                console.error('게시판 목록 불러오기 실패:', error);
            }
        },
        async logoutHandel() {
            try {
                await axios.post('/api/user/logout');
                await this.logout();
            } catch (error) {
                console.error('로그아웃 실패:', error);
            }
        },
        goToLogin() {
            this.$router.push('/signin');
        },
        goToSignup() {
            this.$router.push('/signup');
        },
        goToDashboard() {
            this.$router.push('/admin/dashboard');
        },
        userDetail() {
            this.$router.push('/detail');
        },
    },
    async mounted() {
        await this.fetchBoards();
        this.$store.dispatch('checkLoginStatus');
    },
};
</script>