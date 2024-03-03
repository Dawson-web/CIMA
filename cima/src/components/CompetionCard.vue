<script setup lang="ts">
import { useCompetitionStore } from "@/store/competion";
import { defineProps, ref } from "vue";
const props = defineProps({
  competitionDatas: Array,
});

const competitionDialogVisible = ref(false);
const competitionRegisterInfo = ref([]);
const competitionName = ref("");

const onGetCompetitionRegister = async (competition_name: string) => {
  competitionName.value = competition_name;
  competitionDialogVisible.value = true;
  const competitionStore = useCompetitionStore();
  competitionRegisterInfo.value = await competitionStore.getCompetitionRegister(
    competition_name
  );
  console.log(competitionRegisterInfo.value);
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
              @click="onGetCompetitionRegister(item.competitionName)"
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
      :title="competitionName"
      width="800"
      center
    >
      <span>
        It should be noted that the content will not be aligned in center by
        default
      </span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="competitionDialogVisible = false"
            >Cancel</el-button
          >
          <el-button type="primary" @click="competitionDialogVisible = false">
            Confirm
          </el-button>
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
