<script setup lang="ts">
import { NEmpty, NTable } from 'naive-ui';

import { LogEntry } from '@/types/app';

import LogLine from './LogLine.vue';

defineProps<{
  /** Array of logs to display in list */
  logs: LogEntry[];
}>();
</script>

<template>
  <NTable v-if="logs.length > 0" class="log-list">
    <thead>
      <tr>
        <th>ID</th>
        <th>Date</th>
        <th>Readings</th>
        <th><!-- action buttons --></th>
      </tr>
    </thead>
    <tbody>
      <LogLine v-for="log in logs" :key="log.id" :log="log" />
    </tbody>
  </NTable>
  <NEmpty v-else description="No readings" />
</template>

<style lang="scss">
.log-list {
  overflow: visible;

  tr {
    overflow: visible;
  }
}
</style>
