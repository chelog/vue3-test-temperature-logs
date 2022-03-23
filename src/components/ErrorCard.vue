<script setup lang="ts">
import { NCard, NDivider } from 'naive-ui';

defineProps<{
  /** Title to place in card's header */
  title?: string;
}>();
</script>

<template>
  <NCard :title="title ?? 'Error'" style="max-width: 400px">
    <slot />
    <NDivider v-if="$slots.action" dashed />
    <slot name="action" />
  </NCard>
</template>
