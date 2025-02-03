<script setup>
import InputText from "@/app/components/inputs/InputText.vue";
import InputPassword from "@/app/components/inputs/InputPassword.vue";
import {reactive} from "vue";
import router from "@/app/router/index.js";
import {useBaseStore} from "@/app/stores/base.js";
import {useToastStore} from "@/app/stores/toast.js";
import {api} from "@/app/api/index.js";

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
				:class="'form__item form__item--full'"
			/>
			<InputPassword
				label="Пароль"
				placeholder="Введите пароль"
				v-model="formData.password"
				:class="'form__item form__item--full'"
			/>
		</div>
		<div class="form__bottom">
			<button type="submit" class="btn">
				<span class="btn__text">Войти</span>
			</button>
		</div>
	</form>
</template>
