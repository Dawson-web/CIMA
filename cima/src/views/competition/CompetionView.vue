<script setup lang="ts">
import CompetionCard from "@/components/CompetionCard.vue";
import { useCompetitionStore } from "@/store/competion";
import { onMounted, ref } from "vue";

const competitionStore = useCompetitionStore();
const competitionDatas = ref([]);

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
];

onMounted(async () => {
  const competitionStore = useCompetitionStore();
  competitionDatas.value = await competitionStore.getCompetitionData();
});

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
  <div class="competion-view">
    <div>
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 text="2xl" justify="center">{{ item }}</h3>
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
.competion-view {
  width: 100%;
  height: 100%;
}
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
