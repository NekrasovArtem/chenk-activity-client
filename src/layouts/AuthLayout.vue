<script setup lang="ts">
import AuthHeader from "@/components/shared/AuthHeader.vue";
import {useBaseStore} from "@/stores/base.js";
import {onMounted} from "vue";
import router from "@/router/index.ts";
import {storeToRefs} from "pinia";

const {userData} = storeToRefs(useBaseStore());

onMounted(async () => {
	if (userData.value) {
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
