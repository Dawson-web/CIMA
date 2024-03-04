<script setup lang="ts">
import { useAccountStore } from "@/store/account";
import { onMounted, ref } from "vue";

const selfregisterinfo = ref([]);

onMounted(async () => {
  const useAccount = useAccountStore();
  selfregisterinfo.value = await useAccount.getCompetitionSelfRegister();
});
</script>

<template>
  <div>
    <h1>个人报名情况</h1>
    <div class="card-box">
      <el-card style="width: 30%" v-for="o in 4" :key="o">
        <p class="text item">{{ "List item " + o }}</p>
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-box {
  margin: 0 auto;
  width: 90%;
  justify-content: flex-start;
  display: flex;
  gap: 3%;
  row-gap: 20px;
  flex-wrap: wrap;
}
</style>
