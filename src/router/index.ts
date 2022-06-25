import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import HomeView from '../views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/product/create',
    name: 'ProductCreate',
    component: () => import(/* webpackChunkName: "about" */ '@/views/products/ProductCreate.vue')
  },
  {
    path: '/product/:hashId',
    name: 'ProductDetail',
    component: () => import('@/views/products/ProductDetail.vue')
  },
  {
    path: '/seller/:uid',
    name: 'SellerDetail',
    component: () => import('@/views/seller/SellerDetail.vue')
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('@/views/auth/SignUp.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginComponent.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
