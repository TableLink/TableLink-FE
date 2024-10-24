<script>
import axios from "@/axios";
import {defineComponent} from "vue";
import MainHeader from "@/components/layout/MainHeader.vue";

export default defineComponent({
    name: "UserUpdate",
    components: {MainHeader},
    data() {
        return {
            nickname: '',
            password: '',
            address: '',
            phoneNumber: '',
        }
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
                const user = response.data;
                this.nickname = user.nickname;
                this.password = user.password;
                this.phoneNumber = user.phoneNumber;
                this.address = user.address;
            } else {
                this.$router.push("/signin")
            }
        } catch (error) {
            console.error('회원 정보 가져오기 실패:', error);
        }
    },
    methods: {
        async updateUserInfo() {
            try {
                const token = localStorage.getItem("accessToken");
                await axios.patch("/api/user/update", {
                    nickname: this.nickname,
                    password: this.password,
                    phoneNumber: this.phoneNumber,
                    address: this.address
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                alert("회원 정보가 수정되었습니다.")
            } catch (error) {
                console.error('회원 정보 수정 실패:', error);
                alert('회원정보 수정에 실패했습니다.');
            }
        }
    }
});
</script>

<template>
    <MainHeader/>
    <div id="UserUpdate">
        <h2>회원 정보 수정</h2>
        <form @submit.prevent="updateUserInfo">
            <div>
                <label>닉네임:</label>
                <input v-model="nickname" type="text" required/>
            </div>
            <div>
                <label>비밀번호:</label>
                <input v-model="password" type="password"/>
            </div>
            <div>
                <label>전화번호:</label>
                <input v-model="phoneNumber" type="text" required/>
            </div>
            <div>
                <label>주소:</label>
                <input v-model="address" type="text" required/>
            </div>
            <button type="submit">수정</button>
        </form>
    </div>
</template>

<style scoped>

</style>