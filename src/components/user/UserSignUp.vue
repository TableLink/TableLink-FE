<script>
import axios from '@/axios'; // axios 인스턴스를 import
export default {
    name: "UserSignUp",
    data() {
        return {
            username: '',
            password: '',
            phoneNumber: '',
            address: '',
            nickname: '',
            message: '',
        };
    },
    methods: {
        async signup() {
            try {
                await axios.post('/api/user/signup', {
                    username: this.username,
                    password: this.password,
                    phoneNumber: this.phoneNumber,
                    address: this.address,
                    nickname: this.nickname,
                });
                this.$router.push('/signin');
            } catch (error) {
                console.error('회원가입 실패:', error);
                this.message = '회원가입에 실패했습니다. 다시 시도해주세요.'
            }
        }
    }
}
</script>

<template>
    <div id="signup">
        <form @submit.prevent="signup">
            <input v-model="username" type="email" placeholder="이메일" required/>
            <input v-model="password" type="password" placeholder="비밀번호" required/>
            <input v-model="phoneNumber" type="text" placeholder="전화번호" required />
            <input v-model="address" type="text" placeholder="주소" required />
            <input v-model="nickname" type="text" placeholder="닉네임" required />
            <button type="submit">회원가입</button>
        </form>
        <p v-if="message">{{ message }}</p> <!-- 메시지를 표시할 부분 -->
    </div>
</template>

<style scoped>

</style>