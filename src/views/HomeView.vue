<script setup lang="ts">
import type { Event } from "@/views/Events/EventsView.vue"
import MainLayout from "@/layouts/MainLayout.vue";
import BaseSection from "@/components/shared/BaseSection.vue";
import {onMounted, ref} from "vue";
import {api} from "@/api";
import EventItem from "@/views/Events/EventItem.vue";

const eventsUpcoming = ref<Event[] | null>(null)
const eventsPast = ref<Event[] | null>(null)

onMounted(async () => {
	const currentDate = new Date().toISOString().slice(0, 10);

	eventsUpcoming.value = await api.getEventsUpcoming(currentDate);
	eventsPast.value = await api.getEventsPast(currentDate);
})
</script>

<template>
	<MainLayout :title="'Главная'">
		<BaseSection :title="'Предстоящие мероприяти'">
			<div class="events__items">
				<EventItem v-for="event in eventsUpcoming" :key="event.id" :event />
			</div>
		</BaseSection>
		<BaseSection :title="'Прошедшие мероприятия'">
			<div class="events__items">
				<EventItem v-for="event in eventsPast" :key="event.id" :event />
			</div>
		</BaseSection>
	</MainLayout>
</template>
