<script setup lang="ts">
import { useCompetitionStore } from "@/store/competion";
import * as echarts from "echarts";
import { onMounted, ref } from "vue";

const competitionStore = useCompetitionStore();

const type = ref(0);
const competitionByCategory = ref([]);
const typeOptions = [
  {
    value: 0,
    label: "竞赛类型",
  },
  {
    value: 1,
    label: "省份",
  },
  {
    value: 2,
    label: "学校",
  },
];

const competitionName = ref("");
const competitionNameOptions = ref([
  "全国青少年人工智能创新挑战赛",
  "全国中小学信息技术创新与实践大赛",
  "世界机器人大会青少年机器人设计与信息素养大赛",
  "全国青少年科技教育成果展示大赛",
  "全国青少年无人机大赛",
  "全国青年科普创新实验暨作品大赛",
  "宋庆龄少年儿童发明奖",
  "全国中学生天文知识竞赛",
  "“地球小博士”全国地理科普知识大赛",
  "全国中学生水科技发明比赛",
  "全国中学生地球科学奥林匹克竞赛",
  "全国中学生数学奥林匹克竞赛",
  "全国中学生物理奥林匹克竞赛",
  "全国中学生化学奥林匹克竞赛",
  "全国中学生生物学奥林匹克竞赛",
  "全国中学生信息学奥林匹克竞赛",
  "全国青少年科技创新大赛",
  "全国青少年航天创新大赛",
  "“北斗杯”全国青少年空天科技体验与创新大赛",
  "蓝桥杯全国软件和信息技术专业人才大赛",
  "丘成桐中学科学奖",
  "全球发明大会中国区",
  "中国“芯”助力中国梦——全国青少年通信科技创新大赛",
  "全国青少年禁毒知识竞赛",
  "世界华人学生作文大赛",
  "“外研社杯”全国中学生外语素养大赛",
  "叶圣陶杯全国中学生新作文大赛",
  "全国中学生科普科幻作文大赛",
  "高中生创新能力大赛",
  "全国中学生创新作文大赛",
  "“语文报杯•时代新人说”全国中学生征文大赛",
  "全国中学生环境保护优秀作文征集活动",
  "全国版图知识竞赛（中小学组）",
  "全国青少年劳动技能与智能设计大赛",
  "全国青少年文化遗产知识大赛",
  "全国中小学生绘画书法作品比赛",
  "“我爱祖国海疆”全国青少年航海模型教育竞赛",
  "“驾驭未来”全国青少年车辆模型教育竞赛",
  "全国青少年模拟飞行锦标赛",
  "“飞向北京·飞向太空”全国青少年航空航天模型教育竞赛活动",
  "全国青少年传统体育项目比赛",
  "“致敬英雄”全国青少年文化艺术创作主题教育竞赛",
  "“希望颂”——全国青少年书画艺术大展",
  "全国青少年音乐素养大赛",
]);
const competitionRegisterInfo = ref([]);

const getChart = (competitionByCategory: any) => {
  let Data = [];

  competitionByCategory.forEach((item) => {
    Data.push({ name: item.searchName, value: item.count });
  });

  let _chartDom = document.querySelector("#main");
  let _myChart = echarts.init(_chartDom);

  let _option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "0%",
      left: "center",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: Data,
      },
    ],
  };

  _option && _myChart.setOption(_option);
};

onMounted(async () => {
  const competitionStore = useCompetitionStore();
  competitionByCategory.value = await competitionStore.categoryShowcaseContest(
    0
  );
  getChart(competitionByCategory.value.data);
});

const onSelectChange = async () => {
  competitionByCategory.value = await competitionStore.categoryShowcaseContest(
    type.value
  );
  getChart(competitionByCategory.value.data);
};
const _onSelectChange = async () => {
  competitionRegisterInfo.value = await competitionStore.getCompetitionRegister(
    competitionName.value
  );
  console.log(competitionRegisterInfo.value);
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
      <div style="float: left">
        <span style="color: #999; font-size: 14px">分类展示：</span>
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
      <div style="display: flex; justify-content: space-around">
        <div id="main" style="width: 600px; height: 400px" :key="type"></div>
      </div>
    </div>
    <div style="float: left">
      <span style="color: #999; font-size: 14px">竞赛详情：</span>
      <el-select
        @change="_onSelectChange"
        v-model="competitionName"
        placeholder=""
        size="small"
        style="width: 120px"
      >
        <el-option
          v-for="item in competitionNameOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <div>
        <el-table :data="competitionRegisterInfo.data" style="width: 100%">
          <el-table-column prop="realName" label="姓名" width="180" />
          <el-table-column prop="schoolName" label="学校" width="180" />
          <el-table-column prop="className" label="省份" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
