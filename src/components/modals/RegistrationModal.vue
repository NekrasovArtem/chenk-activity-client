<script setup lang="ts">
import BaseModal from "@/components/modals/BaseModal.vue";
import InputText from "@/components/inputs/InputText.vue";
import { reactive } from "vue";
import { api } from "@/api";

const formData = reactive({
	email: '',
});

async function onSubmit() {
	const response = await api.registration(formData);

	console.log('добавить сотрудника');
	console.log(response);
}
</script>

<template>
	<teleport to="#modals-container">
		<BaseModal id="registration-modal">
			<template #default="{ close }">
				<div class="modal">
					<div class="modal__head">
						<h2 class="modal__title">Создать группу</h2>
						<img class="modal__close" src="/img/close.svg" alt="close" @click="close" />
					</div>
					<div class="modal__body">
						<form class="form" @submit.prevent="onSubmit">
							<div class="form__items">
								<InputText
									id="email-input"
									class="form__item form__item--full"
									label="Email:"
									placeholder="Введите email"
									v-model="formData.email"
								/>
							</div>
							<div class="form__buttons">
								<button class="btn">Добавить</button>
							</div>
						</form>
					</div>
				</div>
			</template>
		</BaseModal>
	</teleport>
</template>
