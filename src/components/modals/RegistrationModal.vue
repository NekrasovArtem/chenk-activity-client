<script setup lang="ts">
import BaseModal from "@/components/modals/BaseModal.vue";
import InputText from "@/components/inputs/InputText.vue";
import {computed, reactive} from "vue";
import { api } from "@/api";
import IconSVG from "@/components/shared/IconSVG.vue";
import {email, helpers, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import DefaultSelect from "@/components/inputs/DefaultSelect.vue";
import {useToastStore} from "@/stores/toast.ts";
import {useModalsStore} from "@/stores/modals.ts";

const { withMessage } = helpers;
const { successMessage, errorMessage } = useToastStore();
const { closeModal } = useModalsStore();

const initialData = {
	name: '',
	surname: '',
	patronymic: '',
	email: '',
	role: 'user',
}
const formData = reactive({ ...initialData });

const rules = computed(() => ({
	formData: {
		name: {
			required: withMessage('Поле обязательно для заполнения', required)
		},
		surname: {
			required: withMessage('Поле обязательно для заполнения', required)
		},
		email: {
			required: withMessage('Поле обязательно для заполнения', required),
			email: withMessage('Неверный формат email', email)
		},
	}
}))
const roles = [
	{
		label: 'Преподаватель',
		value: 'user',
	},
	{
		label: 'Администратор',
		value: 'admin',
	},
]

const v$ = useVuelidate(rules, { formData })

async function onSubmit() {
	const validation = await v$.value.formData.$validate();

	if (!validation)
		return;

	const response = await api.registration(formData);

	if (!response.success) {
		errorMessage('Возникла ошибка');
		return;
	}

	successMessage('Сотрудник добавлен в систему');
	closeModal('registration-modal');
	Object.assign(formData, initialData);
	v$.value.formData.$reset();
}
</script>

<template>
	<teleport to="#modals-container">
		<BaseModal id="registration-modal">
			<template #default="{ close }">
				<div class="modal">
					<div class="modal__head">
						<h2 class="modal__title">Добавить сотрудника</h2>
						<IconSVG class="modal__close" name="close" @click="close" />
					</div>
					<div class="modal__body">
						<form class="form" @submit.prevent="onSubmit">
							<div class="form__items">
								<InputText
									id="surname-input"
									class="form__item"
									label="Фамилия:"
									placeholder="Введите фамилию"
									v-model="formData.surname"
									:error="v$.formData.surname.$errors"
								/>
								<InputText
									id="name-input"
									class="form__item"
									label="Имя:"
									placeholder="Введите имя"
									v-model="formData.name"
									:error="v$.formData.name.$errors"
								/>
								<InputText
									id="patronymic-input"
									class="form__item form__item--full"
									label="Отчество:"
									placeholder="Введите отчество"
									v-model="formData.patronymic"
								/>
								<InputText
									id="email-input"
									class="form__item"
									label="Email:"
									placeholder="Введите email"
									v-model="formData.email"
									:error="v$.formData.email.$errors"
								/>
								<DefaultSelect
									id="role-select"
									class="form__item"
									label="Роль:"
									v-model="formData.role"
									:options="roles"
									:can-clear="false"
									:can-deselect="false"
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
