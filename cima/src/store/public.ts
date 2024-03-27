import { addCommentAPI, deleteCommentAPI, getCommentAPI } from "@/api/types";
import { defineStore } from "pinia";

export const usePublicStore = defineStore("public", () => {
  const addComment = async (form: any) => {
    await addCommentAPI(localStorage.getItem("token"), form);
  };
  const getComment = async (id: number) => {
    const res = await getCommentAPI(id);
    return res.data.data;
  };
  const deleteComment = async (id: number) => {
    await deleteCommentAPI(id);
  };
  return {
    addComment,
    getComment,
    deleteComment,
  };
});
