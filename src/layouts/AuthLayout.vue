<script setup>
import AuthHeader from "@/app/components/shared/AuthHeader.vue";
import {useBaseStore} from "@/app/stores/base.js";
import {onMounted} from "vue";
import router from "@/app/router/index.js";

const {getToken} = useBaseStore();
const token = getToken();

onMounted(async () => {
	if (token) {
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
