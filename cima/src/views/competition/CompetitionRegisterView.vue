<script setup lang="ts">
import { ref } from "vue";
import CompetitionChart from "@/components/CompetitionChart.vue";

const type = ref("全部");
const adress = ref("全部");
const school = ref("全部");

const typeOptions = [
  {
    value: "全部",
    label: "全部",
  },
  {
    value: "自然科学素养类",
    label: "自然科学素养类",
  },
  {
    value: "人文综合素养类",
    label: "人文综合素养类",
  },
  {
    value: "艺术体育类",
    label: "艺术体育类",
  },
];

const adressOptions = [
  {
    value: "全部",
    label: "全部",
  },
  { value: "安徽", label: "安徽" },
  { value: "北京", label: "北京" },
  { value: "重庆", label: "重庆" },
  { value: "福建", label: "福建" },
  { value: "甘肃", label: "甘肃" },
  { value: "广东", label: "广东" },
  { value: "广西", label: "广西" },
  { value: "贵州", label: "贵州" },
  { value: "海南", label: "海南" },
  { value: "河北", label: "河北" },
  { value: "河南", label: "河南" },
  { value: "黑龙江", label: "黑龙江" },
  { value: "湖北", label: "湖北" },
  { value: "湖南", label: "湖南" },
  { value: "吉林", label: "吉林" },
  { value: "江苏", label: "江苏" },
  { value: "江西", label: "江西" },
  { value: "辽宁", label: "辽宁" },
  { value: "内蒙古", label: "内蒙古" },
  { value: "宁夏", label: "宁夏" },
  { value: "青海", label: "青海" },
  { value: "山东", label: "山东" },
  { value: "山西", label: "山西" },
  { value: "陕西", label: "陕西" },
  { value: "上海", label: "上海" },
  { value: "四川", label: "四川" },
  { value: "天津", label: "天津" },
  { value: "西藏", label: "西藏" },
  { value: "新疆", label: "新疆" },
  { value: "云南", label: "云南" },
  { value: "浙江", label: "浙江" },
  { value: "香港", label: "香港" },
  { value: "澳门", label: "澳门" },
  { value: "台湾", label: "台湾" },
];

const schoolOptions = [
  {
    value: "全部",
    label: "全部",
  },
];

const onSelectChange = () => {
  console.log(type.value, adress.value, school.value);
};
</script>

<template>
  <h1>竞赛报名情况</h1>
  <div
    style="
      display: flex;
      justify-content: flex-start;
      gap: 10px;
      margin-left: 20px;
    "
  >
    <div>
      <span style="color: #999; font-size: 14px">类型：</span>
      <el-select
        @change="onSelectChange"
        v-model="type"
        placeholder="Select"
        size="small"
        style="width: 120px"
      >
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div>
      <span style="color: #999; font-size: 14px">地区：</span>
      <el-select
        @change="onSelectChange"
        v-model="adress"
        placeholder="Select"
        size="small"
        style="width: 120px"
      >
        <el-option
          v-for="item in adressOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div>
      <span style="color: #999; font-size: 14px">学校：</span>
      <el-select
        @change="onSelectChange"
        v-model="school"
        placeholder="Select"
        size="small"
        style="width: 120px"
      >
        <el-option
          v-for="item in schoolOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
  <CompetitionChart />
</template>

<style scoped lang="scss"></style>
