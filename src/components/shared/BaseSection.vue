<script setup lang="ts">
defineProps({
	title: String
})
</script>

<template>
	<section class="section">
		<div class="section__header">
			<h2 v-if="title" class="section__title">{{ title }}</h2>
			<div class="section__actions">
				<slot name="actions"></slot>
			</div>
		</div>
		<div class="section__inner">
			<slot name="default"></slot>
		</div>
	</section>
</template>

<style scoped>

</style>
