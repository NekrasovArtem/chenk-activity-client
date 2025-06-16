<script setup lang="ts">
import type { Event } from "@/stores/events.ts";

interface Props {
	event: Event
}

defineProps<Props>();

function convertDate(date: string) {
	return new Date(date).toLocaleDateString();
}
</script>

<template>
	<div class="events-item">
		<div class="events-item__top">
			<div class="events-item__title">{{ event.name }}</div>
			<div class="events-item__date">{{ convertDate(event.date_start) }} - {{ convertDate( event.date_end) }}</div>
		</div>
		<div class="events-item__bottom">
			<div class="events-item__corpus">Корпус: {{ event.corpus.name }}</div>
			<div class="events-item__place">Место проведения: {{ event.place.name }}</div>
		</div>
		<router-link :to="{name: 'EventDetail', params: {id: event.id}}" class="events-item__link"></router-link>
	</div>
</template>

<style scoped lang="sass">

</style>
