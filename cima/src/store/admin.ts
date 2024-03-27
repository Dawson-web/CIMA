import {
  adminAddTeacherAPI,
  adminAddUserAPI,
  adminDeleteUserAPI,
  adminGetUserInfoAPI,
  adminLoginAPI,
  adminLogoutAPI,
  adminUpdateUserAPI,
} from "@/api/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAdminStore = defineStore("admin", () => {
  const _token = ref({ data: null });

  const adminLogin = async (form: any) => {
    const res = await adminLoginAPI(form);
    if (res.data.data != "密码错误") {
      localStorage.setItem("token", res.data.data);
    }
  };

  const adminLogout = async () => {
    await adminLogoutAPI();
  };
  const adminAddUser = async (form: any) => {
    await adminAddUserAPI(form);
  };
  const adminUpdateUser = async (form: any) => {
    await adminUpdateUserAPI(form);
  };
  const adminDeleteUser = async (id: number) => {
    await adminDeleteUserAPI(id);
  };
  const adminGetUserInfo = async (form: any) => {
    await adminGetUserInfoAPI(form);
  };
  const adminAddTeacher = async (form: any) => {
    await adminAddTeacherAPI(form);
  };
  const adminUpdateTeacher = async (form: any) => {
    await adminUpdateTeacher(form);
  };
  const adminDeleteTeacher = async (id: number) => {
    await adminDeleteTeacher(id);
  };
  const adminGetTeacherInfo = async (form: any) => {
    await adminGetTeacherInfo(form);
  };
  return {
    _token,
    adminLogin,
    adminLogout,
    adminAddUser,
    adminUpdateUser,
    adminDeleteUser,
    adminGetUserInfo,
    adminAddTeacher,
    adminUpdateTeacher,
    adminDeleteTeacher,
    adminGetTeacherInfo,
  };
});
