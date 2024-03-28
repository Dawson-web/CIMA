<template>
  <div
    id="competitionDetail"
    style="padding: 20px; border-radius: 20px; background-color: #eeeeee"
  >
    <CompetionCard :competitionDatas="competitionDatas" />
  </div>
</template>

<script setup lang="ts">
import CompetionCard from "@/components/CompetionCard.vue";
import { useCompetitionStore } from "@/store/competion";
import { onMounted, ref } from "vue";

const competitionDatas = ref([]);

// 获取比赛详细信息
onMounted(async () => {
  const competitionStore = useCompetitionStore();
  competitionDatas.value = await competitionStore.getCompetitionDetail();
  if (competitionDatas.value.length === 0) {
    var newElement = document.createElement("h1"); // 创建一个新的div元素
    newElement.id = "newElement"; // 为新元素设置id
    newElement.innerHTML = "无相关比赛信息"; // 设置元素的内容
    document.querySelector("#competitionDetail").appendChild(newElement); // 将新元素添加到#competitionDetail元素中
  }
});
</script>

<style scoped lang="scss"></style>
