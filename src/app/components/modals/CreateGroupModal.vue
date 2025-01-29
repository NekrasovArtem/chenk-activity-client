<script setup>
import BaseModal from "@/app/components/modals/BaseModal.vue";
import InputText from "@/app/components/inputs/InputText.vue";
import {onMounted, reactive, ref} from "vue";
import {api} from "@/app/api/index.js";
import router from "@/app/router/index.js";

const formData = reactive({
	name: '',
	specialization_id: null,
});

const specialties = ref(null);

async function onSubmit() {
	const response = await api.createGroups(formData);

	if (response.success) {
		await router.push({name: 'Groups'})
	}
}

onMounted(async () => {
	specialties.value =  await api.getSpecializations();
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
									v-model="formData.name"
								/>
								<select class="form__item form__item--full" v-model="formData.specialization_id">
									<option v-for="spec in specialties" :value="spec.id">{{ spec.name }}</option>
								</select>
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
