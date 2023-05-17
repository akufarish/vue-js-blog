import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "post.login",
    component: () => import("../pages/login.vue"),
  },
  {
    path: "/dashboard",
    name: "post.dashboard",
    component: () => import("../pages/dashboard.vue"),
  },
  {
    path: "/tambah",
    name: "post.tambah",
    component: () => import("../pages/tambah.vue"),
  },
  {
    path: "/post/:id",
    name: "post.single",
    component: () => import("../pages/single.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
