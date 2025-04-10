<script setup lang="ts">
import BaseModal from "@/components/modals/BaseModal.vue";
import DragAndDrop from "@/components/inputs/DragAndDrop.vue";
import { api } from "@/api/index.ts";
import { useModalsStore } from "@/stores/modals.js";
import { useToastStore } from "@/stores/toast.ts";
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useGroupsStore } from "@/stores/groups.ts";
import DefaultSelect from "@/components/inputs/DefaultSelect.vue";

const { closeModal } = useModalsStore();
const { successMessage, errorMessage } = useToastStore();
const { groups } = storeToRefs(useGroupsStore());

const formData = new FormData();
const file = ref<File | null>(null)
const error = ref<null | string>(null)
const filteredGroups = computed(() => {
	return groups.value?.map((item: { id: number; name: string; }) => {
		return {
			...item,
			label: item.name,
			value: item.id,
		}
	})
})
const groupId = ref<string>('0')

function fileUpload(uploadedFile: File) {
	if (uploadedFile.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
		error.value = 'Загружаемый файл должен быть формата *.xlsx';
		return;
	}

	error.value = null;
	formData.set("file", uploadedFile);
	file.value = uploadedFile
}

async function onSubmit() {
	formData.set("group", groupId.value);

	const response = await api.importStudents(formData);

	if (response.data.success) {
		closeModal('import-students-modal');
		successMessage('Студенты загружены')
		return;
	}

	errorMessage('Ошибка');
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
								<DefaultSelect
									id="group-name"
									class="form__item form__item--full"
									label="Группа:"
									placeholder="Выберите группы"
									:searchable="true"
									:options="filteredGroups"
									v-model="groupId"
								>
									<template #option="{ option }">
										<div class="option">{{ option.label }}</div>
									</template>
								</DefaultSelect>
								<DragAndDrop
									id="drag-n-drop"
									class="form__item form__item--full"
									label="Выберете файл или перетащите его сюда"
									@file-upload="fileUpload"
								/>
								<div v-if="file" class="form__item form__item--full">
									<span>Загружаемый файл: {{ file?.name }}</span>
								</div>
								<div v-if="error" class="form__item form__item form__item--error">
									{{ error }}
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
