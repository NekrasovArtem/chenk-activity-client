<script setup lang="ts">
import Multiselect from "@vueform/multiselect";

interface Props {
	id?: string;
	title?: string;
	label?: string;
	placeholder?: string;
	name?: string;
	mode?: 'single' | 'multiple';
	classes?: string;
	required?: boolean;
	readonly?: boolean;
	disabled?: boolean;
	closeOnSelect?: boolean;
	autocomplete?: string;
	searchable?: boolean;
	options?: string[] | {
		value: number;
		label: string;
	}[];
}

const {
	closeOnSelect = true,
} = defineProps<Props>();

const modelValue = defineModel()
</script>

<template>
	<div class="default-select" :class="classes">
		<label class="default-select__label" :for="id">{{ label }}</label>

		<Multiselect
			:id
			:title
			:placeholder
			:name
			:mode
			:required
			:readonly
			:disabled
			:autocomplete
			:searchable
			:options
			:close-on-select
			v-model="modelValue"
		>
			<template #clear="{ clear }">
				<span @click="clear" tabindex="0" role="button" data-clear="" aria-roledescription="❎" class="multiselect-clear"><span class="multiselect-clear-icon"></span></span>
			</template>

			<slot />
		</Multiselect>
	</div>
</template>

<style lang="sass">
.default-select
	.multiselect
		--ms-option-bg-selected: var(--color-primary-500)
		--ms-option-bg-selected-pointed: var(--color-primary-500)
</style>
