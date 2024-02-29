import request from ".";
import type { loginForm, registerForm } from "./models";
export interface ApiResponse<Data> {
  code?: number | null;
  data?: Data | null;
  msg?: null | string;
}

export const getCompetionDataAPI = () => {
  return request({
    method: "GET",
    url: "/competition/infos",
  });
};

export const registerAPI = (form: registerForm) => {
  return request({
    method: "POST",
    url: "/user/register",
    data: form,
  });
};
export const loginAPI = (form: loginForm) => {
  return request({
    method: "POST",
    url: "/user/login",
    data: form,
  });
};
