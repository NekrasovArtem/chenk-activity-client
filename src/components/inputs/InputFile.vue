<script setup lang="ts">

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
})

const emits = defineEmits(['file-upload'])

function fileHandler(e: Event) {
	// TODO
	const target = e.target as HTMLInputElement
	const file = target.files;

	emits('file-upload', file)
}
</script>

<template>
	<div class="default-input" :class>
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
	</div>
</template>
