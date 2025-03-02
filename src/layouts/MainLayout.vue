<script setup lang="ts">
import MainHeader from "@/components/shared/MainHeader.vue";
import {useBaseStore} from "@/stores/base.js";
import {onMounted} from "vue";
import router from "@/router/index.ts";
import {storeToRefs} from "pinia";
import {api} from "@/api";

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
	if (!token.value) {
		unAuthorize();
		return;
	}

	const id = localStorage.getItem("userId");

	if (!id) {
		unAuthorize();
		return;
	}

	const response = await api.getUserData(id);

	if (response.data.success) {
		userData.value = response.data?.user;
	}
	else {
		unAuthorize();
		return;
	}
})
</script>

<template>
	<MainHeader/>
	<main class="main">
		<div class="main__header" v-if="title">
			<h1 class="main__header-title">{{ title }}</h1>
		</div>
		<slot></slot>
	</main>
</template>
