<script setup lang="ts">
import Multiselect from "@vueform/multiselect";

interface Props {
	id?: string;
	title?: string;
	label?: string;
	placeholder?: string;
	name?: string;
	classes?: string;
	required?: boolean;
	readonly?: boolean;
	disabled?: boolean;
	autocomplete?: string;
	searchable?: boolean;
	options?: string[] | {
		value: number;
		label: string;
	}[];
}

defineProps<Props>();

const modelValue = defineModel()
</script>

<template>
	<div class="default-select" :class="classes">
		<label :for="id">{{ label }}</label>

		<Multiselect
			:id
			:title
			:placeholder
			:name
			:required
			:readonly
			:disabled
			:autocomplete
			:searchable
			:options
			v-model="modelValue"
		>
		</Multiselect>
	</div>
</template>

<style lang="sass">
.default-select
	.multiselect
		--ms-option-bg-selected: var(--color-primary-500)
		--ms-option-bg-selected-pointed: var(--color-primary-500)
</style>
