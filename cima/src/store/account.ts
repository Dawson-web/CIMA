import { defineStore } from "pinia";
import { ref } from "vue";
import type { loginForm, registerForm } from "../api/models";
import { loginAPI, registerAPI, getAccountInfoAPI } from "../api/types";
import router from "../router";
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
      console.log("account", res);
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
  return { account, _token, register, login, getAccountInfo };
});
