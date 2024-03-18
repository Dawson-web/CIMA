<template>
  <div class="background"></div>
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";

.background {
  z-index: -100;
  position: fixed;
  inset: 0;
  background-color: #fafafa;
  --bg-color: #{$page-bg-color-light};
  --dot-color: rgba(0, 0, 0, 0.2);
  @at-root html.dark & {
    --bg-color: #{$page-bg-color-dark};
    --dot-color: #333333;
  }

  background-image: linear-gradient(
      to bottom,
      var(--bg-color) 0%,
      transparent 30%,
      transparent 50%,
      var(--bg-color) 90%
    ),
    radial-gradient(circle at center, var(--dot-color) 1px, transparent 1.5px);
  background-size: cover, 18px 18px;
}
</style>
