<script setup lang="ts">
import { ref } from "vue";
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
</script>

<template>
  <div class="card-layout">
    <section>
      <div class="common-layout">
        <div class="flex-grow">
          <el-menu
            ellipsis
            class="el-menu-popper-demo"
            mode="horizontal"
            :popper-offset="16"
            default-active="1"
            style="width: 90%"
            router="true"
          >
            <el-menu-item index="1" route="/dashboard/competitions">
              Processing Center
            </el-menu-item>
            <el-sub-menu index="2">
              <template #title>Workspace</template>
              <el-menu-item index="2-1">item one</el-menu-item>
              <el-menu-item index="2-2">item two</el-menu-item>
              <el-menu-item index="2-3">item three</el-menu-item>
              <el-sub-menu index="2-4">
                <template #title>item four</template>
                <el-menu-item index="2-4-1">item one</el-menu-item>
                <el-menu-item index="2-4-2">item two</el-menu-item>
                <el-menu-item index="2-4-3">item three</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <el-sub-menu index="3" :popper-offset="8">
              <template #title>Override Popper Offset</template>
              <el-menu-item index="3-1">item one</el-menu-item>
              <el-menu-item index="3-2">item two</el-menu-item>
              <el-menu-item index="3-3">item three</el-menu-item>
              <el-sub-menu index="3-4" :popper-offset="20">
                <template #title>override child</template>
                <el-menu-item index="3-4-1">item one</el-menu-item>
                <el-menu-item index="3-4-2">item two</el-menu-item>
                <el-menu-item index="3-4-3">item three</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="4" disabled>Info</el-menu-item>
            <el-menu-item index="5">Orders</el-menu-item>
          </el-menu>
          <div @click="dialogFormVisible = true">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
          </div>
        </div>
      </div>

      <el-dialog
        v-model="dialogFormVisible"
        title="Shipping address"
        width="500"
      >
        <el-form> </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">
              Confirm
            </el-button>
          </div>
        </template>
      </el-dialog>
    </section>
    <section class="main">
      <slot name="main"></slot>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";

.card-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.flex-grow {
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-around;
}

.main {
  width: 100%;
  height: 80vh;
  margin-top: 20px;
}
</style>
