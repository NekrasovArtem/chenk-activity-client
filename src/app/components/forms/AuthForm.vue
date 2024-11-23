<script setup>
import InputText from "@/app/components/inputs/InputText.vue";
import InputPassword from "@/app/components/inputs/InputPassword.vue";
import {reactive} from "vue";
import router from "@/app/router/index.js";
import {useBaseStore} from "@/app/stores/base.js";
import {authorization} from "@/app/api/index.js";
import {useToastStore} from "@/app/stores/toast.js";

const {setToken} = useBaseStore()
const { successMessage } = useToastStore()

const formData = reactive({
	email: '',
	password: '',
})

async function onSubmit() {
	const response = authorization(formData);

	if (response) {
		successMessage('Авторизация успешна')

		setToken(response.data.token);

		await router.push({name: 'Home'});
	}

}
</script>

<template>
	<form class="form" @submit.prevent="onSubmit">
		<h1 class="form__title">Авторизация</h1>
		<div class="form__items">
			<div class="form__item form__item--full">
				<InputText
					label="Почта"
					placeholder="Введите почту"
					v-model="formData.email"
				/>
			</div>
			<div class="form__item form__item--full">
				<div class="default-input">
					<InputPassword
						label="Пароль"
						placeholder="Введите пароль"
						v-model="formData.password"
					/>
				</div>
			</div>
		</div>
		<div class="form__bottom">
			<button type="submit" class="btn">
				<span class="btn__text">Войти</span>
			</button>
			<router-link :to="{ name: 'Register' }" class="link">Зарегистрироваться</router-link>
		</div>
	</form>
</template>
