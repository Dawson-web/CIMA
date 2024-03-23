<script setup lang="ts">
import { useAccountStore } from "@/store/account";
import { ElMessage } from "element-plus";
import { defineProps, onMounted, ref } from "vue";
const props = defineProps({
  competitionDatas: Array,
});

const useAccount = useAccountStore();

const accountInfo = ref({});
const competitionDialogVisible = ref(false);
const competitionRegisterForm = ref({
  competitionName: "",
  competitionType: "",
  schoolName: "",
  province: "",
});

const createVisible = ref(false);
const newCompetitionForm = ref({});

const judgeUserType = () => {
  return localStorage.getItem("user") === "admin";
};

// 预载
onMounted(async () => {
  accountInfo.value = await useAccount.getAccountInfo();
});
// 取消报名操作
const refuseRegister = () => {
  competitionDialogVisible.value = false;
  competitionRegisterForm.value = {
    competitionName: "",
    competitionType: "",
    schoolName: "",
    province: "",
  };
};
// 比赛报名
const onSubmitRegister = () => {
  competitionDialogVisible.value = false;
  competitionRegisterForm.value.schoolName = accountInfo.value.data.school;
  competitionRegisterForm.value.province = accountInfo.value.data.province;
  useAccount.submitCompetitionRegister(competitionRegisterForm.value);
  ElMessage.success("报名成功");
};

const createCompetition = () => {
  createVisible.value = true;
};

const cancleCreateCompetition = () => {
  createVisible.value = false;
  newCompetitionForm.value = {};
};
const doCreateCompetition = async () => {
  createVisible.value = false;
  await useAccount.addCompetition(newCompetitionForm.value);
  newCompetitionForm.value = {};
};
const deleteCompetition = async (name: string) => {
  await useAccount.deleteCompetition(name);
  ElMessage({
    type: "success",
    message: "竞赛删除成功",
  });
  location.reload();
};
const exportCompetition = async () => {
  const res = await useAccount.exportCompetition();
  const url = window.URL.createObjectURL(new Blob([res]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "competition.xlsx"); // 设定下载的文件名
  document.body.appendChild(link);
  link.click();
};
</script>
<template>
  <div>
    <el-button type="primary" v-if="judgeUserType()" @click="createCompetition"
      >新增竞赛信息</el-button
    >
    <el-dialog
      v-model="createVisible"
      title="发布作业"
      width="600"
      class="info-card"
    >
      <el-form label-width="auto" :model="newCompetitionForm" class="info-form">
        <el-form-item label="名称">
          <el-input
            v-model="newCompetitionForm.competitionName"
            class="input-field"
          />
        </el-form-item>

        <el-form-item label="介绍">
          <el-input
            v-model="newCompetitionForm.competitionDesc"
            class="input-field"
          />
        </el-form-item>

        <el-form-item label="学龄段">
          <el-input
            v-model="newCompetitionForm.competitionGroup"
            class="input-field"
          />
        </el-form-item>

        <el-form-item label="举办方">
          <el-input
            v-model="newCompetitionForm.competitionOrganizer"
            class="input-field"
          />
        </el-form-item>

        <el-form-item label="类型">
          <el-input
            v-model="newCompetitionForm.competitionType"
            class="input-field"
          />
        </el-form-item>

        <el-form-item label="网站">
          <el-input
            v-model="newCompetitionForm.competitionWeb"
            class="input-field"
          />
        </el-form-item>
      </el-form>
      <div class="button-container">
        <el-button @click="cancleCreateCompetition" class="update-button"
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="doCreateCompetition"
          class="confirm-button"
          >发布</el-button
        >
      </div>
    </el-dialog>
    <el-button type="primary" @click="exportCompetition"
      >导出全部竞赛信息</el-button
    >
    <el-row :gutter="12">
      <el-col
        :span="8"
        v-for="item in props.competitionDatas.data"
        :key="item.id"
      >
        <el-card shadow="hover" class="competion-card"
          ><h4>
            <el-button
              key="primary"
              type="primary"
              text
              @click="
                (competitionRegisterForm.competitionName =
                  item.competitionName),
                  (competitionRegisterForm.competitionType =
                    item.competitionType),
                  (competitionDialogVisible = true)
              "
            >
              {{ item.competitionName }}</el-button
            >
            <el-button
              text
              type="danger"
              v-if="judgeUserType()"
              @click="deleteCompetition(item.competitionName)"
            >
              删除</el-button
            >
          </h4>

          <div>
            <span>{{ item.competitionOrganizer }}</span>
            <div class="bottom">
              <span class="type">类别：{{ item.competitionType }}</span>
              <span class="type">年龄段: {{ item.competitionGroup }}</span>
              <span class="type desc"
                ><p>介绍：{{ item.competitionDesc }}</p></span
              >
            </div>
            <el-link
              class="link"
              type="primary"
              target="_blank"
              :href="item.competitionWeb"
              >{{ item.competitionWeb }}</el-link
            >
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      v-model="competitionDialogVisible"
      title="比赛报名"
      width="800"
      center
    >
      <el-form
        label-position="top"
        label-width="auto"
        :model="competitionRegisterForm"
        style="max-width: 40%; margin: 0 auto"
      >
        <el-form-item label="比赛:">
          <el-input
            disabled
            v-model="competitionRegisterForm.competitionName"
          />
        </el-form-item>
        <el-form-item label="类型:">
          <el-input
            disabled
            v-model="competitionRegisterForm.competitionType"
          />
        </el-form-item>
        <el-form-item label="学校:">
          <el-input v-model="accountInfo.data.school" />
        </el-form-item>
        <el-form-item label="省份:">
          <el-input v-model="accountInfo.data.province" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="refuseRegister">取消</el-button>
          <el-button type="primary" @click="onSubmitRegister"> 报名 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
  <el-affix :offset="120"> </el-affix>
</template>
<style scoped lang="scss">
.competion-card {
  height: 300px;
  margin-top: 10px;
  .type {
    font-size: 12px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
  }

  .desc {
    height: 80px;
    width: 100%;
    overflow: hidden;
  }
  .link {
    float: right;
    margin-top: 8px;
    padding: 0;
    min-height: auto;
  }
}
</style>
