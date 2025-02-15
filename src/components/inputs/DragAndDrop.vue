<script setup lang="ts">
import {ref, useTemplateRef} from "vue";

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

const fileInput = useTemplateRef('file-input');
const isActive = ref(false);

function transferFile(e: Event) {
	isActive.value = false;

	const file = e.dataTransfer.files[0];

	emits('file-upload', file)
}

function fileHandler(e: Event) {
	const target = e.target as HTMLInputElement
	const file = target.files;

	emits('file-upload', file)
}
</script>

<template>
	<div class="drag-n-drop" :class>
		<input
			class="drag-n-drop__input"
			type="file"
			:id
			:placeholder
			:title
			:name
			:readonly
			:disabled
			:autocomplete
			@change="fileHandler"
			ref="file-input"
		/>
		<div
			class="drag-n-drop__container"
			:class="{active: isActive}"
			@click="fileInput?.click"
			@dragenter.prevent="isActive = true"
			@dragover.prevent="isActive = true"
			@dragleave.prevent="isActive = false"
			@drop.prevent="transferFile"
		>
			<img class="drag-n-drop__img" src="/img/upload.png" alt="alt"/>
			<label :for="id" class="drag-n-drop__label">
				{{ label }}
			</label>
		</div>
	</div>
</template>

<style lang="sass">
@use '@/styles/base/mixins' as *
.drag-n-drop
	width: 100%

	&__input
		display: none

	&__container
		width: 100%
		height: 360px
		display: flex
		flex-direction: column
		justify-content: center
		align-items: center
		gap: 20px
		border: 1px solid var(--color-primary-400)
		border-radius: 12px
		cursor: pointer
		transition: background-color .3s

		@include hover()
			background-color: var(--color-primary-100-trans-30)

		&.active
			background-color: var(--color-primary-100-trans-30)
</style>
