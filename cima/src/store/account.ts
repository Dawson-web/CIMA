import { defineStore } from "pinia";
import { ref } from "vue";
import type { loginForm, registerForm } from "../api/models";
import {
  getAccountInfoAPI,
  getCompetitionSelfRegisterAPI,
  loginAPI,
  registerAPI,
  submitCompetitionRegisterAPI,
  updateAccountInfoAPI,
  updatePasswordAPI,
} from "../api/types";
export const useAccountStore = defineStore("account", () => {
  const account = ref({ data: null });
  const _token = ref({ data: null });
  async function register(form: registerForm) {
    await registerAPI(form);
  }
  async function getAccountInfo() {
    try {
      const res = await getAccountInfoAPI(localStorage.getItem("token"));
      account.value = res.data;
      return res.data;
    } catch (e) {
      console.error("Failed to fetch account data:", e);
    }
  }
  async function login(form: loginForm) {
    try {
      const res = await loginAPI(form);

      _token.value = res.data;
    } catch (e) {
      console.error("Failed to fetch account data:", e);
    }
  }

  async function updateAccountInfo(form: any) {
    try {
      const res = await updateAccountInfoAPI(localStorage.getItem("token"), {
        newHobbies: form.newHobbies,
        newUsername: form.newUsername,
      });
    } catch (e) {
      console.error("Failed to fetch update account data:", e);
    }
  }
  async function updatePassword(form: any) {
    try {
      const res = await updatePasswordAPI(localStorage.getItem("token"), {
        confirm: form.confirm,
        password: form.password,
      });
    } catch (e) {
      console.error("Failed to fetch update password:", e);
    }
  }

  async function submitCompetitionRegister(form: any) {
    try {
      await submitCompetitionRegisterAPI(localStorage.getItem("token"), {
        province: form.province,
        competitionName: form.competitionName,
        competitionType: form.competitionType,
        schoolName: form.schoolName,
      });
    } catch (e) {
      console.error("Failed to fetch Register Competition:", e);
    }
  }

  async function getCompetitionSelfRegister() {
    try {
      const res = await getCompetitionSelfRegisterAPI(
        localStorage.getItem("token")
      );
      return res.data;
    } catch (e) {
      console.error("Failed to fetch Self Competition Register Info:", e);
    }
  }

  return {
    account,
    _token,
    register,
    login,
    getAccountInfo,
    updateAccountInfo,
    updatePassword,
    submitCompetitionRegister,
    getCompetitionSelfRegister,
  };
});
