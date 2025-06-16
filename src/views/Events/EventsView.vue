<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import BaseSection from "@/components/shared/BaseSection.vue";
import NewEventModal from "@/components/modals/NewEventModal.vue";
import EventItem from "@/views/Events/EventItem.vue";
import {onMounted, ref} from "vue";
import { useModalsStore } from "@/stores/modals.js";
import { useEventsStore } from "@/stores/events.ts";
import { api } from "@/api/index.ts";
import { storeToRefs } from "pinia";
import BasePagination from "@/components/shared/BasePagination.vue";
import { useRoute } from "vue-router";
import router from "@/router";
import InputText from "@/components/inputs/InputText.vue";

const { openModal } = useModalsStore();
const { requestEvents, requestCorpuses, requestPlaces, requestLevels, requestDirections, requestModules } = useEventsStore();
const { events, pages } = storeToRefs(useEventsStore());
const route = useRoute()

const search = ref<string>('');

onMounted( async () => {
	requestCorpuses();
	requestPlaces();
	requestLevels();
	requestDirections();
	requestModules();
	await requestEvents(+route.params.page || 1);
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

function onChangePage(page: number) {
	requestEvents(page, search.value);
	router.push({ name: 'EventsPagination', params: { page } });
}

function onSearch() {
	requestEvents(1, search.value);
}
</script>

<template>
	<MainLayout :title="'Мероприятия'">
		<BaseSection :title="'Список мероприятий'" class="events">
			<template #actions>
				<form @submit.prevent="onSearch" class="events__search">
					<InputText
						v-model="search"
						placeholder="Поиск по названию"
					/>
					<button class="btn">Поиск</button>
				</form>
				<button class="btn" @click="openModal('new-event-modal')">Создать новое</button>
				<button class="btn" @click="getEventsExcel">Экспорт</button>
			</template>

			<div v-if="events.length" class="events__items">
				<EventItem v-for="event in events" :key="event.id" :event />
			</div>

			<div v-else class="events__items">
				<span>Мероприятия не найдены</span>
			</div>

			<BasePagination
				v-if="pages > 1"
				:current-page="+route.params.page || 1"
				:pages
				@on-change="onChangePage"
			/>
		</BaseSection>
	</MainLayout>

	<NewEventModal />
</template>
