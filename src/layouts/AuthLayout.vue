<script setup lang="ts">
import { useBaseStore } from "@/stores/base.js";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import router from "@/router/index.ts";

const { token } = storeToRefs(useBaseStore());

onMounted(async () => {
	if (token.value) {
		await router.push({name: 'Home'})
	}
})
</script>

<template>
	<main class="main main--auth">
		<slot></slot>
	</main>
</template>
