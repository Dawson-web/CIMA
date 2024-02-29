<script setup lang="ts">
import DotBackground from "@/components/DotBackground.vue";
import NavBar from "@/components/NavBar.vue";
import router from "@/router";
import { useAccountStore } from "@/store/account";
import { ref } from "vue";
const loginForm = ref({
  usernmae: "",
  password: "",
});

const onSubmit = () => {
  const useAccount = useAccountStore();
  useAccount.login(loginForm.value);
  router.push("/dashboard");
};
</script>

<template>
  <div>
    <header>
      <NavBar compact />
    </header>
    <main>
      <h1 class="title">登录 eFresh</h1>
      <div class="login-form-wrapper">
        <ElForm label-position="top">
          <ElFormItem label="用户名">
            <ElInput type="usernmae" v-model="loginForm.usernmae" />
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
    margin-top: 2svh;
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
