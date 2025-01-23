<script setup>
import BaseModal from "@/app/components/modals/BaseModal.vue";
import InputFile from "@/app/components/inputs/InputFile.vue";
import {importStudents} from "@/app/api/index.js";
import {useModalsStore} from "@/app/stores/modals.js";
import {useToastStore} from "@/app/stores/toast.js";

const { closeModal } = useModalsStore();
const { successMessage } = useToastStore();

const formData = new FormData();

function fileUpload(file) {
	formData.append("file", file);
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
								<InputFile
									id="file-input"
									@file-upload="fileUpload"
								/>
							</div>
							<div class="form__buttons">
								<button @click="onSubmit">Отправить</button>
							</div>
						</div>
					</div>
				</div>
			</template>
		</BaseModal>
	</teleport>
</template>
