<script setup lang="ts">
import DotBackground from "@/components/DotBackground.vue";
import NavBar from "@/components/NavBar.vue";
import router from "@/router";
import { useAccountStore } from "@/store/account";
import { ref } from "vue";
const registerForm = ref({
  username: "",
  password: "",
  realName: "",
  hobbies: "",
  age: 10,
  grade: "",
});
// do not use same name with ref
const onSubmit = async () => {
  const useAccount = useAccountStore();
  console.log(registerForm.value);

  await useAccount.register(registerForm.value);
  router.push("/login");
};
</script>

<template>
  <div>
    <header>
      <NavBar compact />
    </header>
    <main>
      <h1 class="title">注册 eFresh</h1>
      <div class="login-form-wrapper">
        <ElForm label-position="top">
          <ElFormItem label="用户名">
            <ElInput type="usernmae" v-model="registerForm.username" />
          </ElFormItem>
          <ElFormItem label="密码">
            <ElInput
              type="password"
              show-password
              v-model="registerForm.password"
            />
          </ElFormItem>
          <ElFormItem label="真实姓名">
            <ElInput type="realName" v-model="registerForm.realName" />
          </ElFormItem>
          <ElFormItem label="爱好">
            <ElInput type="hobbies" v-model="registerForm.hobbies" />
          </ElFormItem>
          <ElFormItem label="年龄">
            <el-input-number
              type="age"
              v-model="registerForm.age"
              :min="10"
              :max="100"
            />
          </ElFormItem>
          <ElFormItem label="年级">
            <ElSelect
              type="grade"
              v-model="registerForm.grade"
              placeholder="选择"
            >
              <ElOption label="大一" :value="1" />
              <ElOption label="大二" :value="2" />
            </ElSelect>
          </ElFormItem>
          <br />
          <ElButton style="width: 100%" type="primary" plain @click="onSubmit"
            >注册</ElButton
          >
        </ElForm>
        <div style="display: flex; align-items: center; margin-top: 1rem">
          <ElText>已有账户？</ElText>
          <ElLink type="primary" @click="$router.push({ name: 'login' })"
            >立即登录</ElLink
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
