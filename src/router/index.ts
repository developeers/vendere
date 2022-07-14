import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import PageNotFound from '@/components/utils/PageNotFound.vue';
import UserModule from '@/store/modules/User';
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
  PAGE_NOT_FOUND: "PageNotFound",
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
  {
    path: "/:pathMatch(.*)*",
    name: routeNames.PAGE_NOT_FOUND,
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const notAllowUnauthenticatedUserUrls = [
  routeNames.PRODUCT_CREATE,
  routeNames.NOTIFICATION,
  routeNames.ORDER_HISTORY,
];

const notAllowAuthenticatedUserUrls = [routeNames.LOGIN, routeNames.SIGN_UP];

router.beforeEach((to) => {
  const destinationRouteName = to.name as string;
  if (
    !UserModule.isLogin &&
    notAllowUnauthenticatedUserUrls.includes(destinationRouteName)
  ) {
    return { name: routeNames.LOGIN };
  }
  if (
    UserModule.isLogin &&
    notAllowAuthenticatedUserUrls.includes(destinationRouteName)
  ) {
    return { name: routeNames.HOME };
  }
});

export default router;
