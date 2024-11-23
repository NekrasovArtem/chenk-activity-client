<script setup>
import AuthHeader from "@/app/components/shared/AuthHeader.vue";
</script>

<template>
	<div class="page__main page__main--auth">
		<AuthHeader/>
		<slot></slot>
	</div>
</template>
