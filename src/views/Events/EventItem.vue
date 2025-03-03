<script setup lang="ts">
import type { Event } from "@/views/Events/EventsView.vue"

interface Props {
	event: Event
}

defineProps<Props>();
</script>

<template>
	<div class="events-item">
		<div class="events-item__id">{{ event.id }}</div>
		<div class="events-item__title">{{ event.name }}</div>
		<div class="events-item__date">{{ event.date_start }} - {{ event.date_end ?? '' }}</div>
		<div class="events-item__level">{{ event.level.name }}</div>
		<div class="events-item__place">{{ event.place.name }}</div>
		<router-link :to="{name: 'EventDetail', params: {id: event.id}}" class="events-item__link"></router-link>
	</div>
</template>

<style scoped lang="sass">

</style>
