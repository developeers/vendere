import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import MainView from '@/views/MainView.vue';
import NotificationList from '@/views/notification/NotificationList.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/sign-up",
    name: "SignUp",
    component: () => import("@/views/auth/SignUp.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/LoginComponent.vue"),
  },
  {
    path: "/sell",
    name: "ProductCreate",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/views/products/ProductCreate.vue"
      ),
  },
  {
    path: "/",
    name: "MainView",
    component: MainView,
    children: [
      {
        path: "/",
        name: "home",
        component: HomeView,
      },
      {
        path: "/product/:hashId",
        name: "ProductDetail",
        component: () => import("@/views/products/ProductDetail.vue"),
      },
      {
        path: "/seller/:uid",
        name: "SellerDetail",
        component: () => import("@/views/seller/SellerDetail.vue"),
      },
      {
        path: "/notifications",
        name: "Notification",
        component: NotificationList,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
