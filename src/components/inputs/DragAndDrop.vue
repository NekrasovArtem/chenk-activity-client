<script setup lang="ts">
import { ref, useTemplateRef } from "vue";

defineProps({
	id: String,
	title: String,
	label: String,
	placeholder: String,
	name: String,
	required: Boolean,
	readonly: Boolean,
	disabled: Boolean,
	autocomplete: String,
})

const emits = defineEmits(['file-upload'])

const fileInput = useTemplateRef('file-input');
const isActive = ref(false);

function transferFile(e: DragEvent) {
	isActive.value = false;

	const dataTransfer = e.dataTransfer;

	if (!dataTransfer) {
		return;
	}

	const file = dataTransfer.files[0];

	emits('file-upload', file)
}

function fileHandler(e: Event) {
	const target = e.target as HTMLInputElement
	const file = target.files?.[0];

	emits('file-upload', file)
}
</script>

<template>
	<div class="drag-n-drop">
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
