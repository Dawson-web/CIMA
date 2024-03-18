<script setup lang="ts">
import { useAccountStore } from "@/store/account";
import { onMounted, ref } from "vue";

const selfregisterinfo = ref([]);

// 获取个人报名情况
onMounted(async () => {
  const useAccount = useAccountStore();
  selfregisterinfo.value = await useAccount.getCompetitionSelfRegister();
});
</script>

<template>
  <div>
    <h1>个人报名情况</h1>
    <div class="card-box">
      <el-card
        style="padding: 20px"
        v-for="item in selfregisterinfo.data"
        :key="item.competitionName"
      >
        <p class="text">{{ item.competitionName }}</p>
        <div>
          <span class="type" style="float: left"
            >类别：{{ item.competitionType }}</span
          >
          <span style="font-size: 12px; float: right; color: #409eff"
            >状态：已报名</span
          >
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-box {
  margin: 0 auto;
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3%;
  row-gap: 20px;
  flex-wrap: wrap;
  .type {
    font-size: 12px;
    color: #999;
  }
}
</style>
