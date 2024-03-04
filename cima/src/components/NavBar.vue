<script setup></script>

<template>
  <div class="fixedNav">
    <nav class="compactt, expanded }">
      <div class="wrapper">
        <div class="title" @click="$router.push({ name: 'home' })">
          c<span style="font-weight: bold">IMA</span>
        </div>
        <div class="badge" v-if="$route.matched[0].name === 'dashboard'">
          仪表盘
        </div>
        <div class="badge" v-if="$route.matched[0].name === 'admin'">
          管理面板
        </div>
        <button
          v-if="loggedin"
          class="mobile-btn avatar"
          @click="handleAvatarClick"
        >
          <ElAvatar v-if="avatarUrl" :src="avatarUrl" :size="36" />
        </button>
        <button
          v-else
          class="mobile-btn"
          :class="{ expanded }"
          @click="expanded = !expanded"
        >
          <Icon :size="24">
            <MenuFilled v-if="!expanded" />
            <CloseFilled v-else />
          </Icon>
        </button>
        <div class="menu">
          <button
            v-if="loggedin"
            class="account-btn"
            @click="handleAvatarClick"
          >
            <img v-if="avatarUrl" :src="avatarUrl" />
            <ElText>{{ username }}</ElText>
          </button>
          <template v-else>
            <button
              class="menu-button login-btn"
              @click="$router.push({ name: 'login' })"
              v-if="$route.matched[0].name !== 'login'"
            >
              登录
            </button>
            <button
              class="menu-button reg-btn"
              @click="$router.push({ name: 'register' })"
              v-if="$route.matched[0].name !== 'register'"
            >
              注册
            </button>
          </template>
        </div>
      </div>
    </nav>
    <div class="mobile-menu" :class="{ expanded }">
      <ul>
        <li><RouterLink :to="{ name: 'login' }">登录</RouterLink></li>
        <li><RouterLink :to="{ name: 'register' }">注册</RouterLink></li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";

.fixedNav {
  position: fixed;
  top: 0;
  inset-inline: 0;
  z-index: 1000;
}

nav {
  border-bottom: 0px solid rgba(0, 0, 0, 0.1);
  background-color: #ffffff01;
  height: $nav-bar-height;
  box-sizing: border-box;

  &.compact {
    border-bottom: 2px solid transparent;
    background: none;
  }

  .wrapper {
    height: 100%;
    padding-inline: 1rem;
    display: flex;
    align-items: center;
    max-width: $app-max-width;
    margin: 0 auto;
    gap: 0.5rem;
  }
}

.split {
  height: 1px;
  background-color: color-mix(in srgb, #000 10%, #fff);
}

.title {
  font-size: 2rem;
  cursor: pointer;
}

.badge {
  display: flex;
  align-items: center;
  background-color: rgba($color: $element-plus-blue, $alpha: 0.5);
  padding-inline: 0.6rem;
  height: 1.8rem;
  border-radius: $border-radius-lg;
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
}

.mobile-btn {
  margin-left: auto;
  border: none;
  background: none;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  background-color: $element-plus-blue;
  border-radius: 20px;
  color: #fff;
  padding: 0;
  flex-shrink: 0;
  transition: all 0.3s;

  &.avatar {
    background-color: #fff;
  }

  &.expanded {
    background-color: #fff;
    color: #000;
  }

  display: none;
  @media (max-width: 600px) {
    display: flex;
  }
}

.mobile-menu {
  $expanded-height: 100px;

  background-color: #fff;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    height: $expanded-height;
    display: flex;
    flex-direction: column;
  }

  li {
    flex: 1;
  }

  a {
    text-decoration: none;
    color: #000;
    display: block;
    padding-inline: 1rem;
    transition: 0.3s all;
    height: 100%;
    display: flex;
    align-items: center;

    &:hover {
      background-color: darken($color: #fff, $amount: 10);
    }
  }

  height: 0;
  overflow: hidden;
  transition: height 0.3s;
  &.expanded {
    height: $expanded-height;
  }

  display: none;
  @media (max-width: 600px) {
    display: block;
  }
}

.menu {
  margin-left: auto;
  display: flex;
  gap: 0.5rem;

  .menu-button {
    border: none;
    height: 40px;
    border-radius: 20px;
    padding-inline: 20px;
    transition: 0.3s all;
    font-weight: bold;
  }

  .login-btn {
    background-color: transparent;
    border: 2px solid #000;
    color: #000;

    &:hover {
      background-color: #000;
      color: #fff;
    }
  }

  .reg-btn {
    background-color: $element-plus-blue;
    color: #fff;

    &:hover {
      background-color: darken($color: $element-plus-blue, $amount: 30);
    }
  }

  @media (max-width: 600px) {
    display: none;
  }
}

.account-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 20px;
  background-color: #fff;
  height: 40px;
  padding: 5px;
  padding-right: 8px;
  box-sizing: border-box;
  transition: background-color 0.3s;
  border: none;

  img {
    height: 100%;
    aspect-ratio: 1;
    border-radius: 100%;
  }

  &:hover {
    background-color: darken($color: #fff, $amount: 10);
  }
}
</style>
