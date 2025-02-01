<script setup>
import Multiselect from "@vueform/multiselect";

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
	autocomplete: String,
	searchable: Boolean,
	options: Array,
});

const modelValue = defineModel()
</script>

<template>
	<div class="input-select" :class>
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
			<slot />
		</Multiselect>
	</div>
</template>

<style scoped lang="sass">
.input-select
	display: flex
	flex-direction: column
	gap: 4px
</style>
