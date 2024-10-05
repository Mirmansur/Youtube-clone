import { createRouter, createWebHashHistory } from "vue-router";
import AppHome from "../components/home/AppHome.vue";

const routes = [
  {
    path: "/",
    name: "AppHome",
    component: AppHome,
  },
  {
    path: "/appshorts",
    name: "AppShorts",
    component: () => import("../components/shorts/AppShorts.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
