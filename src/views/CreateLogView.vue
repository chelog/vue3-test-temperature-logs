<script setup lang="ts">
import { CloseRound } from '@vicons/material';
import { NButton, NCard, NIcon } from 'naive-ui';
import { RouterLink, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { LogEntryDto } from '@/types/app';

import EditLogEntry from '../components/EditLogEntry.vue';

const store = useStore();
const router = useRouter();

const onInputTemperature = async (temperature: LogEntryDto) => {
  store.dispatch('createLog', temperature);
  router.replace('/');
};
</script>

<template>
  <NCard title="Add log" style="max-width: 400px">
    <EditLogEntry @save="onInputTemperature" />

    <template #header-extra>
      <RouterLink v-slot="{ navigate }" custom to="/">
        <NButton circle quaternary @click="navigate">
          <template #icon>
            <NIcon><CloseRound /></NIcon>
          </template>
        </NButton>
      </RouterLink>
    </template>
  </NCard>
</template>
