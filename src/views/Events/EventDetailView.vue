<script setup lang="ts">
import type { Event } from "@/stores/events.ts";
import BaseSection from "@/components/shared/BaseSection.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import { onMounted, ref } from "vue";
import { api} from "@/api/index.ts";
import { useRoute} from "vue-router";

const route = useRoute()
const eventId: number = +route.params.id

const event = ref<Event | null>(null)

onMounted( async () => {
	const response = await api.getEventDetail(eventId);

	event.value = response.event;
})
</script>

<template>
	<MainLayout :title="event?.name">
		<BaseSection>
			<div class="event">
				<div v-if="event">{{ event.name }}</div>
			</div>
		</BaseSection>
	</MainLayout>
</template>
