<script setup lang="ts">
import DotBackground from "@/components/DotBackground.vue";
import NavBar from "@/components/NavBar.vue";
</script>
<template>
  <div class="home">
    <header>
      <NavBar compact />
    </header>
    <main>
      <h2 class="slogan">全国中小学生</h2>
      <h1 class="title">竞赛信息管理系统</h1>
      <h3 class="status">Get Start From Now ~</h3>
      <div class="register-btn-wrapper">
        <div class="shadow"></div>
        <div class="background"></div>
        <button class="register-btn">
          <p><RouterLink to="/login" class="link">立即登录</RouterLink></p>
        </button>
      </div>
    </main>
    <DotBackground />
  </div>
</template>
<style scoped lang="scss">
@import "@/styles/variables.scss";

header {
  margin-top: 8svh;

  @media (max-height: $mobile-height-breakpoint) {
    margin-top: 0;
  }
}

main {
  margin: 0 auto;
  max-width: $app-max-width;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12svh;

  @media (max-height: $mobile-height-breakpoint) {
    margin-top: 10svh;
  }

  .title {
    margin-block: 1rem;
    font-size: clamp(4rem, 10vw, 8rem);
    background-image: linear-gradient(135deg, #2ad3ca 0%, #00a7df 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: normal;
  }

  .slogan {
    background-color: #000;
    color: #fff;
    font-size: 1rem;
    display: flex;
    align-items: center;
    height: 40px;
    border-radius: 20px;
    padding-inline: 1.5rem;
  }

  .status {
    font-size: clamp(1.5rem, 5vw, 2.5rem);
    font-weight: 200;
    opacity: 1;
    pointer-events: none;
    transition: opacity 0.3s;
  }

  .register-btn-wrapper {
    $radius: 25px;
    $bg: linear-gradient(135deg, #2ad3ca 0%, #00a7df 100%);

    height: 50px;
    width: 150px;
    position: relative;
    margin-top: 3rem;

    .shadow,
    .background {
      position: absolute;
      inset: 0;
      border-radius: $radius;
      overflow: hidden;

      &::after {
        content: "";
        position: absolute;
        width: 150px;
        height: 150px;
        top: 50%;
        left: 50%;
        background-image: $bg;
        animation: spin 4s linear infinite;

        @keyframes spin {
          from {
            transform: translateX(-50%) translateY(-50%) rotate(0);
          }
          to {
            transform: translateX(-50%) translateY(-50%) rotate(1turn);
          }
        }
      }
    }

    .background {
      z-index: -5;
    }

    .shadow {
      filter: blur(10px);
      opacity: 0.5;
      z-index: -10;
      transform: translateY(5px);
    }

    .register-btn {
      height: 100%;
      width: 100%;
      border-radius: $radius;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid transparent;
      background-clip: padding-box;
      font-size: 1.2rem;
      font-weight: 200;
      transition: all 0.3s;
      color: #000;
      &:hover {
        background-color: transparent;
        color: #fff;
      }
      .link {
        text-decoration: none;
        color: #000;
      }
      &:hover .link {
        color: #fff;
      }
    }
  }
}
</style>
