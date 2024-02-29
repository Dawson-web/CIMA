import { defineStore } from "pinia";
import { ref } from "vue";
import type { loginForm, registerForm } from "../api/models";
import { loginAPI, registerAPI } from "../api/types";

export const useAccountStore = defineStore("account", () => {
  const account = ref({});
  async function register(form: registerForm) {
    await registerAPI(form);
  }
  async function login(form: loginForm) {
    await loginAPI(form);
  }
  return { account, register, login };
});
