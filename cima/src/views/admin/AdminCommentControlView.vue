<script setup>
import { useCompetitionStore } from "@/store/competion";
import { usePublicStore } from "@/store/public";
import { onMounted, ref } from "vue";

const competitionID = ref();
const competition = ref([]);
const competitionStore = useCompetitionStore();
const publicStore = usePublicStore();
const createVisible = ref(false);
const commentForm = ref({});
const comments = ref([]);
onMounted(async () => {
  competition.value = await competitionStore.getCompetitionData();
});
const onSelectChange = async () => {
  comments.value = await publicStore.getComment(competitionID.value);
  console.log(comments.value);
};
const createComment = async () => {
  console.log(commentForm.value);
  commentForm.value.parentId = -1;
  await publicStore.addComment(commentForm.value);
  createVisible.value = false;
};
</script>
<template>
  <div>
    <el-button type="primary" @click="createVisible = true">竞赛评价</el-button>
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
      <el-descriptions title="用户评价" v-for="item in comments" :key="item.id">
        <el-descriptions-item label="用户名">{{
          item.username
        }}</el-descriptions-item>
        <el-descriptions-item label="内容">
          <el-tag size="small">{{ item.content }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <el-dialog v-model="createVisible" title="评价" width="600">
      <el-form
        label-width="auto"
        label-position="right"
        :model="commentForm"
        style="max-width: 600px"
      >
        <el-form-item label="竞赛">
          <el-select
            v-model="commentForm.competitionId"
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
        </el-form-item>
        <el-form-item label="评价内容">
          <el-input
            style="width: 500px"
            v-model="commentForm.content"
            :rows="2"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="留名">
          <el-input
            style="width: 500px"
            v-model="commentForm.username"
            :rows="2"
          />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="dodeleteCompetition">取消</el-button>

      <el-button type="primary" @click="createComment">确认</el-button>
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
