import {createRouter, createWebHistory} from 'vue-router';
import MainPage from '@/components/layout/MainPage.vue';
import SigninPage from '@/components/user/UserSignin.vue';
import SignupPage from '@/components/user/UserSignUp.vue';
import UserDetailPage from '@/components/user/UserDetails.vue';
import UserUpdatePage from '@/components/user/UserUpdate.vue'

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
  }
];
const router = createRouter({
      history: createWebHistory(), routes
    }
)
export default router;
