<script setup lang="ts">
import router from "@/router/index";
import { useAccountStore } from "@/store/account";
import { useCompetitionStore } from "@/store/competion";
import { Search } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { onMounted, ref } from "vue";

const dialogFormVisible = ref(false);
const FormVisible = ref(true);
const updateFormVisible = ref(false);
const updatePasswordVisible = ref(false);

let accountInfo = ref({
  username: "",
  realName: "",
  hobbies: "",
  createTime: 0,
  updateTime: 0,
  age: 0,
  grade: 0,
  school: "",
  province: "",
});
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
const isCollapse = ref(false);
// 预载
onMounted(async () => {
  const useAccount = useAccountStore();
  await useAccount.getAccountInfo();
  accountInfo = useAccount.account;
});
// 更改用户信息
const onSubmitAccountInfo = async () => {
  if (
    newAccountInfo.value.newUsername == "" ||
    newAccountInfo.value.newHobbies == ""
  ) {
    ElMessage({
      type: "info",
      message: "请完整填写用户信息",
    });
  } else {
    console.log("submit!", newAccountInfo.value);
    await useAccount.updateAccountInfo(newAccountInfo.value);
    FormVisible.value = true;
    updateFormVisible.value = false;
    document.location.reload();
    ElMessage({
      type: "success",
      message: "用户信息更新成功",
    });
  }
};
// 更改密码
const onSubmitPawwsord = async () => {
  if (
    newPasswordInfo.value.confirm == "" ||
    newPasswordInfo.value.password == ""
  ) {
    ElMessage({
      type: "info",
      message: "请正确输入密码",
    });
  } else if (newPasswordInfo.value.confirm !== newPasswordInfo.value.password) {
    ElMessage({
      type: "info",
      message: "两次输入的密码不一致",
    });
  } else {
    await useAccount.updatePassword(newPasswordInfo.value);
    FormVisible.value = true;
    updatePasswordVisible.value = false;
    ElMessage({
      type: "success",
      message: "密码更新成功",
    });
  }
};
// 竞赛信息关键字查询
const onSearch = async () => {
  if (keyword.value == "") {
    alert("请输入关键字");
    return;
  }
  competitionStore.serachKeyword = keyword.value;
  router.push(`/dashboard/competitions/detail/${keyword.value}`);
  keyword.value = "";
};
// 退出登录
const loginOut = () => {
  ElMessageBox.confirm("是否确认退出此账户?", "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "账号已退出",
      });
      localStorage.removeItem("token");
      router.push("/login");
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消此操作",
      });
    });
};
// 判断用户权限
const judgeUserType = () => {
  return localStorage.getItem("user") === "admin";
};
</script>

<template>
  <div class="card-layout">
    <aside>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        router="true"
        :collapse="isCollapse"
      >
        <div @click="dialogFormVisible = true">
          <el-avatar
            shape="square"
            size="large "
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
        </div>
        <el-input
          v-model="keyword"
          @keyup.enter="onSearch"
          autosize
          style="width: 90%; padding: 10px"
          placeholder="回车(Enter)查询"
          :suffix-icon="Search"
        />

        <el-menu-item index="1" route="/dashboard/competitions">
          <el-icon><ChatDotSquare /></el-icon>
          <template #title> 竞赛信息 </template>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title
            ><el-icon><Monitor /></el-icon> <span>报名 </span></template
          >

          <el-menu-item
            index="2-1"
            route="/dashboard/competitions"
            v-if="judgeUserType()"
          >
            报名信息处理
          </el-menu-item>
          <el-menu-item index="2-2" route="/dashboard/competitions/registerinfo"
            >竞赛报名情况</el-menu-item
          >
          <el-menu-item
            index="2-3"
            route="/dashboard/competitions/registerchart"
            >竞赛Chart图</el-menu-item
          >
          <el-menu-item
            v-if="!judgeUserType()"
            index="2-4"
            route="/dashboard/competitions/selfregisterinfo"
            >个人报名情况</el-menu-item
          >
        </el-sub-menu>

        <el-menu-item
          index="3"
          route="/dashboard/competitions/control"
          v-if="judgeUserType()"
        >
          <el-icon><Menu /></el-icon>
          <template #title>竞赛设置</template>
        </el-menu-item>
        <el-menu-item index="4" route="/dashboard/competitions/comment">
          <el-icon><ChatLineRound /></el-icon>
          <template #title> 竞赛评论</template>
        </el-menu-item>
        <el-menu-item
          index="5"
          route="/dashboard/teachermanage"
          v-if="judgeUserType()"
        >
          <el-icon><Avatar /></el-icon>
          <template #title> 教师管理</template>
        </el-menu-item>
        <el-menu-item
          index="6"
          route="/dashboard/usermanage"
          v-if="judgeUserType()"
        >
          <el-icon><UserFilled /></el-icon>
          <template #title> 用户管理</template>
        </el-menu-item>
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
          <el-radio-button :label="false">open</el-radio-button>
          <el-radio-button :label="true">close</el-radio-button>
        </el-radio-group>
        <br />
        <el-button type="danger" @click="loginOut"> 退出 </el-button>
      </el-menu>

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
          <el-form-item label="年龄:">
            <el-input
              v-model="accountInfo.age"
              style="width: 240px"
              disabled
              placeholder="
              accountInfo.age
              "
          /></el-form-item>
          <el-form-item label="年级:">
            <ElSelect
              type="grade"
              v-model="accountInfo.grade"
              style="width: 240px"
              disabled
            >
              <ElOption disabled label="小学" :value="0" />
              <ElOption disabled label="初中" :value="1" />
              <ElOption disabled label="高中" :value="2" />
            </ElSelect>
          </el-form-item>
          <el-form-item label="学校:">
            <el-input
              v-model="accountInfo.school"
              style="width: 240px"
              disabled
              placeholder="
              accountInfo.hobbies
              "
          /></el-form-item>
          <el-form-item label="省份:">
            <el-input
              v-model="accountInfo.province"
              style="width: 240px"
              disabled
              placeholder="
              accountInfo.hobbies
              "
          /></el-form-item>
          <el-form-item>
            <el-button
              plain
              @click="(FormVisible = false), (updatePasswordVisible = true)"
              >更改密码</el-button
            >
            <el-button
              plain
              type="primary"
              @click="(updateFormVisible = true), (FormVisible = false)"
            >
              更改信息
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
    </aside>
    <section class="main">
      <slot name="main"></slot>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";

.card-layout {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  column-gap: 20px;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
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
}
</style>
