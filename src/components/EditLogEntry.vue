<script setup lang="ts">
import { NButton, NFormItem, NInputNumber } from 'naive-ui';
import { computed, onMounted, ref, watch } from 'vue';

import { LogEntryDto } from '@/types/app';

const props = defineProps<{
  /** Initial log data to fill in form */
  log?: LogEntryDto;
  /** Custom "save" button text */
  saveButtonText?: string;
}>();

const emit = defineEmits<{
  /** Called when "save" button pressed */
  (eventName: 'save', log: LogEntryDto): void;

  (eventName: 'update:modelValue', log: LogEntryDto): void;
}>();

const isLoading = ref(false);
const isInputValid = ref(true);
const inputFeedback = ref<string | undefined>(undefined);
const log = ref<LogEntryDto>({ temperature: props.log?.temperature ?? 0 });

const inputValidationStatus = computed(() => {
  if (!isInputValid.value) return 'error';
  if (inputFeedback.value) return 'warning';
  return undefined;
});

const updateInputValidation = (log: LogEntryDto) => {
  isInputValid.value = true;
  inputFeedback.value = undefined;

  if (log.temperature < -273.15) {
    isInputValid.value = false;
    inputFeedback.value = 'Are you joking? Take a physics lesson';
    return;
  }

  if (log.temperature > 200 || log.temperature < -50) {
    inputFeedback.value = 'Readings are out of range, check the sensor';
  }
};

watch(
  log,
  (newValue) => {
    updateInputValidation(newValue);
    emit('update:modelValue', newValue);
  },
  { deep: true },
);

onMounted(() => updateInputValidation(log.value));
</script>

<template>
  <div class="column gap-10">
    <NFormItem :validation-status="inputValidationStatus" label="Sensor readings" :feedback="inputFeedback">
      <NInputNumber v-model:value="log.temperature" class="full-width" placeholder="Temperature in degrees" />
    </NFormItem>

    <NButton round :disabled="!isInputValid" :loading="isLoading" @click="emit('save', log)">
      {{ saveButtonText ?? 'Save' }}
    </NButton>
  </div>
</template>
