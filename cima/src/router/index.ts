import HomeViewVue from "@/views/HomeView.vue";
import LoginViewVue from "@/views/LoginView.vue";
import NotFoundViewVue from "@/views/NotFoundView.vue";
import RegisterViewVue from "@/views/RegisterView.vue";
import AdminCommentControlView from "@/views/admin/AdminCommentControlView.vue";
import AdminCompetitionControlView from "@/views/admin/AdminCompetitionControlView.vue";
import TeacherInfoManageView from "@/views/admin/TeacherInfoManageView.vue";
import CompetionViewVue from "@/views/competition/CompetionView.vue";
import CompetitionDetailViewVue from "@/views/competition/CompetitionDetailView.vue";
import CompetitionRegisterViewVue from "@/views/competition/CompetitionRegisterView.vue";
import CompetitionSelfRegisterViewVue from "@/views/competition/CompetitionSelfRegisterView.vue";
import DashboardOverviewViewVue from "@/views/dashboard/DashboardOverviewView.vue";
import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
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
    redirect: { name: "dashboard-competitions" },
    children: [
      {
        path: "/dashboard/teachermanage",
        name: "teacher-manage",
        component: TeacherInfoManageView,
      },
      {
        path: "competitions",
        name: "dashboard-competitions",
        component: CompetionViewVue,
      },
      {
        path: "competitions/detail/:keyword",
        name: "competition-detail",
        component: CompetitionDetailViewVue,
      },
      {
        path: "competitions/selfregisterinfo",
        name: "selfregister-info",
        component: CompetitionSelfRegisterViewVue,
      },
      {
        path: "competitions/registerinfo",
        name: "register-info",
        component: CompetitionRegisterViewVue,
      },
      {
        path: "competitions/control",
        name: "competitions-control",
        component: AdminCompetitionControlView,
      },
      {
        path: "competitions/comment",
        name: "competitions-comment",
        component: AdminCommentControlView,
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    component: NotFoundViewVue,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (
    token ||
    to.path === "/login" ||
    to.path === "/register" ||
    to.path === "/"
  ) {
    if (to.path === "/login" && token) {
      next("/dashboard");
    } else next();
  } else {
    next("/login");
  }
});

export default router;
