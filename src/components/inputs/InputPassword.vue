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
		<div v-if="error?.length" class="default-input__error">{{ error[0].$message }}</div>
	</div>
</template>
