<script setup>
import BaseModal from "@/app/components/modals/BaseModal.vue";
import InputText from "@/app/components/inputs/InputText.vue";
import {onMounted, reactive, ref} from "vue";
import {api} from "@/app/api/index.js";
import router from "@/app/router/index.js";
import SpecializationSelect from "@/app/components/shared/SpecializationSelect.vue";

const formData = reactive({
	name: '',
	specialization_id: null,
});

const specialties = ref(null);

async function onSubmit() {
	const response = await api.createGroups(formData);

	console.log(response);

	if (response.success) {
		await router.push({name: 'Groups'})
	}
}

onMounted(async () => {
	const response =  await api.getSpecializations();

	specialties.value = response.map((item) => {
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
						<img class="modal__close" src="/img/close.svg" alt="close" @click="close" />
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

<style lang="sass">

</style>
