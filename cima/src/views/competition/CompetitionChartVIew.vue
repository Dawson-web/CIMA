<script lang="ts" setup>
import { useCompetitionStore } from "@/store/competion";
import * as echarts from "echarts";
import { onMounted, ref } from "vue";

const competitionByCategory = ref([]);

const competitionStore = useCompetitionStore();
const type = ref(0);
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
const _type = ref(1);
const _typeOptions = [
  {
    value: 0,
    label: "扇形",
  },
  {
    value: 1,
    label: "柱状",
  },
];

// 预载信息
onMounted(async () => {
  competitionByCategory.value = await competitionStore.categoryShowcaseContest(
    0
  );
  _getChart(competitionByCategory.value);
});

const getChart = (competitionByCategory: any) => {
  let Data = [];
  // 数据格式化处理
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
        name: "参数详情",
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
            fontSize: 15,
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
const _getChart = (competitionByCategory: any) => {
  var chartDom = document.getElementById("main");
  var myChart = echarts.init(chartDom);
  var option;
  let xAxis = [];
  let yAxis = [];
  // 数据格式化处理
  competitionByCategory.forEach((item) => {
    xAxis.push(item.searchName);
    yAxis.push(item.count);
  });

  let yMax = 500;
  let dataShadow = [];
  for (let i = 0; i < yAxis.length; i++) {
    dataShadow.push(yMax);
  }
  option = {
    xAxis: {
      data: xAxis,
      axisLabel: {
        inside: true,
        color: "#fff",
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#999",
      },
    },
    dataZoom: [
      {
        type: "inside",
      },
    ],
    series: [
      {
        type: "bar",
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#83bff6" },
            { offset: 0.5, color: "#188df0" },
            { offset: 1, color: "#188df0" },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#2378f7" },
              { offset: 0.7, color: "#2378f7" },
              { offset: 1, color: "#83bff6" },
            ]),
          },
        },
        data: yAxis,
      },
    ],
  };
  // Enable data zoom when user click bar.
  const zoomSize = 6;
  myChart.on("click", function (params) {
    myChart.dispatchAction({
      type: "dataZoom",
      startValue: xAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue:
        xAxis[Math.min(params.dataIndex + zoomSize / 2, yAxis.length - 1)],
    });
  });

  option && myChart.setOption(option);
};
const onSelectChange = async () => {
  competitionByCategory.value = await competitionStore.categoryShowcaseContest(
    type.value
  );
  if (_type.value == 0) getChart(competitionByCategory.value);
  else _getChart(competitionByCategory.value);
};
</script>
<template>
  <div class="chart-box">
    <div>
      <div style="color: #999; font-size: 14px">
        分类展示：<el-select
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

        图形：
        <el-select
          @change="onSelectChange"
          v-model="_type"
          placeholder="Select"
          size="small"
          style="width: 120px"
        >
          <el-option
            v-for="item in _typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <div style="display: flex; justify-content: space-around">
        <div id="main" style="width: 100%; height: 80vh" :key="type"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
