<template>
    <MainHeader/>
    <h2>
        {{ boardName }}
    </h2>
    <div>
        <!-- 게시글 생성 링크 클릭 시 로그인 상태 확인 후 이동 -->
        <a @click="checkLoginAndNavigate" href="javascript:void(0)">
            게시글 생성하기
        </a>
    </div>
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
            <td>{{ post.id }}</td>
            <td>{{ post.title }}</td>
            <td>{{ post.createdAt }}</td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr>
            <td colspan="3">게시글이 없습니다.</td>
        </tr>
        </tbody>
    </table>
    <div id="pagination" v-if="totalPages > 1">
        <button @click="handlePageChange('prev')" :disabled="currentPage === 0">이전</button>
        <span>{{ currentPage + 1 }}/{{ totalPages }}</span>
<!--        <button
            v-for="page in totalPages"
            :key="page"
            :class="{ active: currentPage === page }"
            @click="goToPage(page)">
            {{ page }}
        </button>-->
        <button @click="handlePageChange('next')" :disabled="currentPage === totalPages - 1">다음</button>
    </div>
</template>

<script>
import MainHeader from "@/components/layout/MainHeader.vue";
import axios from "@/axios";

export default {
    computed: {
        // Vuex에서 로그인 상태 가져오기
        isLoggedIn() {
            return this.$store.getters.isSignin;
        }
    },
    components: {MainHeader},
    name: "PostList",
    props: ['boardId'],
    data() {
        return {
            boards: [],
            posts: [],
            boardName: "", // 게시판 이름 초기값
            currentPage: 0, // 현재 페이지
            pageSize: 10,   // 한 페이지당 게시글 수
            totalPages: 0   // 총 페이지 수
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
                const response = await axios.get(`/api/post/${boardId}/list`,{
                    params: {
                        keyword: this.keyword,
                        page: this.currentPage,
                        size: this.pageSize
                    }
                });
                const data = response.data.result;
                this.posts = data.content;
                this.totalPages = data.totalPages;
            } catch (error) {
                console.error("게시글 불러오기 실패");
            }
        },
        checkLoginAndNavigate() {
            if (this.isLoggedIn) {
                this.$router.push({ name: 'PostCreate', query: { boardId: this.boardId } });
            } else {
                this.$router.push({ name: 'Signin' });
            }
        },
        /*goToPage(page) {
            if (page > 0 && page <= this.totalPages) {
                this.fetchPosts(page);
            }
        },*/
        handlePageChange(direction) {
            // 방향에 따라 페이지 변경
            if (direction === 'prev' && this.currentPage > 0) {
                this.currentPage--;
            } else if (direction === 'next' && this.currentPage < this.totalPages) {
                this.currentPage++;
            }
            this.fetchPosts(this.boardId);
        }
    },
    watch: {
        boardId(newId) {
            console.log("boardId updated:", newId); // 변경된 boardId 값 출력
            this.fetchPosts(newId);

            // boardId가 변경될 때 boardName도 업데이트
            const selectedBoard = this.boards.find(board => board.id === newId);
            this.boardName = selectedBoard ? selectedBoard.name : "알 수 없음";
        }
    },
    mounted() {
        console.log("boardId on mounted:", this.boardId); // boardId 값 출력
        this.fetchBoards()
        this.fetchPosts(this.boardId);
    }
}
</script>

<style>
#pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 5px;
}
#pagination button {
    padding: 5px 10px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    cursor: pointer;
}
#pagination button.active {
    background-color: #007bff;
    color: white;
    font-weight: bold;
}
#pagination button:hover:not(.active) {
    background-color: #e9ecef;
}
</style>
