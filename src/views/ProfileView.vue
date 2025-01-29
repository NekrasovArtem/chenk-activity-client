<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import router from "@/app/router/index.js";
import {useBaseStore} from "@/app/stores/base.js";
import {useToastStore} from "@/app/stores/toast.js";

const {deleteData} = useBaseStore()
const {successMessage} = useToastStore()

async function logout() {
	deleteData();
	successMessage('Выход из аккаунта');
	await router.push({name: 'Home'});
}

const { getUser } = useBaseStore();

const user = getUser();
</script>

<template>
	<MainLayout :title="'Профиль'">
		<section class="section profile">
			<div class="profile__wrapper">
				<div class="profile__info">
					<h2 class="profile__title">{{ `${user?.surname} ${user?.name} ${user?.patronymic}` }}</h2>
					<span class="profile__email">Почта: {{ user?.email }}</span>
				</div>
				<div class="profile__actions">
					<button class="btn btn--secondary" @click="logout">Выйти</button>
				</div>
			</div>
		</section>
	</MainLayout>
</template>
