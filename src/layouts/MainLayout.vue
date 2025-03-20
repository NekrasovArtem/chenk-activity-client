<script setup lang="ts">
import MainHeader from "@/components/shared/MainHeader.vue";
import { useBaseStore } from "@/stores/base.js";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { api } from "@/api";
import router from "@/router/index.ts";

defineProps({
	title: String
})

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

		userData.value = response.data?.user;
	}
})
</script>

<template>
	<MainHeader />
	<main class="main">
		<div class="main__header" v-if="title">
			<h1 class="main__header-title">{{ title }}</h1>
		</div>
		<slot></slot>
	</main>
</template>
