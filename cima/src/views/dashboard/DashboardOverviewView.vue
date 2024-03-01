<template>
  <div>
    <CardLayout>
      <template #main>
        <RouterView></RouterView>
      </template>
    </CardLayout>
  </div>
</template>

<script lang="ts" setup>
import CardLayout from "@/components/CardLayout.vue";
</script>

<style scoped lang="scss"></style>
