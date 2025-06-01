<script setup lang="ts">
import Multiselect from "@vueform/multiselect";
import type {ErrorObject} from "@vuelidate/core";

type MultiselectProps = InstanceType<typeof Multiselect>['$props'];

interface Props {
	id?: string;
	title?: string;
	label?: string;
	labelProp?: MultiselectProps['label'];
	valueProp?: MultiselectProps['valueProp'];
	placeholder?: MultiselectProps['placeholder'];
	name?: string;
	mode?: MultiselectProps['mode'];
	error?: ErrorObject[];
	required?: MultiselectProps['required'];
	disabled?: MultiselectProps['disabled'];
	closeOnSelect?: MultiselectProps['closeOnSelect'];
	canClear?: MultiselectProps['canClear'];
	canDeselect?: MultiselectProps['canDeselect'];
	searchable?: MultiselectProps['searchable'];
	options?: MultiselectProps['options'];
}

const {
	closeOnSelect = true,
} = defineProps<Props>();

const modelValue = defineModel()

const emit = defineEmits(['change'])
</script>

<template>
	<div class="default-select">
		<label class="default-select__label" :for="id">{{ label }}</label>

		<Multiselect
			:id
			:title
			:placeholder
			:name
			:mode
			:required
			:disabled
			:searchable
			:options
			:close-on-select
			:can-clear
			:can-deselect
			:label="labelProp"
			:value-prop
			v-model="modelValue"
			@select="emit('change')"
			@deselect="emit('change')"
		>
			<template #clear="{ clear }">
				<span @click="clear" tabindex="0" role="button" data-clear="" aria-roledescription="❎" class="multiselect-clear"><span class="multiselect-clear-icon"></span></span>
			</template>

			<slot />
		</Multiselect>
		<div v-if="error?.length" class="default-input__error">{{ error[0].$message }}</div>
	</div>
</template>

<style lang="sass">
.default-select
	.multiselect
		--ms-option-bg-selected: var(--color-primary-500)
		--ms-option-bg-selected-pointed: var(--color-primary-500)
</style>
