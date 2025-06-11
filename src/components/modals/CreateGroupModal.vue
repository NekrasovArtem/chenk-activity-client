<script setup lang="ts">
import BaseModal from "@/components/modals/BaseModal.vue";
import InputText from "@/components/inputs/InputText.vue";
import SpecializationSelect from "@/components/shared/SpecializationSelect.vue";
import { api } from "@/api/index.ts";
import { onMounted, reactive, ref } from "vue";
import { useToastStore } from "@/stores/toast.ts";
import { useModalsStore } from "@/stores/modals.js";
import IconSVG from "@/components/shared/IconSVG.vue";

const { closeModal } = useModalsStore();
const { successMessage } = useToastStore();

const emits = defineEmits(['updateGroups']);

const formData = reactive({
	name: '',
	specialization_id: null,
});

const specialties = ref();

async function onSubmit() {
	const response = await api.createGroups(formData);

	if (response.success) {
		emits('updateGroups');
		successMessage('Группа создаан');
		closeModal('create-group-modal');
	}
}

onMounted(async () => {
	const response =  await api.getSpecializations();

	specialties.value = response.map((item: { id: number; name: string; code: string; qualification: string; }) => {
		return {
			...item,
			label: item.name,
			value: item.id,
		}
	})
})
</script>

<template>
	<teleport to="#modals-container">
		<BaseModal id="create-group-modal">
			<template #default="{ close }">
				<div class="modal">
					<div class="modal__head">
						<h2 class="modal__title">Создать группу</h2>
						<IconSVG class="modal__close" name="close" @click="close" />
					</div>
					<div class="modal__body">
						<div class="form">
							<div class="form__items">
								<InputText
									id="group-name"
									class="form__item form__item--full"
									label="Название:"
									placeholder="Введите название группы"
									v-model="formData.name"
								/>
								<SpecializationSelect
									id="group-specialization"
									class="form__item form__item--full"
									label="Специальность:"
									placeholder="Выберите специальность группы"
									searchable
									v-model="formData.specialization_id"
									:options="specialties"
								/>
							</div>
							<div class="form__bottom">
								<button class="btn" @click="onSubmit">Создать</button>
							</div>
						</div>
					</div>
				</div>
			</template>
		</BaseModal>
	</teleport>
</template>
