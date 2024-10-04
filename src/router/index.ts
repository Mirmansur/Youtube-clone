import { createRouter, createWebHashHistory } from "vue-router";
import AppHome from "../components/home/AppHome.vue";

const routes = [
  {
    path: "/",
    name: "AppHome",
    component: AppHome,
  },
  {
    path: "/single/:id",
    name: "AppSingle",
    component: () => import("../components/single/AppSingle.vue"),
  },
  // If you uncomment the below routes, make sure the paths are correct.
  // {
  //   path: "/like",
  //   name: "Like",
  //   component: () => import(""), // Add the correct path here
  // },
  // {
  //   path: "/cart",
  //   name: "Cart",
  //   component: () => import("../components/cart/Cart.vue"),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
