<script setup lang="ts">
import MainHeader from "@/components/shared/MainHeader.vue";
import { useBaseStore } from "@/stores/base.js";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { api } from "@/api";
import router from "@/router/index.ts";
import MobileMenu from "@/components/shared/MobileMenu.vue";
import IconSVG from "@/components/shared/IconSVG.vue";

interface Props {
	title: string;
	back?: boolean;
}

defineProps<Props>();

const { token, userData } = storeToRefs(useBaseStore());

function unAuthorize() {
	token.value = null;
	userData.value = null;
	router.push({ name: "Auth" });
}

onMounted(async () => {
	const id = localStorage.getItem("userId");

	if (!id || !token.value) {
		unAuthorize();
		return;
	}

	if (!userData.value) {
		const response = await api.getUserData(id);

		if (!response.data.success) {
			unAuthorize();
			return;
		}

		userData.value = response.data?.data;
	}
})
</script>

<template>
	<main class="main">
		<div v-if="back" class="main__back">
			<a @click="router.back()" class="link">
				<IconSVG class="link__icon" name="arrow-left" />
				<span class="link__text">Назад</span>
			</a>
		</div>
		<div class="main__header" v-if="title">
			<h1 class="main__header-title">{{ title }}</h1>
		</div>
		<slot></slot>
	</main>
</template>
