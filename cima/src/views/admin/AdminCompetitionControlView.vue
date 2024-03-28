<script lang="ts" setup>
import { useAccountStore } from "@/store/account";
import { useAdminStore } from "@/store/admin";
import { useCompetitionStore } from "@/store/competion";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const deleteVisible = ref(false);
const createVisible = ref(false);
const uploadVisible = ref(false);
const newCompetitionForm = ref({});

const competitionDatas = ref([]);

const picture = ref();
const name = ref("");
const id = ref();

const competitionStore = useCompetitionStore();
const useAccount = useAccountStore();
const adminStore = useAdminStore();

const getCompetitionData = async () => {
  competitionDatas.value = await competitionStore.getCompetitionData();
};

// 预载
onMounted(async () => {
  getCompetitionData();
});
const createCompetition = () => {
  createVisible.value = true;
};
const cancleCreateCompetition = () => {
  createVisible.value = false;
  newCompetitionForm.value = {};
  ElMessage({
    message: "操作取消",
  });
};
const doCreateCompetition = async () => {
  createVisible.value = false;
  await useAccount.addCompetition(newCompetitionForm.value);
  newCompetitionForm.value = {};
  ElMessage({
    type: "success",
    message: "竞赛创建成功",
  });
};
const exportCompetition = async () => {
  const res = await useAccount.exportCompetition();
  const url = window.URL.createObjectURL(res.data);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "全国中小学生竞赛信息.xlsx");
  document.body.appendChild(link);
  link.click();
  ElMessage({
    type: "success",
    message: "文件导出成功",
  });
};
const deleteCompetition = async () => {
  deleteVisible.value = true;
};
const dodeleteCompetition = async () => {
  await useAccount.deleteCompetition(name.value);
  name.value = "";
  ElMessage({
    type: "success",
    message: "竞赛删除成功",
  });
  location.reload();
};
const uploadCompetitionPicture = async () => {
  uploadVisible.value = true;
};
const doUploadCompetitionPicture = async () => {
  const formData = new FormData();
  let fileInput = document.getElementById("myFile");
  formData.append("file", fileInput.files[0]);
  await adminStore.uploadCompetitionPicture(id.value, formData);
  uploadVisible.value = false;
  ElMessage({
    type: "success",
    message: "图片上传成功",
  });
};
</script>

<template>
  <div style="background-color: #eee; padding: 30px; border-radius: 15px">
    <el-button type="primary" @click="createCompetition"
      >新增竞赛信息</el-button
    >
    <el-button type="primary" @click="exportCompetition"
      >导出全部竞赛信息</el-button
    >
    <el-button type="primary" @click="deleteCompetition"
      >删除竞赛信息</el-button
    >
    <el-button type="primary" @click="uploadCompetitionPicture"
      >上传竞赛图片</el-button
    >
    <el-dialog
      v-model="createVisible"
      title="发布作业"
      width="600"
      class="info-card"
    >
      <el-form label-width="auto" :model="newCompetitionForm" class="info-form">
        <el-form-item label="名称">
          <el-input
            v-model="newCompetitionForm.competitionName"
            class="input-field"
          />
        </el-form-item>

        <el-form-item label="介绍">
          <el-input
            v-model="newCompetitionForm.competitionDesc"
            class="input-field"
          />
        </el-form-item>

        <el-form-item label="学龄段">
          <el-input
            v-model="newCompetitionForm.competitionGroup"
            class="input-field"
          />
        </el-form-item>

        <el-form-item label="举办方">
          <el-input
            v-model="newCompetitionForm.competitionOrganizer"
            class="input-field"
          />
        </el-form-item>

        <el-form-item label="类型">
          <el-input
            v-model="newCompetitionForm.competitionType"
            class="input-field"
          />
        </el-form-item>

        <el-form-item label="网站">
          <el-input
            v-model="newCompetitionForm.competitionWeb"
            class="input-field"
          />
        </el-form-item>
      </el-form>
      <div class="button-container">
        <el-button @click="cancleCreateCompetition" class="update-button"
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="doCreateCompetition"
          class="confirm-button"
          >发布</el-button
        >
      </div>
    </el-dialog>
    <el-row :gutter="12" style="background-color: #eee">
      <el-col :span="8" :key="item" v-for="item in competitionDatas">
        <el-card shadow="hover" class="competion-card"
          ><h4>{{ item.competitionName }}</h4>
          <div>
            <div class="bottom">
              <span class="type">{{ item.competitionType }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <el-dialog v-model="deleteVisible" title="删除竞赛" width="600">
    <label for="">竞赛名：</label>
    <el-select
      v-model="name"
      placeholder="Select"
      size="large"
      style="width: 200px"
    >
      <el-option
        v-for="item in competitionDatas"
        :key="item.competitionName"
        :label="item.competitionName"
        :value="item.competitionName"
      />
    </el-select>
    <br />
    <el-button
      @click="
        deleteVisible = false;
        name = '';
      "
      >取消</el-button
    >
    <el-button type="primary" @click="dodeleteCompetition">确认</el-button>
  </el-dialog>

  <el-dialog v-model="uploadVisible" title="上传竞赛图片" width="600">
    <label for="">竞赛名：</label>
    <el-select
      v-model="id"
      placeholder="Select"
      size="large"
      style="width: 200px"
    >
      <el-option
        v-for="item in competitionDatas"
        :key="item.id"
        :label="item.competitionName"
        :value="item.id"
      />
    </el-select>
    <br />
    <el-input v-model="picture" type="file" id="myFile" />
    <el-button
      @click="
        uploadVisible = false;
        name = '';
      "
      >取消</el-button
    >
    <el-button type="primary" @click="doUploadCompetitionPicture"
      >确认</el-button
    >
  </el-dialog>
</template>

<style lang="scss" scoped>
$primary-color: #1b2845;
$secondary-color: #9097a2;
$background-color: #e8e8e8;
$card-color: #ffffff;

body {
  background-color: $background-color;
}

.competion-card {
  height: 150px;
  margin-top: 10px;
  border-radius: 15px;
  background-color: $card-color;

  &:hover {
    transform: scale(1.02);
  }
  .type {
    font-size: 12px;
    color: $secondary-color;
  }
}

.el-button {
  color: $primary-color;
  border-color: $primary-color;

  &:hover,
  &--primary {
    background-color: $primary-color;
    color: #c2c1c1;
  }
}

.el-dialog {
  .el-input {
    border-color: $secondary-color;
    color: $primary-color;
  }

  label {
    color: $primary-color;
  }
}

.el-row {
  background-color: $card-color;
  color: $primary-color;
}

.el-card {
  color: $primary-color;
}
</style>
