<script setup lang="ts">
import { NButton, NCard, NIcon } from 'naive-ui';
import { RouterLink, useRouter } from 'vue-router';

import Icon from '@/components/Icon';
import { useStore } from '@/store';
import { LogEntryDto } from '@/types/app';

import EditLogEntry from '../components/EditLogEntry.vue';

const store = useStore();
const router = useRouter();

const onInputTemperature = async (log: LogEntryDto) => {
  store.createLog(log);
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
            <NIcon><Icon>mdi mdi-close</Icon></NIcon>
          </template>
        </NButton>
      </RouterLink>
    </template>
  </NCard>
</template>
