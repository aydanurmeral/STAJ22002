import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/entrance/login.vue';
import MainPage from '@/views/MainPage.vue';
import ForgotPassword from '@/views/entrance/forgot.vue';
import Signup from '@/views/entrance/signup.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/login', component: LoginPage },
  { path: '/main', component: MainPage },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/signup', component: Signup },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
