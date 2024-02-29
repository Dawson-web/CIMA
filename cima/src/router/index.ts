import HomeViewVue from "@/views/HomeView.vue";
import LoginViewVue from "@/views/LoginView.vue";
import NotFoundViewVue from "@/views/NotFoundView.vue";
import RegisterViewVue from "@/views/RegisterView.vue";
import DashboardOverviewViewVue from "@/views/dashboard/DashboardOverviewView.vue";
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeViewVue,
  },
  {
    path: "/login",
    name: "login",
    component: LoginViewVue,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterViewVue,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardOverviewViewVue,
  },
  {
    path: "/:noMatch",
    name: "not-found",
    component: NotFoundViewVue,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
