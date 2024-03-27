<script setup lang="ts">
import DotBackground from "@/components/DotBackground.vue";
import NavBar from "@/components/NavBar.vue";
import router from "@/router";
import { useAccountStore } from "@/store/account";
import { useAdminStore } from "@/store/admin";
import { ElMessage } from "element-plus";
import { ref } from "vue";

const userType = ref("admin");
const loginForm = ref({
  username: "",
  password: "",
});
// 登录
const onSubmit = async () => {
  const useAccount = useAccountStore();
  const useAdmin = useAdminStore();
  if (userType.value == "user") {
    await useAccount.login(loginForm.value);
    localStorage.setItem("user", "user");
  } else {
    await useAdmin.adminLogin(loginForm.value);
    localStorage.setItem("user", "admin");
  }
  // 检测数据
  if (localStorage.getItem("token")) {
    router.push("/dashboard");
  } else if (loginForm.value.username == "" || loginForm.value.password == "") {
    ElMessage({
      type: "info",
      message: "请正确输入账号和密码",
    });
  } else {
    ElMessage({
      type: "info",
      message: "密码错误",
    });
  }
};
</script>

<template>
  <div>
    <header>
      <NavBar compact />
    </header>
    <main>
      <h1 class="title">登录 cIMA</h1>
      <div class="login-form-wrapper">
        <el-radio-group
          v-model="userType"
          style="display: flex; justify-content: center"
          @change="console.log(userType)"
        >
          <el-radio-button label="user" value="user">用户</el-radio-button>
          <el-radio-button label="admin" value="admin">管理员</el-radio-button>
        </el-radio-group>
        <ElForm label-position="top">
          <ElFormItem label="用户名">
            <ElInput type="usernmae" v-model="loginForm.username" />
          </ElFormItem>
          <ElFormItem label="密码" style="margin-bottom: calc(18px - 1.2rem)">
            <ElInput
              type="password"
              show-password
              v-model="loginForm.password"
            />
          </ElFormItem>
          <br />
          <ElButton style="width: 100%" type="primary" plain @click="onSubmit"
            >登录</ElButton
          >
        </ElForm>
        <div style="display: flex; align-items: center; margin-top: 1rem">
          <ElText>没有账户？</ElText>
          <ElLink type="primary" @click="$router.push({ name: 'register' })"
            >立即注册</ElLink
          >
        </div>
      </div>
    </main>
    <DotBackground />
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";

header {
  margin-top: 8svh;

  @media (max-height: $mobile-height-breakpoint) {
    margin-top: 0;
  }
}

main {
  margin-top: 8svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (max-height: $mobile-height-breakpoint) {
    margin-top: 10svh;
  }
}

.title {
  font-weight: 200;
}

.login-form-wrapper {
  width: 280px;
  padding: 3rem 2rem;
  background-color: #fff;
  border-radius: $border-radius-lg;
}

.captcha-wrapper {
  width: 100%;
  display: flex;
  gap: 0.5rem;

  .captcha {
    border: 1px solid rgba(0, 0, 0, 0.2);
    background-color: #fff;
    background-size: 100% 100%;
    flex: 2;
    border-radius: $border-radius-md;
  }
}
</style>
