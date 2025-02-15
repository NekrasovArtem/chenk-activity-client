<script setup lang="ts">
import AuthHeader from "@/components/shared/AuthHeader.vue";
import {useBaseStore} from "@/stores/base.js";
import {onMounted} from "vue";
import router from "@/router/index.ts";
import {storeToRefs} from "pinia";

const { token } = storeToRefs(useBaseStore());

onMounted(async () => {
	if (token.value) {
		await router.push({name: 'Home'})
	}
})
</script>

<template>
	<AuthHeader/>
	<main class="main main--auth">
		<slot></slot>
	</main>
</template>
