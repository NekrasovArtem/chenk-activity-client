<script setup>
defineProps({
	title: String
})
</script>

<template>
	<section class="section">
		<div class="section__inner">
			<div class="section__title">{{ title }}</div>
		</div>
		<section class="section__content">
			<slot></slot>
		</section>
	</section>
</template>

<style scoped>

</style>
