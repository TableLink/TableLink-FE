<script>
import MainHeader from "@/components/layout/MainHeader.vue";
import axios from "@/axios";

export default {
    components: {MainHeader},
    name: "PostList",
    props: ['boardId'],
    data() {
        return {
            boards: [],
            posts: [],
        };
    },
    methods: {
        async fetchBoards() {
            try {
                const response = await axios.get("/api/board/list");
                this.boards = response.data.result;
            } catch (error) {
                console.error("게시판 불러오기 실패", error);
            }
        },
        async fetchPosts(boardId) {
            try {
                const response = await axios.get(`/api/post/${boardId}/list`);
                this.posts = response.data.result;
            } catch (error) {
                console.error("게시글 불러오기 실패");
            }
        }
    },
    watch: {
        boardId: 'fetchPosts' // boardId가 변경되면 fetchPosts 호출
    },
    mounted() {
        this.fetchBoards()
        this.fetchPosts(this.boardId);
    }
}
</script>

<template>
    <MainHeader/>
    <h2>
        {{ boardName }}
    </h2>
    <table id="post-list">
        <thead>
        <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성 일자</th>
        </tr>
        </thead>
        <tbody v-if="posts.length">
        <tr v-for="post in posts" :key="post.id">
            <td>{{post.id}}</td>
            <td>{{post.title}}</td>
            <td>{{post.createdAt}}</td>
        </tr>
        </tbody>
    </table>
</template>

<style scoped>

</style>