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
</script>
<template>
  <div>
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
