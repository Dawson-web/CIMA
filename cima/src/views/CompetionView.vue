<template>
  <div class="competion-view">
    <div>
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 text="2xl" justify="center">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div>
      <el-row :gutter="12">
        <el-col
          :span="8"
          v-for="item in competitionDatas"
          :key="item.id"
          class="competion-card"
        >
          <el-card shadow="hover"
            ><h4>{{ item.competitionName }}</h4>
            <div style="padding: 14px">
              <span>{{ item.competitionOrganizer }}</span>
              <div class="bottom">
                <time class="time">{{ item.competitionType }}</time>
                <el-button text class="button">了解更多</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCompetitionStore } from "@/store/competion";
import { onMounted, ref } from "vue";

onMounted(async () => {
  const competitionStore = useCompetitionStore();
  await competitionStore.getCompetitionData();
  competitionDatas.value = competitionStore.competitionData.data;
  console.log(competitionDatas.value);
});

const competitionDatas = ref([]);
</script>

<style scoped lang="scss">
.competion-view {
  width: 100%;
  height: 100%;
}

.competion-card {
  height: 200px;
  margin-top: 10px;
  .time {
    font-size: 12px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .button {
    padding: 0;
    min-height: auto;
  }
}

.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
