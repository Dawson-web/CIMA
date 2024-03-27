import { addCommentAPI, deleteCommentAPI, getCommentAPI } from "@/api/types";
import { defineStore } from "pinia";

export const usePublicStore = defineStore("public", () => {
  const addComment = async (form: any) => {
    await addCommentAPI(form);
  };
  const getComment = async (id: number) => {
    await getCommentAPI(id);
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
