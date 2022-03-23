<script setup lang="ts">
import { PlusRound } from '@vicons/material';
import { NButton, NCard, NIcon } from 'naive-ui';
import { useStore } from 'vuex';

import LogList from '@/components/LogList.vue';
import { StoreState } from '@/types/app';

const store = useStore<StoreState>();
</script>

<template>
  <NCard title="Logged readings" style="max-width: 400px">
    <LogList :logs="store.state.logs" />

    <template #header-extra>
      <RouterLink v-slot="{ navigate }" custom to="/create">
        <NButton circle type="primary" secondary @click="navigate">
          <template #icon>
            <NIcon><PlusRound /></NIcon>
          </template>
        </NButton>
      </RouterLink>
    </template>
  </NCard>
</template>
