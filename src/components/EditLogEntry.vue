<script setup lang="ts">
import { NButton, NDatePicker, NFormItem, NInputNumber } from 'naive-ui';
import { computed, watch } from 'vue';

import { LogEntryDto } from '@/types/app';
import { allValid, useFieldProps, useValidated, ValidationResult } from '@/use/validate';

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

const temperature = useValidated(props.log?.temperature ?? 0, (value): ValidationResult => {
  if (value < -273.15) return { isValid: false, message: 'Are you joking? Take a physics lesson' };
  if (value > 200 || value < -50) return { isValid: true, message: 'Readings are out of range, check the sensor' };

  return { isValid: true };
});

const date = useValidated(props.log?.date.getTime() ?? Date.now(), (value): ValidationResult => {
  if (value > Date.now()) return { isValid: false, message: 'Are you what, from future?' };

  return { isValid: true };
});

const fieldProps = useFieldProps({ temperature, date });
const canSave = allValid([temperature, date]);

const logDto = computed<LogEntryDto>(() => ({
  temperature: temperature.value,
  date: new Date(date.value),
}));

watch(logDto, (value) => emit('update:modelValue', value));

// if source log entry is set, we want to get updates from that
if (props.log) watch(props.log, (newValue) => (temperature.value = newValue.temperature), { deep: true });
</script>

<template>
  <div class="column gap-10">
    <NFormItem
      label="Sensor readings"
      :feedback="fieldProps.temperature.feedback.value"
      :validation-status="fieldProps.temperature.status.value"
    >
      <NInputNumber v-model:value="temperature" class="full-width" placeholder="Temperature in degrees" />
    </NFormItem>
    <NFormItem
      label="Observation date"
      :feedback="fieldProps.date.feedback.value"
      :validation-status="fieldProps.date.status.value"
    >
      <NDatePicker v-model:value="date" class="full-width" type="datetime" />
    </NFormItem>

    <NButton round :disabled="!canSave" @click="emit('save', logDto)">
      {{ saveButtonText ?? 'Save' }}
    </NButton>
  </div>
</template>
