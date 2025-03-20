<script setup lang="ts">
import InputText from "@/components/inputs/InputText.vue";
import { reactive } from "vue";
import { api } from "@/api/index.ts";
import { useToastStore } from "@/stores/toast.ts";
import router from "@/router/index.ts";

const {successMessage, errorMessage} = useToastStore()

const formData = reactive({
	name: "",
	surname: "",
	patronymic: "",
	phone: "",
	email: "",
	password: "",
});

async function onSubmit() {
	const promise = await api.registration(formData)

	if (promise.status === 200) {
		successMessage('Вы успешно зарегистрировались')
		await router.replace({name: 'Auth'})
	} else {
		errorMessage('Ошибка!')
	}
}
</script>

<template>
	<form class="form" @submit.prevent="onSubmit">
		<h1 class="form__title">Регистрация</h1>
		<div class="form__items">
			<InputText
				label="Имя"
				placeholder="Имя"
				v-model="formData.name"
				required
				:classes="'form__item'"
			/>
			<InputText
				label="Фамилия"
				placeholder="Фамилия"
				v-model="formData.surname"
				required
				:classes="'form__item'"
			/>
			<InputText
				label="Отчество"
				placeholder="Отчество"
				v-model="formData.patronymic"
				:classes="'form__item form__item--full'"
			/>
			<InputText
				label="E-mail"
				placeholder="E-mail"
				v-model="formData.email"
				required
				:classes="'form__item'"
			/>
		</div>
		<div class="form__bottom">
			<button type="submit" class="btn">
				<span class="btn__text">Зарегистрироваться</span>
			</button>
			<router-link :to="{ name: 'Auth' }" class="link">Войти</router-link>
		</div>
	</form>
</template>
