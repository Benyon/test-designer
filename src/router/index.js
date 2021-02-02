import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue')
  },
  {
    path: '/Library',
    name: 'Library',
    component: () => import('../views/Library.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/test:testId',
    name: 'Test',
    component: () => import('../views/Test.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
