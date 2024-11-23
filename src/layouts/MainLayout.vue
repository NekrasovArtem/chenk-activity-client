<script setup>
import MainHeader from "@/app/components/shared/MainHeader.vue";
</script>

<template>
	<div class="layout">
		<MainHeader/>
		<main class="main">
			<slot></slot>
		</main>
	</div>
</template>
