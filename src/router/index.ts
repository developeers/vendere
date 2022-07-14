import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import MainView from '@/views/MainView.vue';
import NotificationList from '@/views/notification/NotificationList.vue';
import OrderHistory from '@/views/order/OrderHistory.vue';

export const routeNames = {
  SIGN_UP: "SignUp",
  LOGIN: "Login",
  PRODUCT_CREATE: "ProductCreate",
  HOME: "Home",
  PRODUCT_DETAIL: "ProductDetail",
  SELLER_DETAIL: "SellerDetail",
  NOTIFICATION: "Notification",
  ORDER_HISTORY: "OrderHistory",
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/sign-up",
    name: routeNames.SIGN_UP,
    component: () => import("@/views/auth/SignUp.vue"),
  },
  {
    path: "/login",
    name: routeNames.LOGIN,
    component: () => import("@/views/auth/LoginComponent.vue"),
  },
  {
    path: "/sell",
    name: routeNames.PRODUCT_CREATE,
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
        name: routeNames.HOME,
        component: HomeView,
      },
      {
        path: "/product/:hashId",
        name: routeNames.PRODUCT_DETAIL,
        component: () => import("@/views/products/ProductDetail.vue"),
      },
      {
        path: "/seller/:uid",
        name: routeNames.SELLER_DETAIL,
        component: () => import("@/views/seller/SellerDetail.vue"),
      },
      {
        path: "/notifications",
        name: routeNames.NOTIFICATION,
        component: NotificationList,
      },
      {
        path: "/order-history",
        name: routeNames.ORDER_HISTORY,
        component: OrderHistory,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
