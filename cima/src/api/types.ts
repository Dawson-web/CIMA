import request from ".";
import type { loginForm, registerForm } from "./models";
export interface ApiResponse<Data> {
  code?: number | null;
  data?: Data | null;
  msg?: null | string;
}

export const getCompetitionDataAPI = () => {
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

export const getAccountInfoAPI = (_token: string) => {
  request({
    method: "POST",
    url: "/user/user-info",
    headers: {
      token: _token,
    },
  });
};
