<script setup>
import router from '@/app/router/index.js';
import {useBaseStore} from "@/app/stores/base.js";
import {onMounted, ref} from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import BaseSection from "@/app/components/shared/BaseSection.vue";
import {exportEvents, getEvents} from "@/app/api/index.js";

const {getToken} = useBaseStore();
const token = getToken();

let events = ref(null)

onMounted(async () => {
	if (!token) {
		await router.push({name: 'Auth'})
		return false;
	}

	events.value = await getEvents();
})

async function getEventsExcel() {
	const response = await exportEvents();

	const href = URL.createObjectURL(response)
	const link = document.createElement('a');
	link.href = href;
	link.setAttribute('download', 'events.xlsx'); //or any other extension
	document.body.appendChild(link);
	link.click();
}
</script>

<template>
	<MainLayout :title="'Мероприятия'">
		<BaseSection>
			<div class="events__settings">
				<button class="btn">Создать новое</button>
				<button class="btn" @click="getEventsExcel">Экспорт</button>
			</div>
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
		</BaseSection>
	</MainLayout>
</template>
