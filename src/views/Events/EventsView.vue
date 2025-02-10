<script setup lang="ts">
import {onMounted, ref} from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import BaseSection from "@/components/shared/BaseSection.vue";
import {api} from "@/api/index.ts";
import NewEventModal from "@/components/modals/NewEventModal.vue";
import {useModalsStore} from "@/stores/modals.js";

const { openModal } = useModalsStore();

const events = ref(null)

onMounted(async () => {
	events.value = await api.getEvents();
})

async function getEventsExcel() {
	const response = await api.exportEvents();

	const href = URL.createObjectURL(response)
	const link = document.createElement('a');
	link.href = href;
	link.setAttribute('download', 'events.xlsx');
	document.body.appendChild(link);
	link.click();
}
</script>

<template>
	<MainLayout :title="'Мероприятия'">
		<BaseSection :title="'Список мероприятий'" class="events">
			<template #actions>
				<button class="btn" @click="openModal('new-event-modal')">Создать новое</button>
				<button class="btn" @click="getEventsExcel">Экспорт</button>
			</template>

			<template #default>
				<div class="events__items">
					<div class="events-item" v-for="event in events" :key="event.id">
						<div class="events-item__id">{{ event.id }}</div>
						<div class="events-item__title">{{ event.shortname }}</div>
						<div class="events-item__date">{{ event.date_start }}</div>
						<div class="events-item__type">{{ event.direction }}</div>
						<div class="events-item__place">{{ event.place }}</div>
						<div class="events-item__profession">{{ event.profession }}</div>
						<router-link :to="{name: 'EventDetail', params: {id: event.id}}" class="events-item__link"></router-link>
					</div>
				</div>
			</template>
		</BaseSection>
	</MainLayout>

	<NewEventModal />
</template>
