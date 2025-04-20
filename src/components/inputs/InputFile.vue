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

defineProps<Props>();

const emits = defineEmits(['file-upload'])

function fileHandler(e: Event) {
	const target = e.target as HTMLInputElement
	const file = target.files;

	emits('file-upload', file)
}
</script>

<template>
	<div class="default-input">
		<label class="default-input__label">
			{{ label }}
			<span v-if="required" class="default-input__label-required"> *</span>
		</label>
		<input
			class="default-input__file"
			type="file"
			:id
			:placeholder
			:title
			:name
			:readonly
			:disabled
			:autocomplete
			@change="fileHandler"
		/>
		<div v-if="error?.length" class="default-input__error">{{ error[0].$message }}</div>
	</div>
</template>
