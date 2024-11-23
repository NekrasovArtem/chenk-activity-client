<script setup>
import AuthHeader from "@/app/components/shared/AuthHeader.vue";
</script>

<template>
	<AuthHeader/>
	<main class="main main--auth">
		<slot></slot>
	</main>
</template>
