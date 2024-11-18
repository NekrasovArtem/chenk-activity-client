<script setup>
defineProps({
  id: String,
  title: String,
  label: String,
  placeholder: String,
  name: String,
  class: String,
  required: Boolean,
  readonly: Boolean,
  disabled: Boolean,
})

const modelValue = defineModel()
</script>

<template>
  <div class="default-input">
    <label class="default-input__label">
      {{ label }}
      <span v-if="required" class="default-input__label-required"> *</span>
    </label>
    <input
      class="default-input__input"
      type="text"
      v-model="modelValue"
      :id
      :placeholder
      :title
      :name
      :readonly
      :disabled
    />
  </div>
</template>
