<script setup>
import BaseModal from "@/app/components/modals/BaseModal.vue";
import {importStudents} from "@/app/api/index.js";
import {useModalsStore} from "@/app/stores/modals.js";
import {useToastStore} from "@/app/stores/toast.js";
import DragAndDrop from "@/app/components/inputs/DragAndDrop.vue";
import {ref} from "vue";

const { closeModal } = useModalsStore();
const { successMessage } = useToastStore();

const formData = new FormData();
const file = ref(null)
const errorMessage = ref(null)

function fileUpload(uploadedFile) {
	if (uploadedFile.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
		errorMessage.value = 'Загружаемый файл должен быть формата *.xlsx';
		return;
	}
	errorMessage.value = null;
	formData.set("files", uploadedFile);
	file.value = uploadedFile
}

async function onSubmit() {
	const response = await importStudents(formData);

	if (response.status === 200) {
		closeModal('import-students-modal');
		successMessage('Студенты загружены')
	}
}
</script>

<template>
	<teleport to="#modals-container">
		<BaseModal id="import-students-modal">
			<template #default="{ close }">
				<div class="modal">
					<div class="modal__head">
						<h2 class="modal__title">Импорт студентов</h2>
						<img class="modal__close" src="/img/close.svg" alt="close" @click="close" />
					</div>
					<div class="modal__body">
						<div class="form">
							<div class="form__items">
								<DragAndDrop
									id="drag-n-drop"
									class="form__item form__item--full"
									label="Выберете файл или перетащите его сюда"
									@file-upload="fileUpload"
								/>
								<div v-if="file" class="form__item form__item--full">
									<span>Загружаемый файл: {{ file.name }}</span>
								</div>
								<div v-if="errorMessage" class="form__item form__item form__item--error">
									{{ errorMessage }}
								</div>
							</div>
							<div class="form__buttons">
								<button class="btn" @click="onSubmit">Отправить</button>
							</div>
						</div>
					</div>
				</div>
			</template>
		</BaseModal>
	</teleport>
</template>
