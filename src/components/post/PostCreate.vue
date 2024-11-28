<template>
    <div class="post-create">
        <h1>게시글 작성</h1>
        <form @submit.prevent="submitPost">
            <div class="form-group">
                <label for="title">제목</label>
                <input
                    type="text"
                    id="title"
                    v-model="title"
                    placeholder="제목을 입력하세요"
                    required
                />
            </div>

            <div class="form-group">
                <label for="contentText">내용</label>
                <textarea
                    id="contentText"
                    v-model="contentText"
                    placeholder="내용을 입력하세요"
                    required
                ></textarea>
            </div>

            <button type="submit" :disabled="isSubmitting">작성</button>
            <button type="button" @click="cancelPost">취소</button>
        </form>
    </div>
</template>

<script>
import axios from "@/axios";

export default {
    name: "PostCreate",
    props: {
        boardId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            title: "",
            contentText: "",
            isSubmitting: false
        };
    },
    methods: {
        async submitPost() {
            if (!this.title.trim() || !this.contentText.trim()) {
                alert("제목과 내용을 모두 작성해 주세요.");
                return;
            }

            this.isSubmitting = true;

            try {
                const payload = {
                    title: this.title,
                    contentText: this.contentText
                };

                await axios.post(`/api/post?boardId=${this.boardId}`, payload);

                alert("게시글 생성 성공"); // 서버에서 전달받은 메시지
                this.$router.push({ name: "PostList", query: { boardId: this.boardId } });
            } catch (error) {
                console.error("게시글 생성 실패:", error);
                alert("게시글 작성 중 오류가 발생했습니다.");
            } finally {
                this.isSubmitting = false;
            }
        },
        cancelPost() {
            this.$router.push({ name: "PostList", params: { boardId: this.boardId } });
        }
    }
};
</script>

<style scoped>
.post-create {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}
.form-group {
    margin-bottom: 20px;
}
label {
    display: block;
    margin-bottom: 5px;
}
input, textarea {
    width: 100%;
    padding: 10px;
    font-size: 16px;
}
button {
    margin-right: 10px;
    padding: 10px 20px;
    font-size: 16px;
}
</style>