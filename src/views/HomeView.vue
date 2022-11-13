<script setup lang="ts">
import { NButton, NCard, NIcon } from 'naive-ui';

import Icon from '@/components/Icon';
import LogList from '@/components/LogList.vue';
import { useStore } from '@/store';

const store = useStore();
</script>

<template>
  <NCard title="Logged readings" style="max-width: 400px">
    <LogList :logs="store.logs" />

    <template #header-extra>
      <RouterLink v-slot="{ navigate }" custom to="/create">
        <NButton circle type="primary" secondary @click="navigate">
          <template #icon>
            <NIcon><Icon>mdi mdi-plus</Icon></NIcon>
          </template>
        </NButton>
      </RouterLink>
    </template>
  </NCard>
</template>
