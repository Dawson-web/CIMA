<script setup lang="ts">
import DotBackground from "@/components/DotBackground.vue";
import NavBar from "@/components/NavBar.vue";
import router from "@/router";
import { useAccountStore } from "@/store/account";
import { ElMessage } from "element-plus";
import { ref } from "vue";

const registerForm = ref({
  username: "",
  password: "",
  realName: "",
  hobbies: [],
  age: 1,
  grade: 0,
  school: "",
  province: "",
});
const province = [
  "四川省",
  "贵州省",
  "云南省",
  "西藏自治区",
  "陕西省",
  "甘肃省",
  "青海省",
  "宁夏回族自治区",
  "新疆维吾尔自治区",
  "河北省",
  "山西省",
  "内蒙古自治区",
  "辽宁省",
  "吉林省",
  "黑龙江省",
  "江苏省",
  "浙江省",
  "安徽省",
  "福建省",
  "江西省",
  "山东省",
  "河南省",
  "湖北省",
  "湖南省",
  "广东省",
  "广西壮族自治区",
  "海南省",
  "北京市",
  "天津市",
  "上海市",
  "重庆市",
];
const hobbies = [
  { label: "数学", value: "1" },
  { label: "计算机科学", value: "2" },
  { label: "文学", value: "3" },
  { label: "自然科学", value: "4" },
  { label: "科研创新", value: "5" },
  { label: "绘画", value: "6" },
  { label: "体育运动", value: "7" },
  { label: "百科知识", value: "8" },
];
// 提交注册信息表
const onSubmit = async () => {
  registerForm.value.hobbies = registerForm.value.hobbies.join(",");
  const useAccount = useAccountStore();
  await useAccount.register(registerForm.value);
  ElMessage({
    type: "success",
    message: "账号注册成功",
  });
  router.push("/login");
};
</script>

<template>
  <div>
    <header>
      <NavBar compact />
    </header>
    <main>
      <h1 class="title">注册 cIMA</h1>
      <div class="register-form-wrapper">
        <ElForm label-position="left" class="register-form">
          <ElFormItem label="用户:">
            <ElInput type="usernmae" v-model="registerForm.username" />
          </ElFormItem>
          <ElFormItem label="密码:">
            <ElInput
              type="password"
              show-password
              v-model="registerForm.password"
            />
          </ElFormItem>
          <ElFormItem label="姓名:">
            <ElInput type="realName" v-model="registerForm.realName" />
          </ElFormItem>
          <ElFormItem label="爱好:">
            <el-checkbox-group v-model="registerForm.hobbies">
              <el-checkbox
                v-for="item in hobbies"
                :label="item.value"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</el-checkbox
              >
            </el-checkbox-group>
          </ElFormItem>
          <ElFormItem label="学校:">
            <ElInput type="school" v-model="registerForm.school" />
          </ElFormItem>
          <ElFormItem label="年龄:">
            <el-input-number
              type="age"
              v-model="registerForm.age"
              :min="1"
              :max="20"
            />
          </ElFormItem>
          <ElFormItem label="年级:">
            <ElSelect
              type="grade"
              v-model="registerForm.grade"
              placeholder="选择"
              style="min-width: 100px"
            >
              <ElOption label="小学" :value="0" />
              <ElOption label="初中" :value="1" />
              <ElOption label="高中" :value="2" />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="省份:">
            <ElSelect
              type="province"
              v-model="registerForm.province"
              placeholder="选择"
              style="min-width: 100px"
            >
              <ElOption
                v-for="item in province"
                :key="item"
                :label="item"
                :value="item"
              />
            </ElSelect>
          </ElFormItem>
        </ElForm>

        <ElButton style="width: 100%" type="primary" plain @click="onSubmit"
          >注册</ElButton
        >
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

.register-form-wrapper {
  width: 280px;
  padding: 3rem 2rem;
  background-color: #fff;
  border-radius: $border-radius-lg;
  .register-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
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
