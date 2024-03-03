import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getCompetitionDataAPI,
  getCompetitionDetailAPI,
  getCompetitionGroupAPI,
  getCompetitionRegisterAPI,
} from "../api/types";

export const useCompetitionStore = defineStore("competition", () => {
  const competitionData = ref({ data: null });
  const serachKeyword = ref("");
  const competitionGroupData = ref({ data: null });
  async function getCompetitionData() {
    try {
      const res = await getCompetitionDataAPI();
      return res.data;
    } catch (e) {
      console.error("Failed to fetch competition data:", e);
    }
  }
  async function getCompetitionDetail() {
    try {
      const res = await getCompetitionDetailAPI(serachKeyword.value);
      return res.data;
    } catch (e) {
      console.error("Failed to fetch competition data by keyword :", e);
    }
  }

  async function getCompetitionGroup(group: string) {
    try {
      const res = await getCompetitionGroupAPI(group);
      return res.data;
    } catch (e) {
      console.error("Failed to fetch competition data by group:", e);
    }
  }

  async function getCompetitionRegister(competition_name: string) {
    try {
      const res = await getCompetitionRegisterAPI(competition_name);
      return res.data;
    } catch (e) {
      console.error("Failed to fetch competition data register info:", e);
    }
  }

  return {
    competitionData,
    getCompetitionData,
    getCompetitionDetail,
    serachKeyword,
    getCompetitionGroup,
    competitionGroupData,
    getCompetitionRegister,
  };
});
