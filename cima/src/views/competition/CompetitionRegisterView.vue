<script setup lang="ts">
import { useCompetitionStore } from "@/store/competion";
import { onMounted, ref } from "vue";

const competitionStore = useCompetitionStore();

const competitionName = ref("世界机器人大会青少年机器人设计与信息素养大赛");
const competitionNameOptions = ref([]);

const competitionRegisterInfo = ref([]);

const getCompetitionData = async () => {
  competitionNameOptions.value = await competitionStore.getCompetitionData();
};

const getCompetitionRegisterInfo = async () => {
  competitionRegisterInfo.value = await competitionStore.getCompetitionRegister(
    competitionName.value
  );
};

onMounted(async () => {
  getCompetitionData();
  getCompetitionRegisterInfo();
});

// 具体竞赛参数详情
const _onSelectChange = async () => {
  getCompetitionRegisterInfo();
};
</script>

<template>
  <h1>竞赛报名情况</h1>
  <div class="chart-box">
    <div style="color: #999; font-size: 14px">
      竞赛详情：
      <el-select
        @change="_onSelectChange"
        v-model="competitionName"
        placeholder="Select"
        size="small"
        style="width: 120px"
      >
        <el-option
          v-for="item in competitionNameOptions"
          :key="item.competitionName"
          :label="item.competitionName"
          :value="item.competitionName"
        />
      </el-select>
    </div>
    <hr />
    <el-table
      :data="competitionRegisterInfo.data"
      style="width: 100%; border-radius: 20px"
    >
      <el-table-column prop="realName" label="姓名" width="180" />
      <el-table-column prop="schoolName" label="学校" width="180" />
      <el-table-column prop="className" label="省份" />
    </el-table>
  </div>
</template>

<style scoped lang="scss">
.chart-box {
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  gap: 10px;
  padding: 20px;
  border-radius: 20px;
  background-color: #eeeeee;
}
</style>
