<script setup>
import MainHeader from "@/app/components/shared/MainHeader.vue";
import {useBaseStore} from "@/app/stores/base.js";
import {onMounted} from "vue";
import router from "@/app/router/index.js";

defineProps({
	title: String
})

const {getUser} = useBaseStore();
const user = getUser();

onMounted(async () => {
	if (!user) {
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
