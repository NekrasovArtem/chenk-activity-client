<script setup>
import AuthHeader from "@/app/components/shared/AuthHeader.vue";
import {useBaseStore} from "@/app/stores/base.js";
import {onMounted} from "vue";
import router from "@/app/router/index.js";

const {getUser} = useBaseStore();
const user = getUser();

onMounted(async () => {
	if (user) {
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
