<script setup lang="ts">
import BaseSection from "@/components/shared/BaseSection.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import EventDetailForm from "@/components/forms/EventDetailForm.vue";
import { onMounted, ref } from "vue";
import { api} from "@/api/index.ts";
import { useRoute} from "vue-router";
import {useEventsStore} from "@/stores/events.ts";
import {useGroupsStore} from "@/stores/groups.ts";

const { requestCorpuses, requestPlaces, requestLevels, requestDirections, requestModules } = useEventsStore();
const { requestGroups } = useGroupsStore();

const route = useRoute();
const eventId: number = +route.params.id;
const event = ref();

onMounted( async () => {
	await requestCorpuses();
	await requestPlaces();
	await requestLevels();
	await requestDirections();
	await requestModules();
	await requestGroups();

	const response = await api.getEventDetail(eventId);

	event.value = { ...response.event };
})
</script>

<template>
	<MainLayout :title="`${event?.name || ''}`">
		<BaseSection>
			<div v-if="event" class="event">
				<EventDetailForm :event />
			</div>
		</BaseSection>
	</MainLayout>
</template>
