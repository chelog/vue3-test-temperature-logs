<script setup lang="ts">
import { DeleteRound, EditRound } from '@vicons/material';
import { NButton, NIcon, NModal } from 'naive-ui';
import { ref } from 'vue';
import { useStore } from 'vuex';

import { UpdateLogPayload } from '@/store';
import { LogEntry, LogEntryDto } from '@/types/app';

import EditLogEntry from './EditLogEntry.vue';

const store = useStore();

const props = defineProps<{
  /** Log entry to display */
  log: LogEntry;
}>();

const isEditing = ref(false);

const editLog = (dto: LogEntryDto) => {
  const payload: UpdateLogPayload = {
    logId: props.log.id,
    data: { temperature: dto.temperature },
  };
  store.dispatch('updateLog', payload);

  isEditing.value = false;
};
</script>

<template>
  <tr style="position: relative">
    <td>{{ log.id }}</td>
    <td>{{ log.temperature }}°C</td>
    <td>
      <div class="row gap-5">
        <NButton circle secondary size="small" @click="isEditing = !isEditing">
          <template #icon>
            <NIcon><EditRound /></NIcon>
          </template>
        </NButton>
        <NButton circle secondary size="small" @click="store.dispatch('deleteLog', log.id)">
          <template #icon>
            <NIcon><DeleteRound /></NIcon>
          </template>
        </NButton>
      </div>
    </td>

    <NModal v-model:show="isEditing" :title="'Edit log #' + log.id" style="max-width: 450px" preset="card">
      <EditLogEntry :log-dto="log" save-button-text="Update" @save="editLog" />
    </NModal>
  </tr>
</template>
