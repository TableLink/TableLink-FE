<script>
import { mapActions } from 'vuex';
import { defineComponent } from 'vue';
import MainHeader from '@/components/layout/MainHeader.vue';

export default defineComponent({
    name: 'UserSignin',
    components: { MainHeader },
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
                await this.login({
                    username: this.username,
                    password: this.password,
                });
                this.$router.push('/'); // 메인페이지로 redirect
            } catch (error) {
                // 로그인 실패 처리
                this.errorMessage =
                    '로그인 실패: ' +
                    (error.response
                        ? error.response.data.resultMsg
                        : error.message);
                console.error('로그인 실패:', this.errorMessage);
            }
        },
    },
});
</script>

<template>
    <MainHeader/>
    <div id="signin">
        <h2>로그인</h2>
        <form @submit.prevent="signin">
            <label>아이디</label>
            <input
                v-model="username"
                type="email"
                placeholder="아이디"
                required
            />
            <label>비밀번호</label>
            <input
                v-model="password"
                type="password"
                placeholder="비밀번호"
                required
            />
            <button type="submit">로그인</button>
        </form>
        <div class="btn-box">
            <button>
                <a href="/admin/signin">관리자 로그인</a>
            </button>
            <button>
                <a href="/signup">회원가입</a>
            </button>
        </div>
    </div>
</template>
