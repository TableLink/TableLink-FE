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
            <p v-if="isSignin">환영합니다, {{ user ? user.username : '님'}}!</p>
            <button v-if="isSignin" @click="logoutHandel">로그아웃</button>
            <button v-if="isSignin" @click="userDetail">회원 정보</button>
        </div>
    </Header>
    <nav id="category">
        <ul class="cat-nav">
            <li v-for="board in boards" :key="board.id">
                <router-link :to="{name:'PostList', params: {boardId: board.id}}">
                    {{ board.boardName }}
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import axios from "@/axios";

export default {
    name: 'MainHeader',
    data() {
        return {
            boards: [],
        }
    },
    computed: {
        ...mapGetters(['isSignin', 'user']),
    },
    methods: {
        ...mapActions(['logout']),
        async fetchBoards() {
            try {
                const response = await axios.get("/api/board/list");
                console.log(response.data)
                this.boards = response.data.result; // board_name 속성만 매핑
            } catch (error) {
                console.error('게시판 목록 불러오기 실패');
            }
        },
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
    },
    async mounted() {
        await this.fetchBoards();
    }
};
</script>