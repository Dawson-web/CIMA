import { defineStore } from "pinia";
import { ref } from "vue";
import type { loginForm, registerForm } from "../api/models";
import { loginAPI, registerAPI } from "../api/types";
import router from "../router";
export const useAccountStore = defineStore("account", () => {
  const account = ref({ data: null });
  const _token = ref({ data: null });
  async function register(form: registerForm) {
    await registerAPI(form);
  }
  async function login(form: loginForm) {
    try {
      const res = await loginAPI(form);

      _token.value = res.data;
      console.log("as", _token.value);
    } catch (e) {
      console.error("Failed to fetch account data:", e);
    }
  }
  return { account, _token, register, login };
});
