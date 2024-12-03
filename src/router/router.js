import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/components/layout/MainPage.vue';
import SigninPage from '@/components/user/UserSignin.vue';
import SignupPage from '@/components/user/UserSignUp.vue';
import UserDetailPage from '@/components/user/UserDetails.vue';
import UserUpdatePage from '@/components/user/UserUpdate.vue'
import PostList from "@/components/post/PostList.vue";
import AdminSignin from "@/components/admin/AdminSignin.vue";
import AdminSignup from "@/components/admin/AdminSignup.vue";
import PostCreate from "@/components/post/PostCreate.vue";
// import AdminDashboard from "@/components/admin/AdminDashboard.vue";

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainPage,
  },
  {
    path: '/signin',
    name: 'Signin',
    component: SigninPage,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupPage,
  },
  {
    path: '/detail',
    name: 'UserDetail',
    component: UserDetailPage,
  },
  {
    path: '/update-user',
    name: 'UpdateUser',
    component: UserUpdatePage,
  },
  {
    path: '/post/:boardId/list',
    name: 'PostList',
    props: true,
    component: PostList,
  },
  {
    path: '/admin/signin',
    name: 'AdminSignin',
    component: AdminSignin,
  },
  {
    path: '/admin/signup',
    name: 'AdminSignup',
    component: AdminSignup,
  },
  {
    path: '/post/:boardId/create',
    name: 'PostCreate',
    component: PostCreate,
    props: true
  },
  /*{
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: AdminDashboard,
  }*/
];
const router = createRouter({
      history: createWebHistory(), routes
    }
)
export default router;
