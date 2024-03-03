<script setup lang="ts">
import router from "@/router/index";
import { useAccountStore } from "@/store/account";
import { useCompetitionStore } from "@/store/competion";
import { Search } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";

const dialogFormVisible = ref(false);
const FormVisible = ref(true);
const updateFormVisible = ref(false);
const updatePasswordVisible = ref(false);

let accountInfo = ref({});
let newAccountInfo = ref({
  newUsername: "",
  newHobbies: "",
});
let newPasswordInfo = ref({
  confirm: "",
  password: "",
});
let keyword = ref("");

const useAccount = useAccountStore();
const competitionStore = useCompetitionStore();

onMounted(async () => {
  const useAccount = useAccountStore();
  await useAccount.getAccountInfo();
  accountInfo = useAccount.account.data;
});

const onSubmitAccountInfo = async () => {
  if (
    newAccountInfo.value.newUsername == "" ||
    newAccountInfo.value.newHobbies == ""
  ) {
    alert("请完整填写个人信息!");
  } else {
    console.log("submit!", newAccountInfo.value);
    await useAccount.updateAccountInfo(newAccountInfo.value);
    FormVisible.value = true;
    updateFormVisible.value = false;
    document.location.reload();
  }
};

const onSubmitPawwsord = async () => {
  if (
    newPasswordInfo.value.confirm == "" ||
    newPasswordInfo.value.password == ""
  ) {
    alert("请输入密码");
  } else if (newPasswordInfo.value.confirm !== newPasswordInfo.value.password) {
    alert("两次输入的密码不一致");
  } else {
    await useAccount.updatePassword(newPasswordInfo.value);
    FormVisible.value = true;
    updatePasswordVisible.value = false;
  }
};

const onSearch = async () => {
  if (keyword.value == "") {
    alert("请输入关键字");
    return;
  }
  competitionStore.serachKeyword = keyword.value;
  router.push(`/dashboard/competitions/detail/${keyword.value}`);
  keyword.value = "";
};
</script>

<template>
  <div class="card-layout">
    <section>
      <div class="common-layout">
        <div class="flex-grow">
          <el-menu
            ellipsis
            class="el-menu-popper-demo"
            mode="horizontal"
            :popper-offset="16"
            default-active="1"
            style="width: 80%"
            router="true"
          >
            <el-menu-item index="1" route="/dashboard/competitions">
              竞赛信息
            </el-menu-item>
            <el-sub-menu index="2">
              <template #title>报名</template>
              <el-menu-item
                index="2-3"
                route="/dashboard/competitions/selfregisterinfo"
                >个人报名情况</el-menu-item
              >
              <el-menu-item
                index="2-2"
                route="/dashboard/competitions/registerinfo"
                >竞赛报名情况</el-menu-item
              >
            </el-sub-menu>
            <el-sub-menu index="3" :popper-offset="8">
              <template #title>Override Popper Offset</template>
              <el-menu-item index="3-1">item one</el-menu-item>
              <el-menu-item index="3-2">item two</el-menu-item>
              <el-menu-item index="3-3">item three</el-menu-item>
              <el-sub-menu index="3-4" :popper-offset="20">
                <template #title>override child</template>
                <el-menu-item index="3-4-1">item one</el-menu-item>
                <el-menu-item index="3-4-2">item two</el-menu-item>
                <el-menu-item index="3-4-3">item three</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>

            <el-menu-item
              class="flex gap-4 mb-4 items-center"
              style="margin-left: 5%"
            >
              <el-input
                v-model="keyword"
                @keyup.enter="onSearch"
                style="width: 500px"
                placeholder="查询"
                :suffix-icon="Search"
              />
            </el-menu-item>
          </el-menu>

          <div @click="dialogFormVisible = true">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
          </div>
        </div>
      </div>

      <el-dialog v-model="dialogFormVisible" title="个人信息" width="500">
        <el-form v-if="FormVisible" class="dialog-content">
          <el-form-item label="姓名:">
            <el-input
              v-model="accountInfo.realName"
              style="width: 240px"
              disabled
              placeholder="
              accountInfo.realName
              "
            />
          </el-form-item>
          <el-form-item label="用户:">
            <el-input
              v-model="accountInfo.username"
              style="width: 240px"
              disabled
              placeholder="
              accountInfo.username
              "
          /></el-form-item>

          <el-form-item label="爱好:">
            <el-input
              v-model="accountInfo.hobbies"
              style="width: 240px"
              disabled
              placeholder="
              accountInfo.hobbies
              "
          /></el-form-item>
          <el-form-item>
            <el-button
              @click="(FormVisible = false), (updatePasswordVisible = true)"
              >更改密码</el-button
            >
            <el-button
              type="primary"
              @click="(updateFormVisible = true), (FormVisible = false)"
            >
              更改用户信息
            </el-button>
          </el-form-item>
        </el-form>
        <el-form v-if="updateFormVisible" class="dialog-content">
          <el-form-item label="用户:">
            <el-input
              v-model="newAccountInfo.newUsername"
              style="width: 240px"
              :placeholder="accountInfo.username"
          /></el-form-item>

          <el-form-item label="爱好:">
            <el-input
              v-model="newAccountInfo.newHobbies"
              style="width: 240px"
              :placeholder="accountInfo.hobbies"
          /></el-form-item>
          <el-form-item>
            <el-button
              @click="(updateFormVisible = false), (FormVisible = true)"
              >取消</el-button
            >
            <el-button type="primary" @click="onSubmitAccountInfo">
              确认更改
            </el-button>
          </el-form-item>
        </el-form>
        <el-form v-if="updatePasswordVisible" class="dialog-content">
          <el-form-item label="新密码">
            <el-input v-model="newPasswordInfo.password" style="width: 240px"
          /></el-form-item>

          <el-form-item label="确认密码">
            <el-input v-model="newPasswordInfo.confirm" style="width: 240px"
          /></el-form-item>
          <el-form-item>
            <el-button
              @click="(updatePasswordVisible = false), (FormVisible = true)"
              >取消</el-button
            >
            <el-button type="primary" @click="onSubmitPawwsord">
              确认更改
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </section>
    <section class="main">
      <slot name="main"></slot>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";

.card-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .dialog-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.flex-grow {
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-around;
}

.main {
  width: 100%;
  height: 80vh;
  margin-top: 20px;
}
</style>
