<script setup lang="ts">
import CompetionCard from "@/components/CompetionCard.vue";
import { useAccountStore } from "@/store/account";
import { useCompetitionStore } from "@/store/competion";
import { onMounted, ref } from "vue";

const competitionStore = useCompetitionStore();
const account = useAccountStore();
const competitionDatas = ref([]);
const competionUserLike = ref([]);

const group = ref("全部");
const groupOptions = [
  {
    value: "全部",
    label: "全部",
  },
  {
    value: "小学",
    label: "小学",
  },
  {
    value: "初中",
    label: "初中",
  },
  {
    value: "高中",
    label: "高中",
  },
];
// 预载
onMounted(async () => {
  const competitionStore = useCompetitionStore();
  competitionDatas.value = await competitionStore.getCompetitionData();
  competionUserLike.value = await account.getCompetitionUserLike();
  console.log(competitionDatas.value);
});
// 切换年级分组
const onGroupChange = async () => {
  if (group.value === "全部") {
    competitionDatas.value = await competitionStore.getCompetitionData();
  } else {
    competitionDatas.value = await competitionStore.getCompetitionGroup(
      group.value
    );
  }
};
</script>

<template>
  <div style="padding: 20px; border-radius: 20px; background-color: #eeeeee">
    <div>
      <el-carousel indicator-position="outside">
        <el-carousel-item
          v-for="item in competionUserLike.data"
          :key="item.competitionName"
          ><h3 class="small justify-center" text="2xl">
            {{ item.competitionName }}
          </h3>
          <p>年龄段： {{ item.competitionGroup }}</p>
          <p>举办方： {{ item.competitionOrganizer }}</p>
          <p>竞赛类型： {{ item.competitionType }}</p>
          <el-link
            class="link"
            type="primary"
            target="_blank"
            :href="item.competitionWeb"
            >{{ item.competitionWeb }}</el-link
          >
        </el-carousel-item>
      </el-carousel>
    </div>
    <div style="display: flex; justify-content: flex-start">
      <span style="color: #999">组别：</span>
      <el-select
        @change="onGroupChange"
        v-model="group"
        placeholder="Select"
        size="small"
        style="width: 240px"
      >
        <el-option
          v-for="item in groupOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div>
      <CompetionCard :competitionDatas="competitionDatas" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
