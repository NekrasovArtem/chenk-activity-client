<script setup lang="ts">
import type {ErrorObject} from "@vuelidate/core";

interface Props {
	id?: string;
	title?: string;
	label?: string;
	placeholder?: string;
	name?: string;
	error?: ErrorObject[];
	required?: boolean;
	readonly?: boolean;
	disabled?: boolean;
	autocomplete?: string;
}

defineProps<Props>()

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
			type="date"
			v-model="modelValue"
			:id
			:placeholder
			:title
			:name
			:readonly
			:disabled
			:autocomplete
		/>
		<div v-if="error?.length" class="default-input__error">{{ error[0].$message }}</div>
	</div>
</template>
