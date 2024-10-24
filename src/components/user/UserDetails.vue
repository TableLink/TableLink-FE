<script>
import axios from '@/axios';
import {defineComponent} from "vue";
import MainHeader from "@/components/layout/MainHeader.vue";

export default defineComponent({
    name: "UserDetails",
    components: {MainHeader},
    data() {
        return {
            user: null,
        };
    },
    async mounted() {
        try {
            const token = localStorage.getItem("accessToken");
            if (token) {
                const response = await axios.get("/api/user/details", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.user = response.data.result;
            } else {
                this.$route.push("/signin"); // 토큰 없으면 로그인 페이지로 리다이렉트
            }
        } catch (error) {
            console.error('사용자 정보 가져오기 실패:', error);
        }
    },
    methods: {
        userUpdate() {
            this.$router.push("/update-user");
        },
        async userDelete() {
            try {
                await axios.delete("/api/user/delete");

                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");

                this.$router.push("/")
            } catch (error) {
                console.error("회원가입 실패")
            }
        }
    },
});
</script>

<template>
    <MainHeader />

    <div id="UserDetails" v-if="user">
        <h2>{{ user.nickname }}님의 프로필</h2>
        <p>아이디: {{ user.username }}</p>
        <p>비밀번호:
            <input type="password" value="password" disabled/>
        </p>
        <p>주소: {{ user.address }}</p>
        <p>전화번호: {{ user.phoneNumber }}</p>
        <button @click="userUpdate">회원정보 수정</button>
        <button @click="userDelete">회원 탈퇴</button>
    </div>

</template>

<style scoped>
input[type="password"] {
    border: none;
    background: transparent;
    font-size: 1em;
    width: auto;
}

button {
    margin-left: 10px;
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>