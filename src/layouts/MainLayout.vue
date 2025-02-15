<script setup lang="ts">
import MainHeader from "@/components/shared/MainHeader.vue";
import {useBaseStore} from "@/stores/base.js";
import {onMounted} from "vue";
import router from "@/router/index.ts";
import {storeToRefs} from "pinia";

defineProps({
	title: String
})

const { token } = storeToRefs(useBaseStore());

onMounted(async () => {
	if (!token.value) {
		await router.push({ name: "Auth" });
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
