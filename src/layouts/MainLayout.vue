<script setup>
import MainHeader from "@/app/components/shared/MainHeader.vue";

defineProps({
	title: String
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
