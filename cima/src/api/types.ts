import request from ".";
import type {
  competitionRegisterForm,
  loginForm,
  passwordForm,
  registerForm,
  updateForm,
} from "./models";
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

export const getCompetitionDetailAPI = (_keyword: string) => {
  return request({
    method: "GET",
    url: `/competition/get-by-keyword`,
    params: {
      keyword: _keyword,
    },
  });
};

export const getCompetitionGroupAPI = (group: string) => {
  return request({
    method: "GET",
    url: `/competition/get-by-group`,
    params: {
      group: group,
    },
  });
};

export const getCompetitionRegisterAPI = (competition_name: string) => {
  return request({
    method: "GET",
    url: "/registration/get-competition",
    params: {
      competition_name: competition_name,
    },
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

export const getAccountInfoAPI = (_token: any) => {
  return request({
    method: "POST",
    url: "/user/user-info",
    headers: {
      token: _token,
    },
  });
};
export const updateAccountInfoAPI = (_token: any, form: updateForm) => {
  return request({
    method: "POST",
    url: "/user/update",
    headers: {
      token: _token,
    },
    data: form,
  });
};

export const updatePasswordAPI = (_token: any, form: passwordForm) => {
  return request({
    method: "POST",
    url: "/user/update-password",
    headers: {
      token: _token,
    },
    data: form,
  });
};

export const getCompetitionSelfRegisterAPI = (_token: any) => {
  return request({
    method: "GET",
    url: "/registration/get-user-info",
    headers: {
      token: _token,
    },
  });
};

export const submitCompetitionRegisterAPI = (
  _token: any,
  form: competitionRegisterForm
) => {
  return request({
    method: "POST",
    url: "/registration/registration",
    headers: {
      token: _token,
    },
    data: form,
  });
};
