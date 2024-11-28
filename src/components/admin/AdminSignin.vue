<template>
    <div id="signin">
        <h2>관리자 로그인</h2>
        <form @submit.prevent="signin">
            <label>아이디</label>
            <input v-model="username" type="email" placeholder="아이디" required/>
            <label>비밀번호</label>
            <input v-model="password" type="password" placeholder="비밀번호" required/>
            <button type="submit">로그인</button>
        </form>
        <div class="btn-box">
            <button>
                <router-link to="/signin">일반회원 로그인</router-link>
            </button>
            <button>
                <router-link to="/admin/signup">관리자 회원가입</router-link>
            </button>
        </div>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'AdminSignin',
    data() {
        return {
            username: '',
            password: '',
            errorMessage: '',
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
                })
                // 로그인 성공 시 메인 페이지로 이동
                this.$router.push("/");
            } catch (error) {
                // 로그인 실패 처리
                this.errorMessage =
                    "로그인 실패: " +
                    (error.response
                        ? error.response.data.resultMsg
                        : error.message);
                console.error("로그인 실패:", this.errorMessage);
            }
        },
    },
});
</script>