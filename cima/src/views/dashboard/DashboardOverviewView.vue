<template>
  <div>
    <CardLayout>
      <template #main>
        <RouterView :key="$route.fullPath"></RouterView>
      </template>
    </CardLayout>
  </div>
</template>

<script lang="ts" setup>
import CardLayout from "@/components/CardLayout.vue";
</script>

<style scoped lang="scss"></style>
