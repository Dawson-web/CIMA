<script setup>
import { ref, onMounted } from "vue";
import { useCompetitionStore } from "@/store/competion";
import { usePublicStore } from "@/store/public";

const competitionID = ref();
const competition = ref([]);
const competitionStore = useCompetitionStore();
const publicStore = usePublicStore();
const createVisible = ref(false);

onMounted(async () => {
  competition.value = await competitionStore.getCompetitionData();
});
const onSelectChange = async () => {
  publicStore.getComment(competitionID.value);
};
</script>
<template>
  <div>
    <el-button type="primary" @click="createVisible = true"
      >新增竞赛信息</el-button
    >
    <div style="color: #999; font-size: 14px">
      评价竞赛：
      <el-select
        @change="onSelectChange"
        v-model="competitionID"
        placeholder="Select"
        size="small"
        style="width: 120px"
      >
        <el-option
          v-for="item in competition"
          :key="item.competitionName"
          :label="item.competitionName"
          :value="item.id"
        />
      </el-select>
    </div>
    <el-dialog v-model="createVisible" title="评价" width="600">
      <el-form
        label-width="auto"
        label-position="right"
        :model="homeworkInfo"
        style="max-width: 600px"
      >
        <el-form-item label="评价内容">
          <el-input
            style="width: 500px"
            v-model="topic"
            :rows="2"
            type="textarea"
            disabled
          />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="dodeleteCompetition">取消</el-button>

      <el-button type="primary" @click="dodeleteCompetition">确认</el-button>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
$primary-color: #1b2845;
$secondary-color: #9097a2;
$background-color: #e8e8e8;
$card-color: #ffffff;

.el-button {
  color: $primary-color;
  border-color: $primary-color;

  &:hover,
  &--primary {
    background-color: $primary-color;
    color: #c2c1c1;
  }
}
</style>
