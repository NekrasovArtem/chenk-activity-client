<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import PasswordModal from "@/components/modals/PasswordModal.vue";
import RegistrationModal from "@/components/modals/RegistrationModal.vue";
import router from "@/router/index.js";
import { useBaseStore } from "@/stores/base.js";
import { useToastStore } from "@/stores/toast.ts";
import { storeToRefs } from "pinia";
import { useModalsStore } from "@/stores/modals.ts";

const { openModal } = useModalsStore();
const { deleteData } = useBaseStore();
const { successMessage } = useToastStore();
const { userData } = storeToRefs(useBaseStore());

async function logout() {
	deleteData();
	successMessage('Выход из аккаунта');
	await router.push({ name: 'Auth' });
	return;
}
</script>

<template>
	<MainLayout :title="'Профиль'">
		<section class="section profile" v-if="userData">
			<div class="profile__wrapper">
				<div class="profile__user">
					<img class="profile__img" src="/img/profile.webp" alt="Аватарка" />
					<div class="profile__info">
						<h2 class="profile__title">{{ `${userData.surname} ${userData.name} ${userData.patronymic || ''}` }}</h2>
						<span class="profile__email">{{ userData.email }}</span>
					</div>
				</div>
				<div class="profile__actions">
					<button class="btn btn--secondary" @click="logout">Выйти</button>
					<button class="btn" @click="openModal('password-modal')">Сбросить пароль</button>
					<button v-if="userData.role === 'admin'" class="btn" @click="openModal('registration-modal')">Добавить сотрудника</button>
				</div>
			</div>
		</section>

		<PasswordModal />
		<RegistrationModal />
	</MainLayout>
</template>
