<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import BaseSection from "@/components/shared/BaseSection.vue";
import NewEventModal from "@/components/modals/NewEventModal.vue";
import EventItem from "@/views/Events/EventItem.vue";
import { onMounted } from "vue";
import { useModalsStore } from "@/stores/modals.js";
import { useEventsStore } from "@/stores/events.ts";
import { api } from "@/api/index.ts";
import { storeToRefs } from "pinia";
import BasePagination from "@/components/shared/BasePagination.vue";
import {useRoute, useRouter} from "vue-router";

const { openModal } = useModalsStore();
const { requestEvents, requestCorpuses, requestPlaces, requestLevels, requestDirections, requestModules } = useEventsStore();
const { events, pages } = storeToRefs(useEventsStore());
const route = useRoute()

onMounted( async () => {
	requestCorpuses();
	requestPlaces();
	requestLevels();
	requestDirections();
	requestModules();
	await requestEvents();
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

			<div class="events__items">
				<div class="events-item">
					<div class="events-item__id">ID</div>
					<div class="events-item__title">Наименование</div>
					<div class="events-item__date">Дата</div>
					<div class="events-item__level">Уровень</div>
					<div class="events-item__place">Место</div>
				</div>
				<EventItem v-for="event in events" :key="event.id" :event />
			</div>

			<BasePagination v-if="pages > 1" :current-page="+route.params.page || 1" :pages />
		</BaseSection>
	</MainLayout>

	<NewEventModal />
</template>
