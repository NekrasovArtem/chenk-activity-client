<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import router from "@/router/index.js";
import {useBaseStore} from "@/stores/base.js";
import {useToastStore} from "@/stores/toast.ts";
import {storeToRefs} from "pinia";

const {deleteData} = useBaseStore()
const {successMessage} = useToastStore()

async function logout() {
	deleteData();
	successMessage('Выход из аккаунта');
	await router.push({name: 'Home'});
}

const { userData } = storeToRefs(useBaseStore());
</script>

<template>
	<MainLayout :title="'Профиль'">
		<section class="section profile">
			<div class="profile__wrapper">
				<div class="profile__info">
					<h2 class="profile__title">{{ `${userData?.surname} ${userData?.name} ${userData?.patronymic}` }}</h2>
					<span class="profile__email">Почта: {{ userData?.email }}</span>
				</div>
				<div class="profile__actions">
					<button class="btn btn--secondary" @click="logout">Выйти</button>
				</div>
			</div>
		</section>
	</MainLayout>
</template>
