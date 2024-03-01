import { defineStore } from "pinia";
import { ref } from "vue";
import { getCompetitionDataAPI } from "../api/types";
export const useCompetitionStore = defineStore("competition", () => {
  const competitionData = ref({ data: null });
  async function getCompetitionData() {
    try {
      const res = await getCompetitionDataAPI();
      competitionData.value = res.data;
    } catch (e) {
      console.error("Failed to fetch competition data:", e);
    }
  }

  return { competitionData, getCompetitionData };
});
