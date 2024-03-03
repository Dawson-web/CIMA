<template>
  <div>
    <CompetionCard :competitionDatas="competitionDatas" />
  </div>
</template>

<script setup lang="ts">
import CompetionCard from "@/components/CompetionCard.vue";
import { useCompetitionStore } from "@/store/competion";
import { onMounted, ref } from "vue";

const competitionDatas = ref([]);

onMounted(async () => {
  const competitionStore = useCompetitionStore();
  competitionDatas.value = await competitionStore.getCompetitionDetail();
});
</script>

<style scoped lang="scss"></style>
