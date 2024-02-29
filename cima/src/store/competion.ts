import { defineStore } from "pinia";
import { ref } from "vue";
import { getCompetionDataAPI } from "../api/types";
export const useCompetionStore = defineStore("competion", () => {
  const competionData = ref({});
  async function getCompetionData() {
    competionData.value = (await getCompetionDataAPI()).data;
  }

  return { competionData, getCompetionData };
});
