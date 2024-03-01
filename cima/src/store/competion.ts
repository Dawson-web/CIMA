import { defineStore } from "pinia";
import { ref } from "vue";
import { getCompetionDataAPI } from "../api/types";
export const useCompetionStore = defineStore("competion", () => {
  const competionData = ref({ data: null });
  async function getCompetionData() {
    try {
      const res = await getCompetionDataAPI();
      competionData.value = res.data;
    } catch (e) {
      console.error("Failed to fetch competition data:", e);
    }
    console.log(competionData.value.data);
  }

  return { competionData, getCompetionData };
});
