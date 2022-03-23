<script setup lang="ts">
import { HomeRound } from '@vicons/material';
import { NButton, NIcon } from 'naive-ui';
import { RouterLink } from 'vue-router';

import ErrorCard from '../components/ErrorCard.vue';
</script>

<template>
  <ErrorCard>
    No page found for this address! If you're sure something must be here, be quick to
    <a href="https://t.me/chelog" target="_blank">contact me</a>

    <template #action>
      <RouterLink v-slot="{ navigate }" custom to="/">
        <NButton class="full-width" @click="navigate">
          <template #icon>
            <NIcon><HomeRound /></NIcon>
          </template>
          Go to home page
        </NButton>
      </RouterLink>
    </template>
  </ErrorCard>
</template>
