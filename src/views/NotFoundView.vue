<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui';
import { RouterLink } from 'vue-router';

import Icon from '@/components/Icon';

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
            <NIcon><Icon>mdi mdi-home</Icon></NIcon>
          </template>
          Go to home page
        </NButton>
      </RouterLink>
    </template>
  </ErrorCard>
</template>
