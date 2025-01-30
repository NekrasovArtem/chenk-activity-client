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
	options: Array,
});

const modelValue = defineModel()
</script>

<template>
	<Multiselect
		:id
		:class="class"
		:title
		:label
		:placeholder
		:name
		:required
		:readonly
		:disabled
		:autocomplete
		v-model="modelValue"
		:options
	>
		<template #option="{ option }">
			<div class="option">
				{{option.code}}
			</div>
		</template>
	</Multiselect>
</template>

<style scoped lang="sass">
//.multiselect
//	width: 100%
</style>
