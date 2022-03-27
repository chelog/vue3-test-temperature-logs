<script setup lang="ts">
import dayjs from 'dayjs';
import { NButton, NIcon, NModal } from 'naive-ui';
import { ref } from 'vue';

import Icon from '@/components/Icon';
import { useStore } from '@/store';
import { LogEntry, LogEntryDto } from '@/types/app';

import EditLogEntry from './EditLogEntry.vue';

const store = useStore();

const props = defineProps<{
  /** Log entry to display */
  log: LogEntry;
}>();

const isEditing = ref(false);

const editLog = (dto: LogEntryDto) => {
  store.updateLog(props.log.id, dto);
  isEditing.value = false;
};
</script>

<template>
  <tr style="position: relative">
    <td>{{ log.id }}</td>
    <td>{{ dayjs(log.date).format('MM/DD/YYYY H:MM') }}</td>
    <td>{{ log.temperature }}°C</td>
    <td>
      <div class="row gap-5">
        <NButton circle secondary size="small" @click="isEditing = !isEditing">
          <template #icon>
            <NIcon><Icon>mdi mdi-pencil</Icon></NIcon>
          </template>
        </NButton>
        <NButton circle secondary size="small" @click="store.deleteLog(log.id)">
          <template #icon>
            <NIcon><Icon>mdi mdi-delete</Icon></NIcon>
          </template>
        </NButton>
      </div>
    </td>

    <NModal v-model:show="isEditing" :title="'Edit log #' + log.id" style="max-width: 450px" preset="card">
      <EditLogEntry :log="log" save-button-text="Update" @save="editLog" />
    </NModal>
  </tr>
</template>
