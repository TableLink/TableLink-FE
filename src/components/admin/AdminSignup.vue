<script>
import {defineComponent} from "vue";
import axios from '@/axios'; // axios 인스턴스를 import

export default defineComponent({
    name: "UserSignUp",

    data() {
        return {
            username: '',
            password: '',
            phoneNumber: '',
            address: '',
            nickname: '',
            message: '',
            errors: {},
        };
    },
    methods: {
        async signup() {
            try {
                this.errors = {};
                await axios.post('/api/admin/signup', {
                    username: this.username,
                    password: this.password,
                    phoneNumber: this.phoneNumber,
                    address: this.address,
                    nickname: this.nickname,
                });
                this.$router.push('/admin/signin');
            } catch (error) {
                console.error('회원가입 실패:', error);
                if (error.response && error.response.data && error.response.data.result) {
                    this.errors = error.response.data.result;
                    this.message = error.response.data.resultMSG;
                } else {
                    this.message = '회원가입에 실패했습니다. 다시 시도해주세요.';
                }
            }
        }
    }
})
</script>

<template>
    <div id="signup">
        <h2>관리자 회원가입</h2>
        <form @submit.prevent="signup">
            <label for="username">아이디</label>
            <input v-model="username" type="email" placeholder="이메일" id="username" required/>
            <p v-if="errors.username">{{ errors.username.result }}</p>
            <label for="password">비밀번호</label>
            <input v-model="password" type="password" placeholder="비밀번호" id="password" required/>
            <p v-if="errors.password">{{ errors.password.result }}</p>
            <label for="phoneNumber">전화번호</label>
            <input v-model="phoneNumber" type="text" placeholder="전화번호" id="phoneNumber" required/>
            <p v-if="errors.phoneNumber">{{ errors.phoneNumber.result }}</p>
            <label for="address">주소</label>
            <input v-model="address" type="text" placeholder="주소" id="address" required/>
            <p v-if="errors.address">{{ errors.address }}</p>
            <label for="nickname">닉네임</label>
            <input v-model="nickname" type="text" placeholder="닉네임" id="nickname" required/>
            <p v-if="errors.nickname">{{ errors.nickname }}</p>
            <button type="submit">회원가입</button>
        </form>
        <p v-if="message">{{ message }}</p> <!-- 메시지를 표시할 부분 -->
    </div>
</template>

<style scoped>

</style>