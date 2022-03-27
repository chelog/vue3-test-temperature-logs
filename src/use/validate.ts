import { extendRef } from '@vueuse/core';
import { computed, ComputedRef, Ref, ref, ShallowUnwrapRef } from 'vue';

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export type ValidatedRef<TValue = any, TResult = ValidationResult> = ShallowUnwrapRef<{
  validation: ComputedRef<TResult>;
}> &
  Ref<TValue>;

interface FieldProps {
  status: ComputedRef<'success' | 'warning' | 'error' | undefined>;
  feedback: ComputedRef<string | undefined>;
}

/**
 * Create a ref that is validated through supplied function
 *
 * @param initial Initial data to set for `value`
 * @param validate Validator function, runs on every `value` update
 * @returns A ref with additional `validation` property
 */
export const useValidated = <TValue, TResult>(initial: TValue, validate: (value: TValue) => TResult) => {
  const value = ref(initial);
  const validation = computed(() => validate(value.value as TValue));

  // using `as Ref<TValue>` because typing freaks out with generics and UnwrapRef
  return extendRef(value as Ref<TValue>, { validation });
};

/**
 * Create mapped reactive object with props for use in form components
 * from supplied validate refs
 *
 * @param refs Object of validated refs that return `ValidationResult`s
 * @returns Mapped object with field props
 */
export const useFieldProps = <T extends { [key: string]: ValidatedRef<any, ValidationResult> }>(refs: T) => {
  const props: { [TKey in keyof T]: FieldProps } = {} as any;
  for (const key in refs)
    props[key] = {
      feedback: computed(() => refs[key].validation.message),
      status: computed(() => {
        const { isValid, message } = refs[key].validation;
        if (!isValid) return 'error';
        if (message) return 'warning';
        return undefined;
      }),
    };

  return props;
};

/**
 * Create reactive boolean value watching all validated refs to be valid
 *
 * @param refs Array of validated refs that return `ValidationResult`s
 * @returns Whether all refs are valid
 */
export const allValid = (refs: ValidatedRef<any, ValidationResult>[]) =>
  computed(() => refs.every((ref) => ref.validation.isValid));
