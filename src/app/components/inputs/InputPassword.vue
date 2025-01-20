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
	<div class="default-input" :class>
		<label class="default-input__label">
			{{ label }}
			<span v-if="required" class="default-input__label-required"> *</span>
		</label>
		<div class="input-password">
			<input
				class="default-input__input"
				type="password"
				v-model="modelValue"
				:id
				:placeholder
				:title
				:name
				:readonly
				:disabled
			/>
			<span class="input-password__icon">
        <span class="input-password__icon-image"/>
      </span>
		</div>
	</div>
</template>
