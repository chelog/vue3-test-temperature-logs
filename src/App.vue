<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="fill-parent column ai-center jc-center">
    <!-- RouterView hack to make animated transitions working -->
    <RouterView v-slot="{ Component }">
      <transition name="page" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<style lang="scss">
@import './styles/util.scss';
@import './styles/animations.scss';

body {
  background: url(@/assets/bg.png);
}
</style>
