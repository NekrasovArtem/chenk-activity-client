<script setup lang="ts">
import InputText from "@/components/inputs/InputText.vue";
import InputPassword from "@/components/inputs/InputPassword.vue";
import { reactive } from "vue";
import { useBaseStore } from "@/stores/base.js";
import { useToastStore } from "@/stores/toast.ts";
import { api } from "@/api/index.ts";
import router from "@/router/index.ts";

const {setToken, setUser} = useBaseStore()
const { successMessage, errorMessage } = useToastStore()

const formData = reactive({
	email: '',
	password: '',
})

async function onSubmit() {
	const promise = await api.authorization(formData)

	if (promise.status === 200) {
		const response = await promise.data;

		setToken(response.data.token);
		setUser(response.data.user);

		successMessage('Авторизация успешна');

		await router.replace({name: 'Home'});
	} else {
		errorMessage('Ошибка');
	}

}
</script>

<template>
	<form class="form" @submit.prevent="onSubmit">
		<h1 class="form__title">Авторизация</h1>
		<div class="form__items">
			<InputText
				label="Почта"
				placeholder="Введите почту"
				v-model="formData.email"
				autocomplete="email"
				:classes="'form__item form__item--full'"
			/>
			<InputPassword
				label="Пароль"
				placeholder="Введите пароль"
				v-model="formData.password"
				:classes="'form__item form__item--full'"
			/>
		</div>
		<div class="form__bottom">
			<button type="submit" class="btn">
				<span class="btn__text">Войти</span>
			</button>
		</div>
	</form>
</template>
