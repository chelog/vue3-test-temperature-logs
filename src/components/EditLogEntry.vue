<script setup lang="ts">
import { NButton, NFormItem, NInputNumber } from 'naive-ui';
import { computed, onMounted, ref, watch } from 'vue';

import { LogEntryDto } from '@/types/app';

const props = defineProps<{
  /** Initial log data to start form with */
  log?: LogEntryDto;
  /** Custom "save" button text */
  saveButtonText?: string;
}>();

const emit = defineEmits<{
  /** Called when "save" button pressed */
  (eventName: 'save', log: LogEntryDto): void;

  (eventName: 'update:modelValue', log: LogEntryDto): void;
}>();

const isInputValid = ref(true);
const inputFeedback = ref<string | undefined>(undefined);
const logDto = ref<LogEntryDto>({ temperature: props.log?.temperature ?? 0 });

// used to set NInputNumer's feedback color
const inputValidationStatus = computed(() => {
  if (!isInputValid.value) return 'error';
  if (inputFeedback.value) return 'warning';
  return undefined;
});

// called after every change to validate temperature value
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

// if source log entry is set, we want to get updates from that
if (props.log) watch(props.log, (newValue) => (logDto.value = newValue));

watch(
  logDto,
  (newValue) => {
    updateInputValidation(newValue);
    emit('update:modelValue', newValue);
  },
  { deep: true },
);

onMounted(() => updateInputValidation(logDto.value));
</script>

<template>
  <div class="column gap-10">
    <NFormItem :validation-status="inputValidationStatus" label="Sensor readings" :feedback="inputFeedback">
      <NInputNumber v-model:value="logDto.temperature" class="full-width" placeholder="Temperature in degrees" />
    </NFormItem>

    <NButton round :disabled="!isInputValid" @click="emit('save', logDto)">
      {{ saveButtonText ?? 'Save' }}
    </NButton>
  </div>
</template>
