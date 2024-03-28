import {
  adminAddTeacherAPI,
  adminAddUserAPI,
  adminDeleteTeacherAPI,
  adminDeleteUserAPI,
  adminGetTeacherInfoAPI,
  adminGetUserInfoAPI,
  adminLoginAPI,
  adminLogoutAPI,
  adminUpdateTeacherAPI,
  adminUpdateUserAPI,
  updateCompetitionPictureAPI,
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
    await adminUpdateTeacherAPI(form);
  };
  const adminDeleteTeacher = async (id: number) => {
    await adminDeleteTeacherAPI(id);
  };
  const adminGetTeacherInfo = async (form: any) => {
    const res = await adminGetTeacherInfoAPI(form);
    return res.data.data;
  };

  const uploadCompetitionPicture = async (id: number, file: any) => {
    return await updateCompetitionPictureAPI(id, file);
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
    uploadCompetitionPicture,
  };
});
