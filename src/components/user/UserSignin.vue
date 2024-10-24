<script>
import axios from '@/axios';
import {mapActions} from "vuex";
import {defineComponent} from "vue";
import MainHeader from "@/components/layout/MainHeader.vue";

export default defineComponent({
    name: 'UserSignin',
    components: {MainHeader},
    data() {
        return {
            username: '', // 아이디
            password: '', // 비밀번호
            errorMessage: '', // 에러 메시지
        };
    },
    methods: {
        ...mapActions(['login']),
        async signin() {
            this.errorMessage = '';
            try {
                const response = await axios.post('/api/user/signin', {
                    username: this.username,
                    password: this.password,
                });
                console.log(response.data);

                // 응답에서 accessToken과 refreshToken 추출
                const accessToken = response.data.result.accessToken;
                const refreshToken = response.data.result.refreshToken;

                // 토큰 존재 여부 확인
                if (!accessToken || !refreshToken) {
                    throw new Error("토큰이 존재하지 않습니다."); // 에러 발생
                }

                // 로컬 스토리지에 토큰 저장
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken); // 여기에서 refreshToken 저장

                // Vuex 상태 업데이트
                this.login({user: {username: this.username}, token: accessToken});

                this.$router.push('/'); // 메인페이지로 redirect
            } catch (error) {
                this.errorMessage = '로그인 실패: ' + (error.response ? error.response.data.resultMsg
                    : error.message);
                console.error('로그인 실패:', this.errorMessage);
            }
            /*...mapActions(['logout']),
            async logout() {
                try {
                    const response = await axios.post("/api/user/logout")
                }
            }*/
        },
    }
})
</script>

<template>
    <MainHeader />
    <div id="signin">
        <h2>로그인</h2>
        <form @submit.prevent="signin">
            <label>아이디</label>
            <input v-model="username" type="email" placeholder="아이디" required/>
            <label>비밀번호</label>
            <input v-model="password" type="password" placeholder="비밀번호" required/>
            <button type="submit">로그인</button>
        </form>
    </div>
</template>