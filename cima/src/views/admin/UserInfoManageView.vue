<script setup>
import { useAdminStore } from "@/store/admin";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const pageForm = ref({
  size: 20,
  current: 1,
});
const province = [
  "四川省",
  "贵州省",
  "云南省",
  "西藏自治区",
  "陕西省",
  "甘肃省",
  "青海省",
  "宁夏回族自治区",
  "新疆维吾尔自治区",
  "河北省",
  "山西省",
  "内蒙古自治区",
  "辽宁省",
  "吉林省",
  "黑龙江省",
  "江苏省",
  "浙江省",
  "安徽省",
  "福建省",
  "江西省",
  "山东省",
  "河南省",
  "湖北省",
  "湖南省",
  "广东省",
  "广西壮族自治区",
  "海南省",
  "北京市",
  "天津市",
  "上海市",
  "重庆市",
];

const teachers = ref([]);

const createVisible = ref(false);
const deleteVisible = ref(false);
const updateVisible = ref(false);

const teacherForm = ref({});
const userInfo = ref({});

const deleteID = ref(1);
const updateID = ref();

const adminStore = useAdminStore();

onMounted(async () => {
  teachers.value = await adminStore.adminGetuserInfo(pageForm.value);
  console.log(teachers.value);
});
const handleCurrentChange = async (val) => {
  pageForm.value.current = val;
  teachers.value = await adminStore.adminGetuserInfo(pageForm.value);
};

const createTeacher = async () => {
  teacherForm.value.sex = parseInt(teacherForm.value.sex);
  teacherForm.value.password = teacherForm.value.password.toString();
  await adminStore.adminAddTeacher(teacherForm.value);
  createVisible.value = false;
  teacherForm.value = {};
  location.reload();
};

const deleteTeacher = async () => {
  console.log(deleteID.value);
  deleteID.value = parseInt(deleteID.value);
  await adminStore.adminDeleteTeacher(deleteID.value);
};

const getuserInfo = () => {
  userInfo.value = teachers.value.users.filter(
    (item) => item.id === updateID.value
  )[0];
  console.log(userInfo.value);
};
const updateuserInfo = async () => {
  updateVisible.value = false;
  await adminStore.adminUpdateTeacher(userInfo.value);
  ElMessage({
    type: "success",
    message: "教师信息更新成功",
  });
};
</script>
<template>
  <div style="padding: 20px; border-radius: 20px; background-color: #eeeeee">
    <div class="block">
      <el-button type="primary" @click="createVisible = true"
        >添加老师</el-button
      >
      <el-button type="primary" @click="deleteVisible = true"
        >删除老师</el-button
      >
      <el-button type="primary" @click="updateVisible = true"
        >修改信息</el-button
      >
      <el-row :gutter="12">
        <el-col :span="8" :key="item" v-for="item in teachers.users">
          <el-card shadow="hover" class="competion-card"
            ><h4>{{ item.name }}</h4>
            <div>
              <div class="bottom">
                <span class="type">学校：{{ item.school }}</span
                ><br />
                <span class="type">省份：{{ item.province }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination
        layout="prev, pager, next"
        :total="50"
        :current-page="pageForm.current"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      >
      </el-pagination>
    </div>
    <el-dialog v-model="createVisible" title="新增老师" width="400">
      <el-form
        label-width="auto"
        label-position="right"
        :model="teacherForm"
        style="
          max-width: 600px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      >
        <el-form-item label="教师：">
          <el-input style="width: 200px" v-model="teacherForm.name" :rows="2" />
        </el-form-item>
        <el-form-item label="学校：">
          <el-input
            style="width: 200px"
            v-model="teacherForm.school"
            :rows="2"
          />
        </el-form-item>
        <el-form-item label="省份：">
          <ElSelect
            type="province"
            v-model="teacherForm.province"
            placeholder="选择"
            style="width: 200px"
            :rows="2"
          >
            <ElOption
              v-for="item in province"
              :key="item"
              :label="item"
              :value="item"
          /></ElSelect>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input
            style="width: 200px"
            v-model="teacherForm.password"
            :rows="2"
          />
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio v-model="teacherForm.sex" label="0" value="1">女</el-radio>
          <el-radio v-model="teacherForm.sex" label="1" value="0">男</el-radio>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        @click="
          createVisible = false;
          teacherForm = {};
        "
        >取消</el-button
      >

      <el-button type="primary" @click="createTeacher">确认</el-button>
    </el-dialog>
    <el-dialog v-model="deleteVisible" title="删除老师" width="400">
      <ElSelect
        v-model="deleteID"
        placeholder="选择"
        style="width: 200px"
        :rows="2"
      >
        <ElOption
          v-for="item in teachers.users"
          :key="item.id"
          :label="item.name"
          :value="item.id"
      /></ElSelect>

      <el-button
        type="primary"
        @click="
          deleteVisible = false;
          deleteID = 1;
        "
        >取消</el-button
      >

      <el-button type="primary" @click="deleteTeacher">确认</el-button>
    </el-dialog>
    <el-dialog v-model="updateVisible" title="修改教师信息" width="400">
      <el-form>
        <ElSelect
          v-model="updateID"
          placeholder="选择"
          @change="getuserInfo"
          style="width: 200px"
          :rows="2"
        >
          <ElOption
            v-for="item in teachers.users"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        /></ElSelect>
        <el-form-item label="学校：">
          <el-input style="width: 200px" v-model="userInfo.school" :rows="2" />
        </el-form-item>
        <el-form-item label="省份：">
          <ElSelect
            type="province"
            v-model="userInfo.province"
            placeholder="选择"
            style="width: 200px"
            :rows="2"
          >
            <ElOption
              v-for="item in province"
              :key="item"
              :label="item"
              :value="item"
          /></ElSelect>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="updateVisible = false">取消</el-button>

      <el-button type="primary" @click="updateuserInfo">确认</el-button>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
$primary-color: #1b2845;
$secondary-color: #9097a2;
$background-color: #e8e8e8;
$card-color: #ffffff;

.el-button {
  color: $primary-color;
  border-color: $primary-color;

  &:hover,
  &--primary {
    background-color: $primary-color;
    color: #c2c1c1;
  }
}
</style>
