<script setup lang="ts">
defineProps({
	title: String
})
</script>

<template>
	<section class="section">
		<div v-if="title || $slots.actions" class="section__header">
			<h2 v-if="title" class="section__title">{{ title }}</h2>
			<div v-if="$slots.actions" class="section__actions">
				<slot name="actions"></slot>
			</div>
		</div>
		<div v-if="$slots.default" class="section__inner">
			<slot name="default"></slot>
		</div>
	</section>
</template>
